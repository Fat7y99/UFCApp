import { Buffer } from 'buffer';
import { translate } from '@modules/localization';
import {
  processErrorCode,
  saveApiToken,
  saveRefreshToken,
  removeUserDataLogout,
} from '@modules/utils';
import { setErrorDialogMessage, store } from '@src/store';
import axios from 'axios';
import { default as Config } from 'react-native-config';
import {
  queryAuth,
  getRefreshToken,
  type ServerError,
  type ServerErrorResponse,
} from '@modules/core';
import ConsoleColors from './ConsoleColors';
import skip401Urls from './skip401Urls';
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
const CLIENT_ID = 'client';
const CLIENT_SECRET = 'Admin.$erver';
const getLogMessage = (message: string) => `## HttpClient:: ${message}`;

const isLoginRequest = (url?: string) =>
  url?.includes('/oauth2/token') || url?.includes('/login');
const isRefreshTokenRequest = (config?: InternalAxiosRequestConfig) => {
  if (!config?.url?.includes('/oauth2/token')) return false;
  // Check if request body contains refresh_token
  const body = config.data;
  if (typeof body === 'string') {
    return (
      body.includes('refresh_token') &&
      body.includes('grant_type=refresh_token')
    );
  }
  return false;
};
const isForgotPasswordRequest = (url?: string) =>
  url?.includes('sendOTP') ||
  url?.endsWith('addEndUser') ||
  url?.endsWith('forgetPassword');
const addHeaders = async (config: InternalAxiosRequestConfig<any>) => {
  config.headers.Accept = '*/*';
  console.log('url', config.url, isForgotPasswordRequest(config.url));
  console.log('config', Config.API_URL, config);
  // Add Basic Auth for login request only
  if (isForgotPasswordRequest(config.url)) {
    const response = await queryAuth.login({
      body: { username: 'guest', password: 'ufc.guest.2025' },
    });
    config.headers.Authorization = `Bearer ${response?.access_token}`;
    return;
  }
  if (isLoginRequest(config.url) || isRefreshTokenRequest(config)) {
    // Get client credentials from Config
    const clientId = Config.CLIENT_ID || CLIENT_ID;
    const clientSecret = Config.CLIENT_SECRET || CLIENT_SECRET;

    // Create Basic Auth header
    const basicAuthToken = Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64',
    );
    config.headers.Authorization = `Basic ${basicAuthToken}`;
    // Set Content-Type to application/x-www-form-urlencoded for login/refresh
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    console.info(
      getLogMessage(
        isRefreshTokenRequest(config)
          ? 'Added Basic Auth for refresh token request'
          : 'Added Basic Auth for login request',
      ),
    );
  } else {
    // Use Bearer token for other requests
    const token = store.getState().user?.apiToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Set Content-Type to application/json for other requests
    // Don't set Content-Type for FormData - let axios handle it automatically
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
  }
};

const getLogMethodColor = (method?: string) => {
  let methodColor: string | undefined;

  switch (method) {
    case 'GET':
      methodColor = ConsoleColors.get;
      break;
    case 'HEAD':
      methodColor = ConsoleColors.head;
      break;

    case 'POST':
      methodColor = ConsoleColors.post;
      break;

    case 'PUT':
      methodColor = ConsoleColors.put;
      break;

    case 'PATCH':
      methodColor = ConsoleColors.patch;
      break;

    case 'DELETE':
      methodColor = ConsoleColors.delete;
      break;

    case 'OPTIONS':
      methodColor = ConsoleColors.options;
      break;

    default:
      methodColor = undefined;
      break;
  }

  return methodColor;
};

const shouldSkip401 = (error: AxiosError<ServerErrorResponse>) => {
  console.info(getLogMessage('shouldSkip401'), error);
  const responseUrl = error.request?.responseURL;
  console.info(getLogMessage('responseUrl'), responseUrl);

  const isSkip401Url: boolean =
    responseUrl &&
    typeof responseUrl === 'string' &&
    skip401Urls.some(url => responseUrl.indexOf(url) > -1);

  console.info(getLogMessage('isSkip401Url'), isSkip401Url);
  return isSkip401Url;
};

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const handle401Error = async (error: AxiosError<ServerErrorResponse>) => {
  console.info(getLogMessage('handle401Error'), error);
  const status = error.response?.status;
  const originalRequest = error.config as InternalAxiosRequestConfig & {
    _retry?: boolean;
  };

  console.info(getLogMessage('status'), status);

  // Skip 401 handling for certain URLs
  if (shouldSkip401(error)) {
    return Promise.reject(error);
  }

  // Skip if this is already a refresh token request or login request
  if (
    isRefreshTokenRequest(originalRequest) ||
    isLoginRequest(originalRequest?.url)
  ) {
    // Refresh token also expired, logout user
    console.info(getLogMessage('Refresh token expired, logging out user'));
    removeUserDataLogout();
    store.dispatch(setErrorDialogMessage(translate('sessionExpired')));
    return Promise.reject(error);
  }

  // If already refreshing, queue this request
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    })
      .then(token => {
        if (originalRequest && token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return httpClient(originalRequest);
      })
      .catch(err => Promise.reject(err));
  }

  // Start refresh process
  isRefreshing = true;
  originalRequest._retry = true;

  const refreshToken = getRefreshToken() || store.getState().user?.refreshToken;

  if (!refreshToken) {
    console.info(getLogMessage('No refresh token available, logging out'));
    isRefreshing = false;
    processQueue(new Error('No refresh token'), null);
    removeUserDataLogout();
    store.dispatch(setErrorDialogMessage(translate('sessionExpired')));
    return Promise.reject(error);
  }

  try {
    console.info(getLogMessage('Attempting to refresh token'));
    const response = await queryAuth.refreshToken({
      body: { refresh_token: refreshToken },
    });

    if (response?.access_token) {
      // Save new tokens
      saveApiToken(response.access_token);
      if (response.refresh_token) {
        saveRefreshToken(response.refresh_token);
      }

      // Update original request with new token
      if (originalRequest) {
        originalRequest.headers.Authorization = `Bearer ${response.access_token}`;
      }

      // Process queued requests
      isRefreshing = false;
      processQueue(null, response.access_token);

      // Retry original request
      return httpClient(originalRequest);
    } else {
      throw new Error('No access token in refresh response');
    }
  } catch (refreshError) {
    console.error(getLogMessage('Token refresh failed'), refreshError);
    isRefreshing = false;
    processQueue(refreshError, null);

    // Refresh failed, logout user
    removeUserDataLogout();
    store.dispatch(setErrorDialogMessage(translate('sessionExpired')));
    return Promise.reject(refreshError);
  }
};

const getErrorMessage = (error: AxiosError<ServerErrorResponse>) => {
  // Use ErrorUtils to process error code and get proper message
  const errorData = error.response?.data;

  // Process error using error code utility
  const processedMessage = processErrorCode(errorData);

  // If we got a message from error code processing, return it
  if (processedMessage && processedMessage !== translate('unknownError')) {
    return processedMessage;
  }

  // Fallback to error.message if available
  if (error.message) {
    return error.message;
  }

  // Final fallback
  return processedMessage || translate('unknownError');
};

const handleAxiosError = async (error: AxiosError<ServerErrorResponse>) => {
  console.info(getLogMessage('handleAxiosError'), error);

  // Check for timeout or network errors
  const isTimeoutError =
    error.code === 'ECONNABORTED' ||
    error.message?.toLowerCase().includes('timeout') ||
    error.message === translate('networkError');

  const isNetworkError =
    error.code === 'ERR_NETWORK' ||
    error.code === 'ENOTFOUND' ||
    error.code === 'ECONNREFUSED' ||
    (!error.response && error.request);

  if (isTimeoutError || isNetworkError) {
    console.info(getLogMessage('Timeout or network error detected'), {
      isTimeoutError,
      isNetworkError,
      code: error.code,
    });
    const severError: ServerError = {
      ...error,
      date: new Date(),
      status: error.response?.status,
      data: error.response?.data,
      errorMessage: translate('internetLost'),
    };
    return Promise.reject(severError);
  }

  const isLoginRequestStatus = isLoginRequest(error.config?.url);
  if (isLoginRequestStatus) {
    const severError: ServerError = {
      ...error,
      date: new Date(),
      status: error.response?.status,
      data: error.response?.data,
      errorMessage: getErrorMessage(error),
    };
    return Promise.reject(severError);
  }

  // Handle 401 errors with token refresh
  if (error.response?.status === 401) {
    try {
      const refreshedResponse = await handle401Error(error);
      // If refresh succeeded, return the refreshed response
      if (refreshedResponse) {
        return refreshedResponse;
      }
    } catch (refreshError) {
      // Refresh failed, continue with error handling
      console.error(
        getLogMessage('Token refresh failed in handleAxiosError'),
        refreshError,
      );
    }
  }

  const severError: ServerError = {
    ...error,
    date: new Date(),
    status: error.response?.status,
    data: error.response?.data,
    errorMessage: getErrorMessage(error),
  };

  return Promise.reject(severError);
};

const requestFulfilledInterceptor = async (
  config: InternalAxiosRequestConfig<any>,
) => {
  await addHeaders(config);
  const method = config.method?.toUpperCase();
  const methodColor = getLogMethodColor(method);

  console.info(
    getLogMessage(`🚀 Sending %c${method}%c Request to %c${config.url}`),
    `color: ${methodColor}`,
    'color: undefined',
    `color: ${ConsoleColors.url}`,
    config,
  );

  return config;
};

const requestRejectedInterceptor = (error: any) => {
  console.error(
    getLogMessage(
      `🚫 Error Sending Request to %c${error.response?.config?.url}`,
    ),
    `color: ${ConsoleColors.url}`,
    error,
  );

  return Promise.reject(error as Error);
};

const responseFulfilledInterceptor = (response: AxiosResponse<any, any>) => {
  console.info(
    getLogMessage(`✅ Got Response from %c${response.config.url}`),
    `color: ${ConsoleColors.url}`,
    response,
  );

  return response;
};

const responseRejectedInterceptor = async (error: any) => {
  console.error(
    getLogMessage(
      `❌ Got Error from %c${error.response?.config?.url || error.config?.url || 'unknown'}`,
    ),
    `color: ${ConsoleColors.url}`,
    error,
  );

  if (axios.isAxiosError<ServerErrorResponse>(error)) {
    return handleAxiosError(error);
  }

  // Handle non-axios errors (like timeout)
  const isTimeoutError =
    error.code === 'ECONNABORTED' ||
    error.message?.toLowerCase().includes('timeout') ||
    error.message === translate('networkError');

  const isNetworkError =
    error.code === 'ERR_NETWORK' ||
    error.code === 'ENOTFOUND' ||
    error.code === 'ECONNREFUSED';

  if (isTimeoutError || isNetworkError) {
    const severError: ServerError = {
      ...error,
      errorMessage: translate('internetLost'),
    };
    return Promise.reject(severError);
  }

  const severError: ServerError = {
    ...error,
    errorMessage: translate('unknownError'),
  };

  return Promise.reject(severError);
};

const httpClient = axios.create({
  baseURL: Config.API_URL || 'http://34.166.196.89:8080/',
  timeout: 60 * 1 * 1000,
  timeoutErrorMessage: translate('networkError'),
});

httpClient.interceptors.request.use(
  requestFulfilledInterceptor,
  requestRejectedInterceptor,
);

httpClient.interceptors.response.use(
  responseFulfilledInterceptor,
  responseRejectedInterceptor,
);

export default httpClient;
