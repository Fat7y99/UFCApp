import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { RootStackParamList } from '@src/navigation';

import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { styles } from './styles';
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

export default ProfileSection;
