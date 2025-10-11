import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from 'modules/theme/src';

interface SendOtpButtonProps {
  onPress: () => void;
}

const SendOtpButton: React.FC<SendOtpButtonProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>
      {translate(`${TranslationNamespaces.LOGIN}:sendOtpButton`)}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColors.themeLight.primaryButtonColor,
    paddingVertical: ResponsiveDimensions.vs(16),
    paddingHorizontal: ResponsiveDimensions.vs(32),
    borderRadius: ResponsiveDimensions.vs(8),
    alignItems: 'center',
    marginBottom: ResponsiveDimensions.vs(20),
  },
  buttonText: {
    color: AppColors.themeLight.pressedButtonColor,
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: 'bold',
  },
});

export default SendOtpButton;
