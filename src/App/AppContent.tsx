import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import * as React from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@src/navigation';
import { useSplash } from '@src/screens/Splash/useSplash';
import toastConfig from '@src/utils/Toast';
import { ToastManager, ErrorDialog, LoadingDialog } from '@modules/components';
import { useAppTheme } from '@modules/theme';
import { clientPersister, queryClient } from '@modules/utils';

import { useForegroundMessagesListener } from './useForegroundMessagesListener';
import { useLocalizationInitialization } from './useLocalizationInitialization';

import { useLogInitialization } from './useLogInitialization';
import { useNetworkListener } from './useNetworkListener';
import { useNotificationsInteraction } from './useNotificationsInteraction';
import { useOrientationLocker } from './useOrientationLocker';
import { useReactQueryFocusManager } from './useReactQueryFocusManager';
import { useReactQueryOnlineManager } from './useReactQueryOnlineManager';

export default React.memo(() => {
  useLogInitialization();
  const languageLoaded = useLocalizationInitialization();
  useOrientationLocker();
  useNetworkListener();
  useReactQueryFocusManager();
  useReactQueryOnlineManager();
  // useFirebaseMessagingInitialization();
  useForegroundMessagesListener();
  useNotificationsInteraction();
  const HideSplash = () => {
    useSplash({
      isBootSplashLogoLoaded: true,
    });
    return null;
  };

  const theme = useAppTheme();

  // #region UI
  return languageLoaded ? (
    <KeyboardProvider>
      <PaperProvider theme={theme}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister: clientPersister }}
        >
          <NavigationContainer />
          <HideSplash />
          <ErrorDialog />
          <LoadingDialog />
        </PersistQueryClientProvider>
        <ToastManager />
        <Toast config={toastConfig} />
      </PaperProvider>
    </KeyboardProvider>
  ) : null;
  // #endregion
});
