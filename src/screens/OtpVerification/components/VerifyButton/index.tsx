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

interface VerifyButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

const VerifyButton: React.FC<VerifyButtonProps> = ({
  onPress,
  disabled = false,
}) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.disabledButton]}
    onPress={onPress}
    disabled={disabled}
  >
    {disabled ? (
      <ActivityIndicator color={AppColors.themeLight.primary_1} />
    ) : (
      <Text style={styles.buttonText}>
        {translate(`${TranslationNamespaces.LOGIN}:verifyButton`)}
      </Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColors.themeLight.primaryButtonColor, // Cyan color
    paddingVertical: ResponsiveDimensions.vs(16),
    paddingHorizontal: ResponsiveDimensions.vs(32),
    borderRadius: ResponsiveDimensions.vs(12), // More rounded corners
    alignItems: 'center',
    marginBottom: ResponsiveDimensions.vs(20),
  },
  buttonText: {
    color: AppColors.themeLight.primary_1, // Dark blue text
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default VerifyButton;
