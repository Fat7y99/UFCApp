import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { styles } from './styles';

const ContactForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>
        {translate(`${TranslationNamespaces.CONTACT}:titleText`)}
      </Text>

      {/* Instruction Text */}
      <Text style={styles.instruction}>
        {translate(`${TranslationNamespaces.CONTACT}:instruction`)}
      </Text>

      {/* Email Input */}
      <TextInput
        style={styles.emailInput}
        placeholder={translate(
          `${TranslationNamespaces.CONTACT}:emailPlaceholder`,
        )}
        placeholderTextColor="#B0B0B0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Message Input */}
      <TextInput
        style={styles.messageInput}
        placeholder={translate(
          `${TranslationNamespaces.CONTACT}:messagePlaceholder`,
        )}
        placeholderTextColor="#B0B0B0"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />
    </View>
  );
};

export default ContactForm;
