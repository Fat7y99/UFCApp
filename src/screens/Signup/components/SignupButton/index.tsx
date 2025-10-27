import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import useSignupButton from './useSignupButton';
import { AppColors } from 'modules/theme/src';

interface SignupButtonProps {
  onPress: () => void;
  disabled?: boolean;
  formData: {
    email: string;
    name: string;
    idNumber: string;
    mobileNumber: string;
    password: string;
    username: string;
  };
}

const SignupButton: React.FC<SignupButtonProps> = ({
  onPress,
  disabled = false,
  formData,
}) => {
  const { isPending, onSignupPress } = useSignupButton();

  const handlePress = () => {
    if (!disabled && !isPending) {
      onSignupPress({
        email: formData.email,
        name: formData.name,
        idNumber: formData.idNumber,
        phone: formData.mobileNumber,
        password: formData.password,
        username: formData.username,
      });
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, (disabled || isPending) && styles.disabledButton]}
      onPress={handlePress}
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
