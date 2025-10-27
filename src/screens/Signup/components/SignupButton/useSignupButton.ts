import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard } from 'react-native';
import { useAppDispatch, setErrorDialogMessage } from '@src/store';
import { useSignupApi } from '@modules/core';
import { TranslationNamespaces } from '@modules/localization';

interface UseSignupButtonReturn {
  isPending: boolean;
  onSignupPress: (body: {
    email: string;
    name: string;
    idNumber: string;
    phone: string;
    password: string;
    username: string;
  }) => void;
}

const useSignupButton = (): UseSignupButtonReturn => {
  // #region Logger
  const getLogMessage = (message: string) =>
    `## Signup::useSignupButton:: ${message}`;
  // #endregion

  const { t: translate } = useTranslation([
    TranslationNamespaces.COMMON,
    TranslationNamespaces.SIGNUP,
  ]);

  // #region Redux
  const dispatch = useAppDispatch();
  // #endregion

  // #region API
  const {
    mutate: callSignupApi,
    isPending,
    isSuccess,
    isError,
    data: signupResponse,
    error,
  } = useSignupApi();

  const handleSuccess = React.useCallback(() => {
    console.info(getLogMessage('handleSuccess'), signupResponse);

    if (signupResponse?.message) {
      // TODO: Handle successful signup - maybe navigate to login or show success message
      dispatch(setErrorDialogMessage(signupResponse.message));
    } else {
      dispatch(
        setErrorDialogMessage(
          translate(`${TranslationNamespaces.COMMON}:errorWhileAction`, {
            action: translate(`${TranslationNamespaces.SIGNUP}:signup`),
          }),
        ),
      );
    }
  }, [signupResponse, translate, dispatch]);

  const handleError = React.useCallback(() => {
    console.error(getLogMessage('handleError'), error);

    if (error) {
      dispatch(
        setErrorDialogMessage(
          error.errorMessage ??
            translate(`${TranslationNamespaces.COMMON}:errorWhileAction`, {
              action: translate(`${TranslationNamespaces.SIGNUP}:signup`),
            }),
        ),
      );
    }
  }, [error, dispatch, translate]);

  React.useEffect(() => {
    if (isSuccess) {
      handleSuccess();
    }
  }, [isSuccess, handleSuccess]);

  React.useEffect(() => {
    if (isError) {
      handleError();
    }
  }, [isError, handleError]);
  // #endregion

  // #region Press events
  const onSignupPress = React.useCallback(
    (body: {
      email: string;
      name: string;
      idNumber: string;
      phone: string;
      password: string;
      username: string;
    }) => {
      console.info(getLogMessage('onSignupPress'), body);

      Keyboard.dismiss();

      callSignupApi({
        body,
      });
    },
    [callSignupApi],
  );
  // #endregion

  return {
    isPending,
    onSignupPress,
  };
};

export default useSignupButton;
