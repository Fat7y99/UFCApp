import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import type { RootStackScreenProps } from '@src/navigation';
import { AppImages } from '@modules/assets';
import { Screen } from '@modules/components';

import styles from './styles';

export default React.memo((props: RootStackScreenProps<'splash'>) => {
  // #region Variables
  const {} = props;
  // #endregion

  // const isBootSplashVisible = useSplash({
  //   navigation,

  //   isBootSplashLogoLoaded: true,
  // });

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
