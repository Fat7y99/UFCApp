import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProfilePicture: React.FC = () => {
  const handleAddPhotoPress = () => {
    console.log('Add photo pressed');
    // Handle photo selection logic
  };

  return (
    <View style={styles.container}>
      <View style={styles.profilePictureContainer}>
        <View style={styles.profilePicture}>
          <Text style={styles.profilePictureText}>👤</Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddPhotoPress}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: ResponsiveDimensions.vs(-40), // Overlap with header
    marginBottom: ResponsiveDimensions.vs(30),
    backgroundColor: 'white',
  },
  profilePictureContainer: {
    position: 'relative',
  },
  profilePicture: {
    width: ResponsiveDimensions.vs(120),
    height: ResponsiveDimensions.vs(120),
    borderRadius: ResponsiveDimensions.vs(60),
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profilePictureText: {
    fontSize: ResponsiveDimensions.vs(48),
    color: '#999',
  },
  addButton: {
    position: 'absolute',
    bottom: ResponsiveDimensions.vs(8),
    right: ResponsiveDimensions.vs(8),
    width: ResponsiveDimensions.vs(32),
    height: ResponsiveDimensions.vs(32),
    borderRadius: ResponsiveDimensions.vs(16),
    backgroundColor: '#4CAF50', // Green color
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  addButtonText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: 'bold',
  },
});

export default ProfilePicture;
