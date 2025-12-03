import { TranslationNamespaces } from '@modules/localization';
import { addEventListener } from '@react-native-community/netinfo';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, Platform } from 'react-native';
import { SmallModal } from '@modules/components';
import type { NetInfoState } from '@react-native-community/netinfo';

export default React.memo(() => {
  const { t: translate } = useTranslation([TranslationNamespaces.COMMON]);
  const [showInternetDialog, setShowInternetDialog] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = addEventListener((state: NetInfoState) => {
      // Check if internet is not available (same logic as useHandleNetworkState)
      const isInternetAvailable =
        state.isConnected && state.isInternetReachable;

      if (isInternetAvailable === false) {
        setShowInternetDialog(true);
      } else {
        setShowInternetDialog(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleOpenSettings = React.useCallback(() => {
    if (Platform.OS === 'ios') {
      Linking.openURL('App-Prefs:root=WIFI');
    } else {
      Linking.openURL(
        'intent://#Intent;action=android.settings.WIFI_SETTINGS;end',
      );
    }
  }, []);

  const handleOk = React.useCallback(() => {
    setShowInternetDialog(false);
  }, []);

  return (
    <SmallModal
      transaparent
      testID="InternetSmallModal"
      visible={showInternetDialog}
      title={translate(`${TranslationNamespaces.COMMON}:internetLostTitle`)}
      description={translate(
        `${TranslationNamespaces.COMMON}:internetLostDescription`,
      )}
      buttons={[
        {
          text: translate(`${TranslationNamespaces.COMMON}:ok`),
          onPress: handleOk,
          isPrimary: true,
        },
        {
          text: translate(`${TranslationNamespaces.COMMON}:settings`),
          onPress: handleOpenSettings,
          isPrimary: false,
        },
      ]}
    />
  );
});
