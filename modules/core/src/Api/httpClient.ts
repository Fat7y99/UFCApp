import { Buffer } from 'buffer';
import { translate } from '@modules/localization';
import { setErrorDialogMessage, store } from '@src/store';
import axios from 'axios';
import { default as Config } from 'react-native-config';
import {
  queryAuth,
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

const getLogMessage = (message: string) => `## HttpClient:: ${message}`;

const isLoginRequest = (url?: string) =>
  url?.includes('/oauth2/token') || url?.includes('/login');
const isForgotPasswordRequest = (url?: string) =>
  url?.includes('forgetPassword');
const addHeaders = async (config: InternalAxiosRequestConfig<any>) => {
  config.headers.Accept = '*/*';

  // Add Basic Auth for login request only
  if (isForgotPasswordRequest(config.url)) {
    const response = await queryAuth.login({
      body: { username: 'guest', password: 'ufc.guest.2025' },
    });
    config.headers.Authorization = `Bearer ${response?.access_token}`;
    return;
  }
  if (isLoginRequest(config.url)) {
    // Get client credentials from Config
    const clientId = Config.CLIENT_ID || '';
    const clientSecret = Config.CLIENT_SECRET || '';

    // Create Basic Auth header
    const basicAuthToken = Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64',
    );
    config.headers.Authorization = `Basic ${basicAuthToken}`;
    // Set Content-Type to application/x-www-form-urlencoded for login
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    console.info(getLogMessage('Added Basic Auth for login request'));
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

const handle401Error = (error: AxiosError<ServerErrorResponse>) => {
  console.info(getLogMessage('handle401Error'), error);
  const status = error.response?.status;
  console.info(getLogMessage('status'), status);

  if (status === 401 && !shouldSkip401(error)) {
    store.dispatch(setErrorDialogMessage(translate('sessionExpired')));
  }
};

const getErrorMessage = (error: AxiosError<ServerErrorResponse>) => {
  // TODO: Construct error message base on "ServerErrorResponse" constructed from API.
  let errorMessage: string = translate('unknownError');

  if (error.response?.data?.error) {
    errorMessage = error.response?.data?.error;
  } else if (
    error.response?.data?.errors &&
    typeof error.response.data.errors === 'string'
  ) {
    errorMessage = error.response?.data?.errors;
  } else if (
    error.response?.data?.errors &&
    typeof error.response.data.errors === 'object' &&
    error.response?.data?.errors?.message?.length
  ) {
    errorMessage = error.response?.data?.errors?.message?.join('\n');
  } else if (error.response?.data?.message) {
    errorMessage = error.response?.data?.message;
  } else if (error.message) {
    errorMessage = error.message;
  }

  return errorMessage;
};

const handleAxiosError = (error: AxiosError<ServerErrorResponse>) => {
  console.info(getLogMessage('handleAxiosError'), error);
  handle401Error(error);

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

const responseRejectedInterceptor = (error: any) => {
  console.error(
    getLogMessage(`❌ Got Error from %c${error.response?.config?.url}`),
    `color: ${ConsoleColors.url}`,
    error,
  );

  if (axios.isAxiosError<ServerErrorResponse>(error)) {
    return handleAxiosError(error);
  }

  const severError: ServerError = {
    ...error,
    errorMessage: translate('unknownError'),
  };

  return Promise.reject(severError);
};

const httpClient = axios.create({
  baseURL: Config.API_URL,
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
