import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { validateEmail } from '@src/utils/InputFormatting';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';

import { useSendOTPApi } from 'modules/core/src';
import { AppColors } from 'modules/theme/src';

interface SignupButtonProps {
  disabled?: boolean;
  formData: {
    email: string;
    name: string;
    idNumber: string;
    mobileNumber: string;
    password: string;
    username: string;
  };
  confirmPassword?: string;
  isTermsAccepted?: boolean;
}

const SignupButton: React.FC<SignupButtonProps> = ({
  disabled = false,
  formData,
  confirmPassword,
  isTermsAccepted,
}) => {
  const { isPending, mutate: sendOTP } = useSendOTPApi();
  const navigation = useNavigation();

  const validateField = (
    value: string,
    fieldKey: keyof typeof formData,
  ): boolean => {
    if (!value.trim()) {
      Toast.show({
        type: 'fail',
        text1: translate(`${TranslationNamespaces.COMMON}:fieldRequired`, {
          field: translate(`${TranslationNamespaces.SIGNUP}:${fieldKey}`),
        }),
      });
      return false;
    }
    if (fieldKey === 'confirmPassword') {
      if (!value.trim()) {
        Toast.show({
          type: 'fail',
          text1: translate(`${TranslationNamespaces.COMMON}:fieldRequired`, {
            field: translate(`${TranslationNamespaces.SIGNUP}:${fieldKey}`),
          }),
        });
        return false;
      }
      return true;
    }
    if (fieldKey === 'mobileNumber') {
      // validate minimum 9 digits
      if (value.length < 9) {
        Toast.show({
          type: 'fail',
          text1: translate(`${TranslationNamespaces.SIGNUP}:minimum9Digits`),
        });
        return false;
      }
      // didn't start with + and country code
      if (!value.startsWith('+')) {
        Toast.show({
          type: 'fail',
          text1: translate(
            `${TranslationNamespaces.SIGNUP}:phoneNumberMustStartWithPlus`,
          ),
        });
        return false;
      }
      return true;
    }
    if (fieldKey === 'email') {
      // email must be a valid email using regex
      if (!validateEmail(value)) {
        Toast.show({
          type: 'fail',
          text1: translate(`${TranslationNamespaces.SIGNUP}:invalidEmail`),
        });
        return false;
      }
      return true;
    }
    if (fieldKey === 'name') {
      const atleastOneLetterAndSpacing = new RegExp(/[a-zA-Z\s]*$/);
      if (!atleastOneLetterAndSpacing.test(value)) {
        Toast.show({
          type: 'fail',
          text1: translate(
            `${TranslationNamespaces.SIGNUP}:onlyLettersAndSpacesAllowed`,
          ),
        });
        return false;
      }
      return true;
    }

    return true;
  };

  const handleSignup = () => {
    // Validate all required fields
    if (!validateField(formData.name, 'name')) return;
    if (!validateField(formData.username, 'username')) return;
    if (!validateField(formData.mobileNumber, 'mobileNumber')) return;
    if (!validateField(formData.email, 'email')) return;
    if (!validateField(formData.idNumber, 'idNumber')) return;
    if (!validateField(formData.password, 'password')) return;
    if (!validateField(confirmPassword, 'confirmPassword')) return;
    console.log('validated all fields', validateField(formData.email, 'email'));
    // Check if passwords match
    if (formData.password !== confirmPassword) {
      Toast.show({
        type: 'fail',
        text1: translate(`${TranslationNamespaces.SIGNUP}:passwordsDoNotMatch`),
      });
      return;
    }

    if (!isTermsAccepted) {
      Toast.show({
        type: 'fail',
        text1: translate(`${TranslationNamespaces.SIGNUP}:pleaseAcceptTerms`),
      });
      return;
    }

    handlePress();
  };
  const handlePress = () => {
    if (!disabled && !isPending) {
      sendOTP(
        {
          body: {
            phone: formData.mobileNumber,
            username: formData.username,
            email: formData.email,
          },
        },
        {
          onSuccess: () => {
            navigation.navigate('otpVerification', {
              phone: formData.mobileNumber,
              signupData: formData,
              resendOtpHandler: () => {
                sendOTP(
                  { body: { phone: formData.mobileNumber } },
                  {
                    onSuccess: () => {},
                    onError: error => {
                      Toast.show({
                        type: 'fail',
                        text1: error.errorMessage ?? 'Failed to send OTP',
                      });
                    },
                  },
                );
              },
            });
          },
          onError: error => {
            Toast.show({
              type: 'fail',
              text1: error.errorMessage ?? 'Failed to send OTP',
            });
          },
        },
      );
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, (disabled || isPending) && styles.disabledButton]}
      onPress={handleSignup}
      disabled={disabled || isPending}
    >
      {isPending ? (
        <ActivityIndicator color={AppColors.themeLight.pressedButtonColor} />
      ) : (
        <Text style={styles.buttonText}>
          {translate(`${TranslationNamespaces.SIGNUP}:signupButton`)}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColors.themeLight.primaryButtonColor, // Cyan color
    paddingVertical: ResponsiveDimensions.vs(16),
    paddingHorizontal: ResponsiveDimensions.vs(32),
    borderRadius: ResponsiveDimensions.vs(8),
    alignItems: 'center',
    marginBottom: ResponsiveDimensions.vs(20),
  },
  disabledButton: {
    backgroundColor: '#666',
    opacity: 0.6,
  },
  buttonText: {
    color: AppColors.themeLight.pressedButtonColor,
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: 'bold',
  },
});

export default SignupButton;
