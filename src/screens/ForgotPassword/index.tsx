import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { LogoIcon, AppImages } from '@modules/assets';
import { Screen } from '@modules/components';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { useAppTheme, AppColors } from '@modules/theme';
import { PhoneInput, SendOtpButton } from './components';

export default React.memo(() => {
  const theme = useAppTheme();

  // Form state
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
  };

  const handleSendOtp = () => {
    // Handle send OTP logic
    console.log('Send OTP to:', phoneNumber);
  };

  return (
    <Screen style={styles.container}>
      <ImageBackground
        source={AppImages.signupBg} // Using same background as other screens
        style={styles.backgroundImage}
        resizeMode="stretch"
      >
        <View style={styles.contentContainer}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Logo and App Name */}
            <View style={styles.headerContainer}>
              <LogoIcon />
            </View>

            {/* Forgot Password Heading */}
            <Text
              style={[styles.forgotPasswordHeading, theme.fonts.headlineLarge]}
            >
              {translate(`${TranslationNamespaces.LOGIN}:forgotPasswordTitle`)}
            </Text>

            {/* Phone Number Section */}
            <View style={styles.phoneSection}>
              <Text style={[styles.phoneLabel, theme.fonts.titleMedium]}>
                {translate(`${TranslationNamespaces.LOGIN}:phoneNumberLabel`)}
              </Text>

              <PhoneInput
                placeholder={translate(
                  `${TranslationNamespaces.LOGIN}:phonePlaceholder`,
                )}
                value={phoneNumber}
                onChangeText={handlePhoneChange}
              />

              <Text style={[styles.otpMessage, theme.fonts.bodyMedium]}>
                {translate(`${TranslationNamespaces.LOGIN}:otpMessage`)}
              </Text>
            </View>

            {/* Send OTP Button */}
            <SendOtpButton onPress={handleSendOtp} />
          </ScrollView>
        </View>
      </ImageBackground>
    </Screen>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.themeLight.primary_1, // Dark blue background
  },
  backgroundImage: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: ResponsiveDimensions.percentHeight(17),
    marginBottom: ResponsiveDimensions.percentHeight(6),
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingBottom: ResponsiveDimensions.vs(20),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: ResponsiveDimensions.vs(40),
  },
  appNameContainer: {
    marginLeft: ResponsiveDimensions.vs(16),
  },
  appName: {
    color: 'white',
    textAlign: 'center',
  },
  forgotPasswordHeading: {
    color: 'white',
    textAlign: 'center',
    marginBottom: ResponsiveDimensions.vs(40),
  },
  phoneSection: {
    marginBottom: ResponsiveDimensions.vs(40),
  },
  phoneLabel: {
    color: 'white',
    marginBottom: ResponsiveDimensions.vs(16),
  },
  otpMessage: {
    color: 'white',
    marginTop: ResponsiveDimensions.vs(16),
    textAlign: 'left',
  },
});
