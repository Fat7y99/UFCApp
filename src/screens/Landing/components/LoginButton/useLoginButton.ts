import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard } from 'react-native';
import { reset } from '@src/navigation';
import type { FormValues } from '@src/screens/Login/components';
import {
  useAppDispatch,
  setErrorDialogMessage,
  setApiToken as setStateApiToken,
  setUnreadCount,
  store,
} from '@src/store';
import {
  useLoginApi,
  useGetUserDetailsApi,
  queryNotifications,
  setUnreadNotificationsCount as setLocalStorageUnreadNotificationsCount,
} from '@modules/core';
import { TranslationNamespaces } from '@modules/localization';
import { saveApiToken, saveRefreshToken, saveUserData } from '@modules/utils';

const useLoginButton = () => {
  // #region Logger
  const getLogMessage = (message: string) =>
    `## Login::Form::LoginButton::useLoginButton:: ${message}`;
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
  // #endregion

  // #region API
  const { mutate: callLoginApi, isPending: isLoggingIn } = useLoginApi({
    onSuccess: loginResponse => {
      console.info(getLogMessage('handleSuccess'), loginResponse);

      if (loginResponse?.access_token) {
        // Save access token
        const token = loginResponse.access_token;
        saveApiToken(token);
        dispatch(setStateApiToken(token));

        // Save refresh token if available
        if (loginResponse?.refresh_token) {
          saveRefreshToken(loginResponse.refresh_token);
        }

        // Trigger user details fetch
        setAccessToken(token);
        setShouldFetchUser(true);
      } else {
        dispatch(
          setErrorDialogMessage(
            translate(`${TranslationNamespaces.COMMON}:errorWhileAction`, {
              action: translate(`${TranslationNamespaces.LOGIN}:login`),
            }),
          ),
        );
      }
    },
    onError: error => {
      console.error(getLogMessage('handleError'), error);

      dispatch(
        setErrorDialogMessage(
          error.errorMessage ??
            translate(`${TranslationNamespaces.COMMON}:errorWhileAction`, {
              action: translate(`${TranslationNamespaces.LOGIN}:login`),
            }),
        ),
      );
    },
  });
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
    }
  }, [isUserFetched, userData, accessToken]);

  // Handle user fetch error
  React.useEffect(() => {
    if (isUserError) {
      console.error(getLogMessage('Failed to fetch user details'));
      dispatch(
        setErrorDialogMessage(
          translate(`${TranslationNamespaces.COMMON}:errorWhileAction`, {
            action: 'fetching user details',
          }),
        ),
      );
      setShouldFetchUser(false);
      setAccessToken(null);
    }
  }, [isUserError, dispatch, translate]);
  // #endregion

  // #region Press events
  const onLoginPress = React.useCallback(
    (formData: FormValues) => {
      console.info(getLogMessage('onLoginPress'), formData);
      Keyboard.dismiss();

      callLoginApi({
        body: { username: formData.username, password: formData.password },
      });
    },
    [callLoginApi],
  );
  // #endregion

  return { isLoggingIn: isLoggingIn || shouldFetchUser, onLoginPress };
};

export default useLoginButton;
