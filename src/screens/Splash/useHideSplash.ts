import { CommonActions } from '@react-navigation/native';
import * as React from 'react';
import { hide as rnBootSplashHide } from 'react-native-bootsplash';
import { navigationRef } from '@src/navigation/NavigationUtils';
import type { UseHideSplashProps } from './useHideSplash.types';

export const useHideSplash = (props: UseHideSplashProps) => {
  // #region Logger
  const getLogMessage = (message: string) =>
    `## SplashScreen::useHideSplash:: ${message}`;
  // #endregion

  // #region Variables
  const { isLanguageLoaded, isUserLoaded } = props;
  // #endregion

  // #region State
  const [isBootSplashVisible, setBootSplashVisible] =
    React.useState<boolean>(true);
  // #endregion

  const openNextScreen = React.useCallback(async () => {
    console.info(getLogMessage('openNextScreen - navigating to landing'));
    navigationRef.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: 'landing' as any }] }),
    );
    try {
      await rnBootSplashHide();
    } catch (error) {}
  }, [navigationRef]);

  const hideSplash = React.useCallback(async () => {
    console.info(getLogMessage('hideSplash'));

    try {
      setBootSplashVisible(false);
      openNextScreen();
    } catch (error) {
      console.warn(
        getLogMessage('Error while calling "rnBootSplashHide"'),
        error,
      );

      setBootSplashVisible(false);
      openNextScreen();
    }
  }, [openNextScreen]);

  // #region Setup
  React.useEffect(() => {
    // Check if language and user loaded then:
    // - Navigate to landing screen.
    if (isLanguageLoaded && isUserLoaded) {
      hideSplash();
    }
  }, [isLanguageLoaded, isUserLoaded, hideSplash]);
  // #endregion

  return isBootSplashVisible;
};
