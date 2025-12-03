import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import LocalAuthentication from 'rn-local-authentication';
import { reset } from '@src/navigation';
import {
  useAppDispatch,
  setApiToken as setStateApiToken,
  setUnreadCount,
  store,
} from '@src/store';
import {
  useGetUserDetailsApi,
  queryNotifications,
  setUnreadNotificationsCount as setLocalStorageUnreadNotificationsCount,
  queryAuth,
  getRefreshToken,
  type RefreshTokenBody,
} from '@modules/core';
import { TranslationNamespaces } from '@modules/localization';
import { saveApiToken, saveRefreshToken, saveUserData } from '@modules/utils';
import type { BiometryStatus } from 'rn-local-authentication/dist/LocalAuthentication/types';

const useBiometricButton = () => {
  // #region Logger
  const getLogMessage = (message: string) =>
    `## SignIn::BiometricButton::useBiometricButton:: ${message}`;
  // #endregion

  const { t: translate } = useTranslation([
    TranslationNamespaces.COMMON,
    TranslationNamespaces.LOGIN,
  ]);

  // #region Redux
  const dispatch = useAppDispatch();
  // #endregion

  // #region State
  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  const [shouldFetchUser, setShouldFetchUser] = React.useState(false);
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);
  // #endregion

  // #region Check if biometrics are available
  const doesDeviceHasBiometrics = React.useCallback(async () => {
    try {
      const status: BiometryStatus =
        await LocalAuthentication.getBiometryStatusAsync();

      if (
        status === 'BiometryNotAvailable' ||
        status === 'BiometryNotEnrolled'
      ) {
        console.info(getLogMessage('Biometrics not available'), status);
        return false;
      }

      console.info(getLogMessage('Biometrics available'), status);
      return true;
    } catch (error) {
      console.error(getLogMessage('Error checking biometrics'), error);
      return false;
    }
  }, []);

  const checkBiometricsAvailable = doesDeviceHasBiometrics;

  // Check if tokens exist
  const hasTokens = React.useCallback(() => {
    const refreshToken = getRefreshToken();
    const hasBothTokens = !!refreshToken;
    console.info(getLogMessage('Checking tokens'), {
      hasRefreshToken: !!refreshToken,
    });
    return hasBothTokens;
  }, []);

  // Exported for use in component

  // #region API
  const {
    data: userData,
    isSuccess: isUserFetched,
    isError: isUserError,
  } = useGetUserDetailsApi({ enabled: shouldFetchUser });

  // Handle user data after successful fetch
  React.useEffect(() => {
    if (isUserFetched && userData && accessToken) {
      console.info(getLogMessage('User fetched successfully'), userData);
      saveUserData(userData);
      reset('home');

      // Fetch unread notifications count asynchronously after login
      queryNotifications
        .getUnreadNotificationsCount()
        .then((count: number) => {
          setLocalStorageUnreadNotificationsCount(count);
          store.dispatch(setUnreadCount(count));
        })
        .catch((error: unknown) => {
          console.error(
            getLogMessage('Failed to fetch unread notifications count'),
            error,
          );
          // Silently fail - we don't want to block login if notifications fail
        });

      // Reset states
      setShouldFetchUser(false);
      setAccessToken(null);
      setIsAuthenticating(false);
    }
  }, [isUserFetched, userData, accessToken]);

  // Handle user fetch error
  React.useEffect(() => {
    if (isUserError) {
      console.error(getLogMessage('Failed to fetch user details'));
      Toast.show({
        type: 'fail',
        text1: translate(`${TranslationNamespaces.COMMON}:errorWhileAction`, {
          action: translate(
            `${TranslationNamespaces.LOGIN}:fetchingUserDetails`,
          ),
        }),
      });
      setShouldFetchUser(false);
      setAccessToken(null);
      setIsAuthenticating(false);
    }
  }, [isUserError, translate]);
  // #endregion

  // #region Press events
  const onBiometricPress = React.useCallback(async () => {
    console.info(getLogMessage('onBiometricPress'));

    // Check if tokens exist
    if (!hasTokens()) {
      Toast.show({
        type: 'info',
        text1: translate(`${TranslationNamespaces.LOGIN}:noSavedCredentials`),
      });
      return;
    }

    // Check if biometrics are available
    // const isAvailable = await checkBiometricsAvailable();
    // if (!isAvailable) {
    //   Toast.show({
    //     type: 'fail',
    //     text1: translate(
    //       `${TranslationNamespaces.LOGIN}:biometricNotAvailable`,
    //     ),
    //   });
    //   return;
    // }

    setIsAuthenticating(true);

    try {
      console.info(getLogMessage('Authenticating with biometrics'));

      // iOS requires only 'reason' parameter, Android supports more options
      const reasonText = translate(
        `${TranslationNamespaces.LOGIN}:authenticateToSignIn`,
      );

      const authConfig =
        Platform.OS === 'ios'
          ? {
              reason: reasonText || 'Authenticate to sign in',
              fallbackToPinCodeAction: true,
            }
          : {
              reason: reasonText || 'Authenticate to sign in',
              fallbackToPinCodeAction: true,
              cancelTitle:
                translate(`${TranslationNamespaces.COMMON}:cancel`) || 'Cancel',
            };

      console.info(
        getLogMessage('Calling authenticateAsync with config'),
        authConfig,
      );

      const promptResult =
        await LocalAuthentication.authenticateAsync(authConfig);

      console.info(getLogMessage('Biometric prompt result'), promptResult);

      if (!promptResult || !promptResult.success) {
        console.info(
          getLogMessage('Biometric authentication cancelled or failed'),
          promptResult,
        );
        setIsAuthenticating(false);
        return;
      }

      // Biometric authentication succeeded, now refresh token
      console.info(
        getLogMessage('Biometric authentication succeeded, refreshing token'),
      );
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const refreshTokenBody = Object.assign({} as RefreshTokenBody, {
        ['refresh_token']: refreshToken,
      });
      const refreshResponse = await queryAuth.refreshToken({
        body: refreshTokenBody,
      });

      if (refreshResponse?.access_token) {
        // Save new tokens
        const token = refreshResponse.access_token;
        saveApiToken(token);
        dispatch(setStateApiToken(token));

        if (refreshResponse?.refresh_token) {
          saveRefreshToken(refreshResponse.refresh_token);
        }

        // Trigger user details fetch
        setAccessToken(token);
        setShouldFetchUser(true);
      } else {
        throw new Error('No access token in refresh response');
      }
    } catch (error) {
      console.error(
        getLogMessage('Biometric authentication or refresh failed'),
        error,
      );
      setIsAuthenticating(false);
      Toast.show({
        type: 'fail',
        text1:
          error instanceof Error && error.message.includes('refresh')
            ? translate(`${TranslationNamespaces.COMMON}:sessionExpired`)
            : translate(`${TranslationNamespaces.COMMON}:errorWhileAction`, {
                action: translate(`${TranslationNamespaces.LOGIN}:signin`),
              }),
      });
    }
  }, [hasTokens, checkBiometricsAvailable, dispatch, translate]);
  // #endregion

  return {
    isAuthenticating: isAuthenticating || shouldFetchUser,
    onBiometricPress,
    // hasTokens: checkHasTokens(),
  };
};

export default useBiometricButton;
