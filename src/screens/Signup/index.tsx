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
import Toast from 'react-native-toast-message';
import { LogoIcon, AppImages } from '@modules/assets';
import { Screen } from '@modules/components';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { useAppTheme, AppColors } from '@modules/theme';
import { FormInput, Checkbox, SignupButton, SignInLink } from './components';

const isRTL = I18nManager.isRTL;
export default React.memo(() => {
  const theme = useAppTheme();

  // Form state
  const [formData, setFormData] = React.useState({
    name: '',
    username: '',
    mobileNumber: '',
    email: '',
    idNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const navigation = useNavigation();

  // Check if all required fields are filled and passwords match
  const isFormValid = React.useMemo(
    () =>
      formData?.name?.trim() !== '' &&
      formData?.username?.trim() !== '' &&
      formData?.mobileNumber?.trim() !== '' &&
      formData?.email?.trim() !== '' &&
      formData?.idNumber?.trim() !== '' &&
      formData?.password?.trim() !== '' &&
      formData?.confirmPassword?.trim() !== '' &&
      termsAccepted,
    [formData, termsAccepted],
  );
  const handleInputChange = (field: string, value: string) => {
    //max length 50 characters
    if (value.length > 50) {
      Toast.show({
        type: 'fail',
        text1: translate(
          `${TranslationNamespaces.SIGNUP}:maxLength50Characters`,
          {
            field: field,
          },
        ),
      });
      return;
    }
    if (field === 'username') {
      // Remove non-English characters
      const englishValue = value.replace(/[^a-zA-Z0-9]/g, '');
      setFormData(prev => ({ ...prev, [field]: englishValue }));
      return;
    } //
    else if (field === 'email') {
      const emailValue = value.replace(/[^a-zA-Z0-9@.]/g, '');
      setFormData(prev => ({ ...prev, [field]: emailValue }));
      return;
    } else if (field === 'mobileNumber') {
      // Only allow numbers and one plus sign at the beginning
      let mobileNumberValue = value.replace(/[^\d+]/g, ''); // Remove everything except digits and +

      // Ensure only one plus sign at the beginning
      if (mobileNumberValue.startsWith('+')) {
        // Keep the + at the start and remove all other + signs
        mobileNumberValue =
          '+' + mobileNumberValue.substring(1).replace(/\+/g, '');
      } else {
        // Remove all + signs if not at the beginning
        mobileNumberValue = mobileNumberValue.replace(/\+/g, '');
      }

      // Count only digits (excluding the + sign)
      const digitsOnly = mobileNumberValue.replace(/\+/g, '');
      if (digitsOnly.length > 20) {
        Toast.show({
          type: 'fail',
          text1: translate(
            `${TranslationNamespaces.SIGNUP}:mobileNumberMustBe20Digits`,
          ),
        });
        return;
      }
      setFormData(prev => ({ ...prev, [field]: mobileNumberValue }));
      return;
    } else if (field === 'idNumber') {
      const idNumberValue = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({ ...prev, [field]: idNumberValue }));
      return;
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignIn = () => {
    navigation.goBack();
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

              <FormInput
                textAlign={isRTL ? 'right' : 'left'}
                placeholder={translate(
                  `${TranslationNamespaces.SIGNUP}:mobileNumber`,
                )}
                value={formData.mobileNumber}
                onChangeText={value => handleInputChange('mobileNumber', value)}
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
