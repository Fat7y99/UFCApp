import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { styles } from './styles';

interface SendButtonProps {
  onSend: () => void;
  isEmailValid: boolean;
}

const SendButton: React.FC<SendButtonProps> = ({ onSend, isEmailValid }) => {
  const handleSendPress = () => {
    if (!isEmailValid) {
      Toast.show({
        type: 'error',
        text1: translate(`${TranslationNamespaces.CONTACT}:invalidEmail`),
      });
      return;
    }

    console.log('Send button pressed');
    Toast.show({
      type: 'success',
      text1: translate(`${TranslationNamespaces.CONTACT}:successMessage`),
    });
    // Handle send email logic
    onSend();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.sendButton, !isEmailValid && styles.sendButtonDisabled]}
        onPress={handleSendPress}
        disabled={!isEmailValid}
      >
        <Text
          style={[
            styles.sendButtonText,
            !isEmailValid && styles.sendButtonTextDisabled,
          ]}
        >
          {translate(`${TranslationNamespaces.CONTACT}:sendButton`)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SendButton;
