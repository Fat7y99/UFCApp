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
import { FormInput, Checkbox, SignupButton, SignInLink } from './components';

export default React.memo(() => {
  const theme = useAppTheme();

  // Form state
  const [formData, setFormData] = React.useState({
    name: 'Fathy',
    username: 'Cathy',
    mobileNumber: '+201273965628',
    email: 'Fathy.nabil2022@gmail.com',
    idNumber: '29901280102837',
    password: '1234',
    confirmPassword: '1231',
  });

  const [termsAccepted, setTermsAccepted] = React.useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = () => {
    if (!termsAccepted) {
      // Show error or validation message
      return;
    }
    // Handle signup logic
    console.log('Signup data:', formData);
  };

  const handleSignIn = () => {
    // Navigate to sign in screen
    console.log('Navigate to sign in');
  };

  const handleTermsPress = () => {
    // Navigate to terms and conditions
    console.log('Navigate to terms and conditions');
  };

  return (
    <Screen style={styles.container}>
      <ImageBackground
        source={AppImages.signupBg}
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

            {/* Sign Up Heading */}
            <Text style={[styles.signupHeading, theme.fonts.headlineLarge]}>
              {translate(`${TranslationNamespaces.SIGNUP}:signup`)}
            </Text>

            {/* Form Fields */}
            <View style={styles.formContainer}>
              <FormInput
                placeholder={translate(`${TranslationNamespaces.SIGNUP}:name`)}
                value={formData.name}
                onChangeText={value => handleInputChange('name', value)}
              />

              <FormInput
                placeholder={translate(
                  `${TranslationNamespaces.SIGNUP}:username`,
                )}
                value={formData.username}
                onChangeText={value => handleInputChange('username', value)}
              />

              <FormInput
                placeholder={translate(
                  `${TranslationNamespaces.SIGNUP}:mobileNumber`,
                )}
                value={formData.mobileNumber}
                onChangeText={value => handleInputChange('mobileNumber', value)}
              />

              <FormInput
                placeholder={translate(`${TranslationNamespaces.SIGNUP}:email`)}
                value={formData.email}
                onChangeText={value => handleInputChange('email', value)}
              />

              <FormInput
                placeholder={translate(
                  `${TranslationNamespaces.SIGNUP}:idNumber`,
                )}
                value={formData.idNumber}
                onChangeText={value => handleInputChange('idNumber', value)}
              />

              <FormInput
                placeholder={translate(
                  `${TranslationNamespaces.SIGNUP}:password`,
                )}
                value={formData.password}
                onChangeText={value => handleInputChange('password', value)}
                secureTextEntry
              />

              <FormInput
                placeholder={translate(
                  `${TranslationNamespaces.SIGNUP}:confirmPassword`,
                )}
                value={formData.confirmPassword}
                onChangeText={value =>
                  handleInputChange('confirmPassword', value)
                }
                secureTextEntry
              />
            </View>

            {/* Terms and Conditions */}
            <Checkbox
              checked={termsAccepted}
              onToggle={() => setTermsAccepted(!termsAccepted)}
              text={translate(`${TranslationNamespaces.SIGNUP}:termsText`)}
              linkText={translate(`${TranslationNamespaces.SIGNUP}:termsLink`)}
              onLinkPress={handleTermsPress}
            />

            {/* Sign Up Button */}
            <SignupButton
              onPress={handleSignup}
              disabled={!termsAccepted}
              formData={{
                email: formData.email,
                name: formData.name,
                idNumber: formData.idNumber,
                mobileNumber: formData.mobileNumber,
                password: formData.password,
                username: formData.username,
              }}
            />

            {/* Sign In Link */}
            <SignInLink onPress={handleSignIn} />
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
    paddingBottom: ResponsiveDimensions.vs(20), // Space for bottom shapes in background
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
  signupHeading: {
    color: 'white',
    textAlign: 'center',
    marginBottom: ResponsiveDimensions.vs(40),
  },
  formContainer: {
    marginBottom: ResponsiveDimensions.vs(20),
  },
});
