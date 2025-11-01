import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppColors } from '@modules/theme';

interface SuccessButtonProps {
  text: string;
  onPress: () => void;
  isPrimary?: boolean;
}

const SuccessButton: React.FC<SuccessButtonProps> = ({
  text,
  onPress,
  isPrimary = true,
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      isPrimary ? styles.primaryButton : styles.secondaryButton,
    ]}
    onPress={onPress}
  >
    <Text
      style={[
        styles.buttonText,
        isPrimary ? styles.primaryButtonText : styles.secondaryButtonText,
      ]}
    >
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: ResponsiveDimensions.vs(16),
    paddingHorizontal: ResponsiveDimensions.vs(32),
    borderRadius: ResponsiveDimensions.vs(12),
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: ResponsiveDimensions.vs(200),
  },
  primaryButton: {
    backgroundColor: AppColors.themeLight.primaryButtonColor,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  buttonText: {
    fontSize: ResponsiveDimensions.vs(16),
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  primaryButtonText: {
    color: AppColors.themeLight.primary_1,
  },
  secondaryButtonText: {
    color: '#9E9E9E',
  },
});

export default SuccessButton;
