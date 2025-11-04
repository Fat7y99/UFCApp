import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { RootStackParamList } from '@src/navigation';

import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { styles } from './styles';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EditProfileIcon } from 'modules/assets/src';
import { useGetCurrentUserApi } from 'modules/core/src/Api/hooks';

const ProfileSection: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleEditProfile = () => {
    navigation.navigate('editProfile');
  };

  const { data: currentUser } = useGetCurrentUserApi();

  return (
    <View style={styles.container}>
      {/* Username */}
      <Text style={styles.username}> {currentUser?.username}</Text>

      {/* Edit Profile */}
      <TouchableOpacity
        style={styles.editProfileContainer}
        onPress={handleEditProfile}
      >
        <Text style={styles.editProfileText}>
          {translate(`${TranslationNamespaces.SETTINGS}:editProfile`)}
        </Text>
        <EditProfileIcon />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileSection;
