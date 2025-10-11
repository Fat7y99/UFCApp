import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';

const SendButton: React.FC = () => {
  const handleSendPress = () => {
    console.log('Send button pressed');
    // Handle send email logic
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sendButton} onPress={handleSendPress}>
        <Text style={styles.sendButtonText}>
          {translate(`${TranslationNamespaces.CONTACT}:sendButton`)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '50%',
    paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingTop: ResponsiveDimensions.vs(16),
    justifyContent: 'flex-end',
    // backgroundColor: 'white',
  },
  sendButton: {
    backgroundColor: AppColors.themeLight.primaryButtonColor, // Turquoise color as per design
    borderRadius: ResponsiveDimensions.vs(16),
    paddingVertical: ResponsiveDimensions.vs(14),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: AppColors.themeLight.primaryButtonColor, // Turquoise color as per design,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sendButtonText: {
    color: AppColors.themeLight.pressedButtonColor, // Dark blue as per design
    fontSize: ResponsiveDimensions.vs(16),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default SendButton;
