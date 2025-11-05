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
        <View style={styles.contentCard}>
          {/* Heading */}
          <Text style={[styles.headingText, isRTL && { textAlign: 'left' }]}>
            {translate(`${TranslationNamespaces.SETTINGS}:privacyHeading`)}
          </Text>

          {/* Body Text */}
          <Text style={[styles.bodyText, isRTL && { textAlign: 'left' }]}>
            {translate(`${TranslationNamespaces.SETTINGS}:privacyContent`)}
          </Text>

          {/* Second Heading */}
          <Text style={[styles.headingText, isRTL && { textAlign: 'left' }]}>
            {translate(`${TranslationNamespaces.SETTINGS}:privacyHeading`)}
          </Text>

          {/* Bullet Points */}
          <View style={styles.bulletList}>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={[styles.bodyText, isRTL && { textAlign: 'left' }]}>
                {translate(`${TranslationNamespaces.SETTINGS}:privacyBullet1`)}
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={[styles.bodyText, isRTL && { textAlign: 'left' }]}>
                {translate(`${TranslationNamespaces.SETTINGS}:privacyBullet2`)}
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={[styles.bodyText, isRTL && { textAlign: 'left' }]}>
                {translate(`${TranslationNamespaces.SETTINGS}:privacyBullet3`)}
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={[styles.bodyText, isRTL && { textAlign: 'left' }]}>
                {translate(`${TranslationNamespaces.SETTINGS}:privacyBullet4`)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
});
