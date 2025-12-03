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
import { AppColors } from 'modules/theme/src';

interface SignInButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

const SignInButton: React.FC<SignInButtonProps> = ({
  onPress,
  disabled = false,
}) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.disabledButton]}
    onPress={onPress}
    disabled={disabled}
  >
    {disabled ? (
      <ActivityIndicator color={AppColors.themeLight.pressedButtonColor} />
    ) : (
      <Text style={styles.buttonText}>
        {translate(`${TranslationNamespaces.LOGIN}:signinButton`)}
      </Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColors.themeLight.primaryButtonColor,
    paddingVertical: ResponsiveDimensions.vs(16),
    paddingHorizontal: ResponsiveDimensions.vs(32),
    borderRadius: ResponsiveDimensions.vs(8),
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: AppColors.themeLight.pressedButtonColor,
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default SignInButton;
