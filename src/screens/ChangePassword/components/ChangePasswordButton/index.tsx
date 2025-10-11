import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';

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

const styles = StyleSheet.create({
  container: {
    height: '50%',
    justifyContent: 'flex-end',
    paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingTop: ResponsiveDimensions.vs(30),
    backgroundColor: 'white',
  },
  changePasswordButton: {
    backgroundColor: '#4CAF50', // Green color as per design
    borderRadius: ResponsiveDimensions.vs(8),
    paddingVertical: ResponsiveDimensions.vs(16),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  changePasswordButtonText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(16),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default ChangePasswordButton;
