import { useNetInfo, addEventListener } from '@react-native-community/netinfo';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import SmallModal from '../SmallModal';

export default React.memo(() => {
  const netInfo = useNetInfo();
  const { t } = useTranslation();
  const [showInternetDialog, setShowInternetDialog] = React.useState(false);

  React.useEffect(() => {
    addEventListener(state => {
      if (!state.isConnected) {
        setShowInternetDialog(true);
      } else {
        setShowInternetDialog(false);
      }
    });
  }, [netInfo?.isConnected]);

  return showInternetDialog ? (
    <SmallModal
      transaparent
      testID="InternetSmallModal"
      visible={showInternetDialog}
      title={t('welcome:NO_INTERNET_TITLE')}
      description={t('welcome:NO_INTERNET_DESC')}
    />
  ) : null;
});
