import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { styles } from './styles';

const ChangePasswordButton: React.FC = () => {
  const handleChangePasswordPress = () => {
    console.log('Change password button pressed');
    // Handle change password logic
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.changePasswordButton}
        onPress={handleChangePasswordPress}
      >
        <Text style={styles.changePasswordButtonText}>
          {translate(`${TranslationNamespaces.CHANGE_PASSWORD}:changeButton`)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordButton;
