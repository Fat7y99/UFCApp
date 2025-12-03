import React, { useState, useMemo } from 'react';
import { View, Text, TextInput } from 'react-native';
import { validateEmail } from '@src/utils/InputFormatting';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { styles } from './styles';

interface ContactFormProps {
  email: string;
  setEmail: (email: string) => void;
  message: string;
  setMessage: (message: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  email,
  setEmail,
  message,
  setMessage,
}) => {
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // Validate email format
  const isEmailValid = useMemo(() => {
    if (!email.trim()) return true; // Empty is valid (not required to show error immediately)
    return validateEmail(email);
  }, [email]);

  // Check if email has error (show error only if field has been touched AND is invalid)
  const hasEmailError = touchedFields.has('email') && !isEmailValid;

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (!touchedFields.has('email')) {
      setTouchedFields(prev => new Set(prev).add('email'));
    }
  };

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
        style={[styles.emailInput, hasEmailError && styles.emailInputError]}
        placeholder={translate(
          `${TranslationNamespaces.CONTACT}:emailPlaceholder`,
        )}
        placeholderTextColor="#B0B0B0"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={30}
        onBlur={() => {
          if (!touchedFields.has('email')) {
            setTouchedFields(prev => new Set(prev).add('email'));
          }
        }}
      />
      {hasEmailError && (
        <Text style={styles.errorText}>
          {translate(`${TranslationNamespaces.CONTACT}:invalidEmail`)}
        </Text>
      )}

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
