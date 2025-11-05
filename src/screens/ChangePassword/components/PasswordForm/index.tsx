import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, I18nManager } from 'react-native';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';

const isRTL = I18nManager.isRTL;

const PasswordForm: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* Current Password Input */}
      <TextInput
        style={styles.passwordInput}
        placeholder={translate(
          `${TranslationNamespaces.CHANGE_PASSWORD}:currentPassword`,
        )}
        placeholderTextColor="#B0B0B0"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        textAlign={isRTL ? 'right' : 'left'}
      />

      {/* New Password Input */}
      <TextInput
        style={styles.passwordInput}
        placeholder={translate(
          `${TranslationNamespaces.CHANGE_PASSWORD}:newPassword`,
        )}
        placeholderTextColor="#B0B0B0"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        textAlign={isRTL ? 'right' : 'left'}
      />

      {/* Confirm New Password Input */}
      <TextInput
        style={styles.passwordInput}
        placeholder={translate(
          `${TranslationNamespaces.CHANGE_PASSWORD}:confirmPassword`,
        )}
        placeholderTextColor="#B0B0B0"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        textAlign={isRTL ? 'right' : 'left'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingTop: ResponsiveDimensions.vs(30),
    backgroundColor: 'white',
  },
  passwordInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingVertical: ResponsiveDimensions.vs(16),
    paddingHorizontal: ResponsiveDimensions.vs(0),
    fontSize: ResponsiveDimensions.vs(16),
    color: '#2C2C2C',
    backgroundColor: 'white',
    marginBottom: ResponsiveDimensions.vs(20),
  },
});

export default PasswordForm;
