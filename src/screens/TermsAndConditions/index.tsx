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
          {translate(`${TranslationNamespaces.SETTINGS}:termsAndConditions`)}
        </Text>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.contentCard}>
          {/* Introduction */}
          <Text style={[styles.bodyText, isRTL && { textAlign: 'left' }]}>
            {translate(`${TranslationNamespaces.SETTINGS}:termsIntroduction`)}
          </Text>

          {/* Section 1 */}
          <Text style={[styles.headingText, isRTL && { textAlign: 'left' }]}>
            {translate(`${TranslationNamespaces.SETTINGS}:termsSection1Title`)}
          </Text>
          <Text style={[styles.bodyText, isRTL && { textAlign: 'left' }]}>
            {translate(
              `${TranslationNamespaces.SETTINGS}:termsSection1Content`,
            )}
          </Text>

          {/* Section 2 */}
          <Text style={[styles.headingText, isRTL && { textAlign: 'left' }]}>
            {translate(`${TranslationNamespaces.SETTINGS}:termsSection2Title`)}
          </Text>
          <Text style={[styles.bodyText, isRTL && { textAlign: 'left' }]}>
            {translate(
              `${TranslationNamespaces.SETTINGS}:termsSection2Content`,
            )}
          </Text>

          {/* Section 3 */}
          <Text style={[styles.headingText, isRTL && { textAlign: 'left' }]}>
            {translate(`${TranslationNamespaces.SETTINGS}:termsSection3Title`)}
          </Text>
          <Text style={[styles.bodyText, isRTL && { textAlign: 'left' }]}>
            {translate(
              `${TranslationNamespaces.SETTINGS}:termsSection3Content`,
            )}
          </Text>

          {/* Section 4 */}
          <Text style={[styles.headingText, isRTL && { textAlign: 'left' }]}>
            {translate(`${TranslationNamespaces.SETTINGS}:termsSection4Title`)}
          </Text>
          <Text style={[styles.bodyText, isRTL && { textAlign: 'left' }]}>
            {translate(
              `${TranslationNamespaces.SETTINGS}:termsSection4Content`,
            )}
          </Text>

          {/* Section 5 */}
          <Text style={[styles.headingText, isRTL && { textAlign: 'left' }]}>
            {translate(`${TranslationNamespaces.SETTINGS}:termsSection5Title`)}
          </Text>
          <Text style={[styles.bodyText, isRTL && { textAlign: 'left' }]}>
            {translate(
              `${TranslationNamespaces.SETTINGS}:termsSection5Content`,
            )}
          </Text>

          {/* Section 6 */}
          <Text style={[styles.headingText, isRTL && { textAlign: 'left' }]}>
            {translate(`${TranslationNamespaces.SETTINGS}:termsSection6Title`)}
          </Text>
          <Text style={[styles.bodyText, isRTL && { textAlign: 'left' }]}>
            {translate(
              `${TranslationNamespaces.SETTINGS}:termsSection6Content`,
            )}
          </Text>

          {/* Section 7 */}
          <Text style={[styles.headingText, isRTL && { textAlign: 'left' }]}>
            {translate(`${TranslationNamespaces.SETTINGS}:termsSection7Title`)}
          </Text>
          <Text style={[styles.bodyText, isRTL && { textAlign: 'left' }]}>
            {translate(
              `${TranslationNamespaces.SETTINGS}:termsSection7Content`,
            )}
          </Text>

          {/* Section 8 */}
          <Text style={[styles.headingText, isRTL && { textAlign: 'left' }]}>
            {translate(`${TranslationNamespaces.SETTINGS}:termsSection8Title`)}
          </Text>
          <Text style={[styles.bodyText, isRTL && { textAlign: 'left' }]}>
            {translate(
              `${TranslationNamespaces.SETTINGS}:termsSection8Content`,
            )}
          </Text>

          {/* Section 9 */}
          <Text style={[styles.headingText, isRTL && { textAlign: 'left' }]}>
            {translate(`${TranslationNamespaces.SETTINGS}:termsSection9Title`)}
          </Text>
          <Text style={[styles.bodyText, isRTL && { textAlign: 'left' }]}>
            {translate(
              `${TranslationNamespaces.SETTINGS}:termsSection9Content`,
            )}
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
});
