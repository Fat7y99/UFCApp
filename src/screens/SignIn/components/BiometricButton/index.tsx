import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { AppColors } from 'modules/theme/src';

interface BiometricButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

const BiometricButton: React.FC<BiometricButtonProps> = ({
  onPress,
  disabled = false,
}) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.disabledButton]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.7}
  >
    {disabled ? (
      <ActivityIndicator color="white" />
    ) : (
      <MaterialDesignIcons
        name="fingerprint"
        size={ResponsiveDimensions.vs(24)}
        color="white"
      />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColors.themeLight.primary_1,
    width: ResponsiveDimensions.vs(50),
    height: ResponsiveDimensions.vs(50),
    borderRadius: ResponsiveDimensions.vs(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default BiometricButton;
