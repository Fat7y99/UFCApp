import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { RootStackScreenProps } from '@src/navigation';
import { TranslationNamespaces } from '@modules/localization';
import { AppImages } from 'modules/assets/src';
import { AppColors } from 'modules/theme/src';

export default React.memo(() => {
  // #region Logger
  const getLogMessage = (message: string) =>
    `## Notifications::Header:: ${message}`;
  // #endregion

  const {} = useTranslation(TranslationNamespaces.NOTIFICATIONS);

  const navigation =
    useNavigation<RootStackScreenProps<'notifications'>['navigation']>();

  const onBackPress = () => {
    console.info(getLogMessage('onBackPress'));
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={AppImages.leftArrow} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Notifications</Text>
    </View>
  );
});
const styles = StyleSheet.create({
  header: {
    height: ResponsiveDimensions.vs(140),
    backgroundColor: AppColors.themeLight.primary_1,
    paddingTop: ResponsiveDimensions.vs(50),
    paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingBottom: ResponsiveDimensions.vs(20),
    borderBottomEndRadius: ResponsiveDimensions.vs(12),
    borderBottomStartRadius: ResponsiveDimensions.vs(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: ResponsiveDimensions.vs(32),
    height: ResponsiveDimensions.vs(32),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ResponsiveDimensions.vs(12),
  },
  backIcon: {
    width: ResponsiveDimensions.vs(16),
    height: ResponsiveDimensions.vs(16),
    // tintColor: 'white',
  },
  headerTitle: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(20),
    fontWeight: 'bold',
  },
});
