import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  I18nManager,
} from 'react-native';
import { AppImages } from '@modules/assets';
import { Screen } from '@modules/components';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
import styles from './styles';

const isRTL = I18nManager.isRTL;

export default React.memo(() => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <Screen
      style={styles.container}
      showNavigationBar={false}
      statusBarColor={AppColors.themeLight.primary_1}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Image source={isRTL ? AppImages.rightArrow : AppImages.leftArrow} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isRTL && { textAlign: 'left' }]}>
          {translate(`${TranslationNamespaces.SETTINGS}:privacyPolicy`)}
        </Text>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Legal / Compliance Owner Section */}
        {/* <View style={styles.legalSection}> */}
        <Text style={[styles.legalTitle, isRTL && { textAlign: 'left' }]}>
          {translate(`${TranslationNamespaces.SETTINGS}:legalComplianceTitle`)}
        </Text>
        <Text style={[styles.legalText, isRTL && { textAlign: 'left' }]}>
          {translate(
            `${TranslationNamespaces.SETTINGS}:legalComplianceDepartment`,
          )}
        </Text>
        <Text style={[styles.legalText, isRTL && { textAlign: 'left' }]}>
          {translate(`${TranslationNamespaces.SETTINGS}:legalComplianceEmail`)}
        </Text>
        <Text style={[styles.lastUpdatedText, isRTL && { textAlign: 'left' }]}>
          {translate(`${TranslationNamespaces.SETTINGS}:lastUpdated`)}
        </Text>
        {/* </View> */}
      </ScrollView>
    </Screen>
  );
});
