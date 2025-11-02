import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import type { RootStackParamList } from '@src/navigation';
import { FormInput } from '@src/screens/SignIn/components';
import { LogoIcon, AppImages } from '@modules/assets';
import { Screen } from '@modules/components';
import { useForgetPasswordApi } from '@modules/core';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { useAppTheme, AppColors } from '@modules/theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default React.memo(() => {
  const theme = useAppTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  const params = route.params as {
    phone?: string;
    otp?: string;
  };

  const phoneNumber = params?.phone ?? '';
  const otpCode = params?.otp ?? '';

  // Form state
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const { mutate: resetPassword, isPending } = useForgetPasswordApi({
    onSuccess: () => {
      navigation.navigate('resetPasswordSuccess');
    },
    onError: error => {
      Toast.show({
        type: 'fail',
        text1:
          error.errorMessage ??
          translate(
            `${TranslationNamespaces.CHANGE_PASSWORD}:failedToResetPassword`,
          ),
      });
    },
  });

  const handleResetPassword = () => {
    if (!password || password.trim() === '') {
      Toast.show({
        type: 'fail',
        text1: translate(
          `${TranslationNamespaces.CHANGE_PASSWORD}:pleaseEnterNewPassword`,
        ),
      });
      return;
    }

    if (!confirmPassword || confirmPassword.trim() === '') {
      Toast.show({
        type: 'fail',
        text1: translate(
          `${TranslationNamespaces.CHANGE_PASSWORD}:pleaseConfirmPassword`,
        ),
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'fail',
        text1: translate(
          `${TranslationNamespaces.CHANGE_PASSWORD}:passwordsDoNotMatch`,
        ),
      });
      return;
    }

    if (!phoneNumber) {
      Toast.show({
        type: 'fail',
        text1: translate(`${TranslationNamespaces.LOGIN}:phoneNumberRequired`),
      });
      return;
    }

    if (!otpCode) {
      Toast.show({
        type: 'fail',
        text1: translate(
          `${TranslationNamespaces.CHANGE_PASSWORD}:otpCodeRequired`,
        ),
      });
      return;
    }

    resetPassword({
      body: {
        otp: otpCode,
        password: password,
        phone: phoneNumber,
      },
    });
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

            {/* Reset Password Heading */}
            <Text
              style={[styles.resetPasswordHeading, theme.fonts.headlineLarge]}
            >
              {translate(
                `${TranslationNamespaces.CHANGE_PASSWORD}:newPasswordCapitalized`,
              )}
            </Text>

            {/* Password Fields Section */}
            <View style={styles.passwordSection}>
              {/* New Password Input */}
              <FormInput
                placeholder={translate(
                  `${TranslationNamespaces.CHANGE_PASSWORD}:newPassword`,
                )}
                value={password}
                onChangeText={value => setPassword(value)}
                secureTextEntry
              />

              {/* Confirm New Password Input */}
              <FormInput
                placeholder={translate(
                  `${TranslationNamespaces.CHANGE_PASSWORD}:confirmPassword`,
                )}
                value={confirmPassword}
                onChangeText={value => setConfirmPassword(value)}
                secureTextEntry
              />
            </View>

            {/* Reset Password Button */}
            <TouchableOpacity
              style={[styles.resetButton, isPending && styles.disabledButton]}
              onPress={handleResetPassword}
              disabled={isPending}
            >
              {isPending ? (
                <ActivityIndicator color={AppColors.themeLight.primary_1} />
              ) : (
                <Text style={styles.resetButtonText}>
                  {translate(
                    `${TranslationNamespaces.CHANGE_PASSWORD}:changeButton`,
                  )}
                </Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </Screen>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.themeLight.primary_1,
  },
  backgroundImage: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: ResponsiveDimensions.percentHeight(25),
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
  resetPasswordHeading: {
    color: 'white',
    textAlign: 'center',
    marginBottom: ResponsiveDimensions.vs(40),
  },
  passwordSection: {
    marginBottom: ResponsiveDimensions.vs(40),
    gap: ResponsiveDimensions.vs(8),
  },
  passwordLabel: {
    color: 'white',
    marginBottom: ResponsiveDimensions.vs(8),
  },
  passwordLabelMargin: {
    marginTop: ResponsiveDimensions.vs(24),
  },
  passwordInput: {
    backgroundColor: 'white',
    borderRadius: ResponsiveDimensions.vs(8),
    paddingHorizontal: ResponsiveDimensions.vs(16),
    paddingVertical: ResponsiveDimensions.vs(12),
    fontSize: ResponsiveDimensions.vs(16),
    color: '#2C2C2C',
    marginBottom: ResponsiveDimensions.vs(8),
  },
  resetButton: {
    backgroundColor: AppColors.themeLight.primaryButtonColor,
    paddingVertical: ResponsiveDimensions.vs(16),
    paddingHorizontal: ResponsiveDimensions.vs(32),
    borderRadius: ResponsiveDimensions.vs(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: ResponsiveDimensions.vs(20),
  },
  resetButtonText: {
    color: AppColors.themeLight.primary_1,
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.6,
  },
});
