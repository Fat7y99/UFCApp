import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import {
  I18nManager,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { RootStackScreenProps } from '@src/navigation';
import { translate, TranslationNamespaces } from '@modules/localization';
import { AppImages } from 'modules/assets/src';
import { AppColors } from 'modules/theme/src';
const isRTL = I18nManager.isRTL;
export default React.memo(() => {
  // #endregion

  const {} = useTranslation(TranslationNamespaces.NOTIFICATIONS);

  const navigation =
    useNavigation<RootStackScreenProps<'notifications'>['navigation']>();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={AppImages.leftArrow}
          style={[styles.backIcon, isRTL && { transform: [{ scaleX: -1 }] }]}
        />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, isRTL && { textAlign: 'left' }]}>
        {translate(`${TranslationNamespaces.NOTIFICATIONS}:notifications`)}
      </Text>
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
