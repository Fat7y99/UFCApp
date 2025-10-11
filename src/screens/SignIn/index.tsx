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
import {
  FormInput,
  SignInButton,
  SignUpLink,
  ForgotPasswordLink,
} from './components';

export default React.memo(() => {
  const theme = useAppTheme();

  // Form state
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignIn = () => {
    // Handle sign in logic
    console.log('Sign in data:', formData);
  };

  const handleSignUp = () => {
    // Navigate to sign up screen
    console.log('Navigate to sign up');
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password screen
    console.log('Navigate to forgot password');
  };

  return (
    <Screen style={styles.container}>
      <ImageBackground
        source={AppImages.signupBg} // Using same background as signup
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

            {/* Sign In Heading */}
            <Text style={[styles.signinHeading, theme.fonts.headlineLarge]}>
              {translate(`${TranslationNamespaces.LOGIN}:signin`)}
            </Text>

            {/* Form Fields */}
            <View style={styles.formContainer}>
              <FormInput
                placeholder={translate(
                  `${TranslationNamespaces.LOGIN}:username`,
                )}
                value={formData.username}
                onChangeText={value => handleInputChange('username', value)}
              />

              <FormInput
                placeholder={translate(
                  `${TranslationNamespaces.LOGIN}:password`,
                )}
                value={formData.password}
                onChangeText={value => handleInputChange('password', value)}
                secureTextEntry
              />
            </View>

            {/* Forgot Password Link */}
            <ForgotPasswordLink onPress={handleForgotPassword} />

            {/* Sign In Button */}
            <SignInButton onPress={handleSignIn} />

            {/* Sign Up Link */}
            <SignUpLink onPress={handleSignUp} />
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
  signinHeading: {
    color: 'white',
    textAlign: 'center',
    marginBottom: ResponsiveDimensions.vs(40),
  },
  formContainer: {
    gap: ResponsiveDimensions.vs(16),
  },
});
