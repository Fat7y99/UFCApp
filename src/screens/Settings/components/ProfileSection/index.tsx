import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { RootStackParamList } from '@src/navigation';

import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ProfileSection: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleEditProfile = () => {
    navigation.navigate('editProfile');
  };

  return (
    <View style={styles.container}>
      {/* Username */}
      <Text style={styles.username}>greatPower.G</Text>

      {/* Edit Profile */}
      <TouchableOpacity
        style={styles.editProfileContainer}
        onPress={handleEditProfile}
      >
        <Text style={styles.editProfileText}>
          {translate(`${TranslationNamespaces.SETTINGS}:editProfile`)}
        </Text>
        <Text style={styles.editIcon}>✏️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: ResponsiveDimensions.vs(56),
    paddingBottom: ResponsiveDimensions.vs(20),
    paddingHorizontal: ResponsiveDimensions.vs(20),
    backgroundColor: 'white',
  },
  username: {
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: 'bold',
    color: '#6A1B9A', // Dark purple
    marginBottom: ResponsiveDimensions.vs(8),
  },
  editProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ResponsiveDimensions.vs(8),
  },
  editProfileText: {
    fontSize: ResponsiveDimensions.vs(14),
    color: '#999',
  },
  editIcon: {
    fontSize: ResponsiveDimensions.vs(12),
  },
});

export default ProfileSection;
