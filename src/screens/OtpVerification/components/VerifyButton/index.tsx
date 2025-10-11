import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from 'modules/theme/src';

interface VerifyButtonProps {
  onPress: () => void;
}

const VerifyButton: React.FC<VerifyButtonProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>
      {translate(`${TranslationNamespaces.LOGIN}:verifyButton`)}
    </Text>
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
});

export default VerifyButton;
