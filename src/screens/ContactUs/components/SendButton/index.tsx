import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { styles } from './styles';

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

export default SendButton;
