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
import { OtpInput, VerifyButton, Timer } from './components';

export default React.memo(() => {
  const theme = useAppTheme();

  // OTP state
  const [otpCode, setOtpCode] = React.useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = React.useState(120); // 2 minutes in seconds

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);
  };

  const handleVerify = () => {
    const fullOtp = otpCode.join('');
    console.log('Verify OTP:', fullOtp);
  };

  const handleResendOtp = () => {
    console.log('Resend OTP');
    setTimeLeft(120); // Reset timer
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

            {/* OTP Verification Heading */}
            <Text style={[styles.otpHeading, theme.fonts.headlineLarge]}>
              {translate(`${TranslationNamespaces.LOGIN}:otpVerificationTitle`)}
            </Text>

            {/* OTP Section */}
            <View style={styles.otpSection}>
              <Text style={[styles.instructionText, theme.fonts.bodyMedium]}>
                {translate(`${TranslationNamespaces.LOGIN}:otpInstruction`)}
              </Text>

              <OtpInput otpCode={otpCode} onOtpChange={handleOtpChange} />

              <Timer timeLeft={timeLeft} onResend={handleResendOtp} />
            </View>

            {/* Verify Button */}
            <VerifyButton onPress={handleVerify} />
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
  otpHeading: {
    color: 'white',
    textAlign: 'center',
    marginBottom: ResponsiveDimensions.vs(40),
  },
  otpSection: {
    paddingHorizontal: ResponsiveDimensions.vs(20),
    marginBottom: ResponsiveDimensions.vs(40),
  },
  instructionText: {
    color: 'white',
    marginBottom: ResponsiveDimensions.vs(20),
    textAlign: 'left',
  },
});
