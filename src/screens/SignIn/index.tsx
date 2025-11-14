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
import type { RootStackParamList } from '@src/navigation';
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
import useSignInButton from './components/SignInButton/useSignInButton';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default React.memo(() => {
  const theme = useAppTheme();
  const navigation = useNavigation<NavigationProp>();
  const { isSigningIn, onSignInPress } = useSignInButton();

  // Form state
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignIn = () => {
    onSignInPress(formData);
  };

  const handleSignUp = () => {
    navigation.navigate('signup');
  };

  const handleForgotPassword = () => {
    navigation.navigate('forgotPassword');
  };

  const isRTL = I18nManager.isRTL;

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
            automaticallyAdjustKeyboardInsets={true}
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
                textAlign={isRTL ? 'right' : 'left'}
                placeholder={translate(
                  `${TranslationNamespaces.LOGIN}:username`,
                )}
                value={formData.username}
                maxLength={50}
                onChangeText={value => handleInputChange('username', value)}
              />

              <FormInput
                textAlign={isRTL ? 'right' : 'left'}
                placeholder={translate(
                  `${TranslationNamespaces.LOGIN}:password`,
                )}
                value={formData.password}
                maxLength={50}
                onChangeText={value => handleInputChange('password', value)}
                secureTextEntry
              />
            </View>

            {/* Forgot Password Link */}
            <ForgotPasswordLink onPress={handleForgotPassword} />

            {/* Sign In Button */}
            <SignInButton onPress={handleSignIn} disabled={isSigningIn} />

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
