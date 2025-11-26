import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, I18nManager } from 'react-native';
import type { RootStackParamList } from '@src/navigation';

import { useAppSelector } from '@src/store';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { styles } from './styles';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EditProfileIcon } from 'modules/assets/src';
import { useGetCurrentUserApi } from 'modules/core/src/Api/hooks';
const isRTL = I18nManager.isRTL;
const ProfileSection: React.FC<{
  onChangeImageUrl: (uri?: string) => void;
}> = ({ onChangeImageUrl }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleEditProfile = () => {
    navigation.navigate('editProfile', { onChangeImageUrl: onChangeImageUrl });
  };
  const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);
  const { data: currentUser } = useGetCurrentUserApi({
    enabled: isLoggedIn,
  });

  return (
    <View style={styles.container}>
      {/* Username */}
      {currentUser ? (
        <>
          <Text style={[styles.username, isRTL && { textAlign: 'left' }]}>
            {isRTL ? ' ' : ''}
            {currentUser?.username}
          </Text>

          <TouchableOpacity
            style={styles.editProfileContainer}
            onPress={handleEditProfile}
          >
            <Text style={styles.editProfileText}>
              {translate(`${TranslationNamespaces.SETTINGS}:editProfile`)}
            </Text>
            <EditProfileIcon />
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
};

export default ProfileSection;
