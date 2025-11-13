import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard } from 'react-native';
import Toast from 'react-native-toast-message';
import { reset } from '@src/navigation';
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

interface SignInFormData {
  username: string;
  password: string;
}

const useSignInButton = () => {
  // #region Logger
  const getLogMessage = (message: string) =>
    `## SignIn::SignInButton::useSignInButton:: ${message}`;
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
              action: translate(`${TranslationNamespaces.LOGIN}:signin`),
            }),
          ),
        );
      }
    },
    onError: error => {
      console.error(getLogMessage('handleError'), error);

      Toast.show({
        type: 'fail',
        text1: error.errorMessage?.includes('401')
          ? translate(`${TranslationNamespaces.LOGIN}:invalidCredentials`)
          : (error.errorMessage ??
            translate(`${TranslationNamespaces.COMMON}:errorWhileAction`, {
              action: translate(`${TranslationNamespaces.LOGIN}:signin`),
            })),
      });
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
  const onSignInPress = React.useCallback(
    (formData: SignInFormData) => {
      console.info(getLogMessage('onSignInPress'), formData);
      Keyboard.dismiss();

      if (!formData.username || formData.username.trim() === '') {
        Toast.show({
          type: 'fail',
          text1: translate(`${TranslationNamespaces.COMMON}:fieldRequired`, {
            field: translate(`${TranslationNamespaces.LOGIN}:username`),
          }),
        });
        return;
      }

      if (!formData.password || formData.password.trim() === '') {
        Toast.show({
          type: 'fail',
          text1: translate(`${TranslationNamespaces.COMMON}:fieldRequired`, {
            field: translate(`${TranslationNamespaces.LOGIN}:password`),
          }),
        });
        return;
      }

      callLoginApi({
        body: { username: formData.username, password: formData.password },
      });
    },
    [callLoginApi, dispatch],
  );
  // #endregion

  return { isSigningIn: isLoggingIn || shouldFetchUser, onSignInPress };
};

export default useSignInButton;
