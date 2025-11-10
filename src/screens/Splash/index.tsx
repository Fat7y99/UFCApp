import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { AppImages } from '@modules/assets';
import { Screen } from '@modules/components';

import styles from './styles';
import { useSplash } from './useSplash';

export default React.memo(() => {
  // #region Variables
  // #endregion

  useSplash({
    isBootSplashLogoLoaded: true,
  });

  // #region UI
  return (
    <Screen>
      <View style={[StyleSheet.absoluteFill, styles.bootSplash]}>
        <Image source={AppImages.splashIcon} />
      </View>
    </Screen>
    // #endregion
  );
});
