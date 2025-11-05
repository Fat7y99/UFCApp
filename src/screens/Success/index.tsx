import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import type { RootStackParamList } from '@src/navigation';
import { Screen } from '@modules/components';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { useAppTheme, AppColors } from '@modules/theme';
import { SuccessHeader, SuccessIcon, SuccessButton } from './components';
import { SuccessType, type SuccessScreenConfig } from './types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const getSuccessConfig = (type: string): SuccessScreenConfig => {
  switch (type) {
    case SuccessType.APPLICATION_SUBMITTED:
      return {
        title: translate(`${TranslationNamespaces.COMMON}:successful`),
        message: translate(
          `${TranslationNamespaces.COMMON}:successfullyApplied`,
        ),
        primaryButtonText: translate(`${TranslationNamespaces.COMMON}:home`),
      };
    case SuccessType.PASSWORD_CHANGED:
      return {
        title: translate(`${TranslationNamespaces.COMMON}:successful`),
        message: translate(
          `${TranslationNamespaces.COMMON}:successfullyChanged`,
        ),
        primaryButtonText: translate(`${TranslationNamespaces.COMMON}:home`),
      };
    case SuccessType.PASSWORD_RESET:
      return {
        title: translate(`${TranslationNamespaces.COMMON}:successful`),
        message: translate(
          `${TranslationNamespaces.COMMON}:passwordResetSuccessfully`,
        ),
        primaryButtonText: translate(`${TranslationNamespaces.COMMON}:home`),
      };
    case SuccessType.SIGNUP:
      return {
        title: translate(`${TranslationNamespaces.COMMON}:successful`),
        message: translate(
          `${TranslationNamespaces.COMMON}:accountCreatedSuccessfully`,
        ),
        primaryButtonText: translate(`${TranslationNamespaces.COMMON}:home`),
      };
    case SuccessType.MESSAGE_SENT:
      return {
        title: translate(`${TranslationNamespaces.COMMON}:successful`),
        message: translate(
          `${TranslationNamespaces.COMMON}:messageSentSuccessfully`,
        ),
        primaryButtonText: translate(`${TranslationNamespaces.COMMON}:home`),
        secondaryButtonText: translate(
          `${TranslationNamespaces.HOME}:getOffer`,
        ),
      };
    case SuccessType.OFFER_APPLIED:
      return {
        title: translate(`${TranslationNamespaces.COMMON}:offerSuccess`),
        message: translate(
          `${TranslationNamespaces.COMMON}:successfullyApplied`,
        ),
        primaryButtonText: translate(`${TranslationNamespaces.COMMON}:home`),
        secondaryButtonText: translate(
          `${TranslationNamespaces.HOME}:getOffer`,
        ),
      };
    case SuccessType.PROFILE_UPDATED:
      return {
        title: translate(`${TranslationNamespaces.COMMON}:successful`),
        message: translate(
          `${TranslationNamespaces.COMMON}:profileUpdatedSuccessfully`,
        ),
        primaryButtonText: translate(`${TranslationNamespaces.COMMON}:home`),
      };
    default:
      return {
        title: translate(`${TranslationNamespaces.COMMON}:successful`),
        message: translate(
          `${TranslationNamespaces.COMMON}:operationCompletedSuccessfully`,
        ),
        primaryButtonText: translate(`${TranslationNamespaces.COMMON}:home`),
      };
  }
};

export default React.memo(() => {
  const theme = useAppTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  const params = route.params as { type: string };
  const successType = params?.type || SuccessType.PASSWORD_CHANGED;
  const config = getSuccessConfig(successType);

  const handlePrimaryButtonPress = () => {
    navigation.popTo('home');
  };

  const handleSecondaryButtonPress = () => {
    // Navigate to offers screen if available
    if (config.secondaryButtonText) {
      navigation.navigate('offers');
    }
  };

  return (
    <Screen style={styles.container}>
      {/* Header */}
      <SuccessHeader title={config.title} />

      {/* Main Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <SuccessIcon />
        </View>

        {/* Success Message */}
        <Text style={[styles.message, theme.fonts.headlineMedium]}>
          {config.message}
        </Text>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <SuccessButton
            text={config.primaryButtonText}
            onPress={handlePrimaryButtonPress}
            isPrimary
          />
          {config.secondaryButtonText && (
            <SuccessButton
              text={config.secondaryButtonText}
              onPress={handleSecondaryButtonPress}
              isPrimary={false}
            />
          )}
        </View>
      </ScrollView>
    </Screen>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingTop: ResponsiveDimensions.vs(60),
    paddingBottom: ResponsiveDimensions.vs(40),
  },
  iconContainer: {
    marginBottom: ResponsiveDimensions.vs(40),
  },
  message: {
    color: AppColors.themeLight.primary_1,
    textAlign: 'center',
    marginBottom: ResponsiveDimensions.vs(60),
    fontWeight: '600',
  },
  buttonsContainer: {
    marginTop: ResponsiveDimensions.vs(120),
    width: '100%',
    alignItems: 'center',
    gap: ResponsiveDimensions.vs(16),
  },
});
