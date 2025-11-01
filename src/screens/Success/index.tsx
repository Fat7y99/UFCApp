import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import type { RootStackParamList } from '@src/navigation';
import { Screen } from '@modules/components';
import { useAppTheme, AppColors } from '@modules/theme';
import { SuccessHeader, SuccessIcon, SuccessButton } from './components';
import { SuccessType, type SuccessScreenConfig } from './types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const getSuccessConfig = (type: string): SuccessScreenConfig => {
  switch (type) {
    case SuccessType.PASSWORD_CHANGED:
      return {
        title: 'Successful',
        message: 'Successfully Changed',
        primaryButtonText: 'HOME',
      };
    case SuccessType.PASSWORD_RESET:
      return {
        title: 'Successful',
        message: 'Password reset successfully',
        primaryButtonText: 'HOME',
      };
    case SuccessType.SIGNUP:
      return {
        title: 'Successful',
        message: 'Account created successfully',
        primaryButtonText: 'HOME',
      };
    case SuccessType.MESSAGE_SENT:
      return {
        title: 'Successful',
        message: 'Message sent successfully',
        primaryButtonText: 'HOME',
        secondaryButtonText: 'GET OFFER',
      };
    case SuccessType.OFFER_APPLIED:
      return {
        title: 'Offer success',
        message: 'Successfully applied',
        primaryButtonText: 'HOME',
        secondaryButtonText: 'GET OFFER',
      };
    case SuccessType.PROFILE_UPDATED:
      return {
        title: 'Successful',
        message: 'Profile updated successfully',
        primaryButtonText: 'HOME',
      };
    default:
      return {
        title: 'Successful',
        message: 'Operation completed successfully',
        primaryButtonText: 'HOME',
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
    navigation.navigate('home');
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
    width: '100%',
    alignItems: 'center',
    gap: ResponsiveDimensions.vs(16),
  },
});
