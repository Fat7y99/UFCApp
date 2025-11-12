import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';

import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  I18nManager,
} from 'react-native';
import { LogoIcon, AppImages } from '@modules/assets';
import { Screen } from '@modules/components';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { useAppTheme, AppColors } from '@modules/theme';
import {
  FormInput,
  MobileNumberInput,
  Checkbox,
  SignupButton,
  SignInLink,
} from './components';

const isRTL = I18nManager.isRTL;
const COUNTRY_CODE = '+20';

export default React.memo(() => {
  const theme = useAppTheme();

  // Form state
  const [formData, setFormData] = React.useState({
    name: '',
    username: '',
    mobileNumber: COUNTRY_CODE,
    email: '',
    idNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const navigation = useNavigation();

  // Check if all required fields are filled and passwords match
  const isFormValid = React.useMemo(() => {
    const username = formData?.username?.trim() || '';
    const isUsernameValid =
      username.length > 3 &&
      /^[a-zA-Z]/.test(username) && // Must start with letter
      !/^[0-9]+$/.test(username) && // Cannot be only numbers
      !username.includes(' ') && // Cannot contain spaces
      !/[^a-zA-Z0-9]/.test(username); // Cannot contain special characters

    return (
      formData?.name?.trim() !== '' &&
      username !== '' &&
      isUsernameValid &&
      formData?.mobileNumber?.trim() !== '' &&
      formData?.mobileNumber?.length > COUNTRY_CODE.length && // Ensure there are digits after country code
      formData?.email?.trim() !== '' &&
      formData?.idNumber?.trim() !== '' &&
      formData?.password?.trim() !== '' &&
      formData?.confirmPassword?.trim() !== '' &&
      termsAccepted
    );
  }, [formData, termsAccepted]);
  const handleInputChange = (field: string, value: string) => {
    //max length 50 characters
    if (value.length > 50) {
      return;
    }
    //
    if (field === 'username') {
      // Remove spaces and special characters (only allow letters and numbers)
      let usernameValue = value.replace(/[^a-zA-Z0-9]/g, '');

      // Check if username starts with a number - remove the leading number
      if (usernameValue.length > 0 && /^[0-9]/.test(usernameValue)) {
        usernameValue = usernameValue.replace(/^[0-9]+/, '');
      }

      // Check if username is only numbers - keep only letters if it's all numbers
      if (usernameValue.length > 0 && /^[0-9]+$/.test(usernameValue)) {
        usernameValue = usernameValue.replace(/[0-9]/g, '');
      }

      setFormData(prev => ({ ...prev, [field]: usernameValue }));
      return;
    } else if (field === 'email') {
      const emailValue = value.replace(/[^a-zA-Z0-9@.]/g, '');
      setFormData(prev => ({ ...prev, [field]: emailValue }));
      return;
    } else if (field === 'mobileNumber') {
      // MobileNumberInput component ensures country code is always present
      // Just validate the length of digits after country code
      const digitsAfterCode = value.substring(COUNTRY_CODE.length);
      if (digitsAfterCode.length > 10) {
        return;
      }
      setFormData(prev => ({ ...prev, [field]: value }));
      return;
    } else if (field === 'idNumber') {
      const idNumberValue = value.replace(/[^0-9*]/g, '');
      setFormData(prev => ({ ...prev, [field]: idNumberValue }));
      return;
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignIn = () => {
    navigation.navigate('login');
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
            automaticallyAdjustKeyboardInsets={true}
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
                textAlign={isRTL ? 'right' : 'left'}
              />

              <FormInput
                textAlign={isRTL ? 'right' : 'left'}
                placeholder={translate(
                  `${TranslationNamespaces.SIGNUP}:username`,
                )}
                value={formData.username}
                onChangeText={value => handleInputChange('username', value)}
              />

              <MobileNumberInput
                textAlign={isRTL ? 'right' : 'left'}
                placeholder={translate(
                  `${TranslationNamespaces.SIGNUP}:mobileNumber`,
                )}
                value={formData.mobileNumber}
                onChangeText={(value: string) =>
                  handleInputChange('mobileNumber', value)
                }
                countryCode={COUNTRY_CODE}
              />

              <FormInput
                textAlign={isRTL ? 'right' : 'left'}
                placeholder={translate(`${TranslationNamespaces.SIGNUP}:email`)}
                value={formData.email}
                onChangeText={value => handleInputChange('email', value)}
              />

              <FormInput
                textAlign={isRTL ? 'right' : 'left'}
                placeholder={translate(
                  `${TranslationNamespaces.SIGNUP}:idNumber`,
                )}
                value={formData.idNumber}
                onChangeText={value => handleInputChange('idNumber', value)}
              />

              <FormInput
                textAlign={isRTL ? 'right' : 'left'}
                placeholder={translate(
                  `${TranslationNamespaces.SIGNUP}:password`,
                )}
                value={formData.password}
                onChangeText={value => handleInputChange('password', value)}
                secureTextEntry
              />

              <FormInput
                textAlign={isRTL ? 'right' : 'left'}
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
              confirmPassword={formData.confirmPassword}
              isTermsAccepted={termsAccepted}
              disabled={!isFormValid}
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
