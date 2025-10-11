import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';

const SaveButton: React.FC = () => {
  const handleSavePress = () => {
    console.log('Save button pressed');
    // Handle save profile logic
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
        <Text style={styles.saveButtonText}>
          {translate(`${TranslationNamespaces.EDIT_PROFILE}:saveButton`)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingTop: ResponsiveDimensions.vs(30),
    backgroundColor: 'white',
  },
  saveButton: {
    backgroundColor: '#4CAF50', // Green color as per design
    borderRadius: ResponsiveDimensions.vs(16),
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
  saveButtonText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(16),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default SaveButton;
