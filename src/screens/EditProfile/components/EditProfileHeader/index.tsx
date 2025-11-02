import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import type { RootStackParamList } from '@src/navigation';
import { useUpdateImageProfileApi, useGetCurrentUserApi } from '@modules/core';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
import { styles } from './styles';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ImagePickerResponse, MediaType } from 'react-native-image-picker';
import { AppImages } from 'modules/assets/src';

const EditProfileHeader: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data: currentUser } = useGetCurrentUserApi();

  const { mutate: updateImage, isPending } = useUpdateImageProfileApi({
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: translate(
          `${TranslationNamespaces.EDIT_PROFILE}:profileImageUpdatedSuccessfully`,
        ),
      });
    },
    onError: error => {
      Toast.show({
        type: 'fail',
        text1:
          error.errorMessage ??
          translate(
            `${TranslationNamespaces.EDIT_PROFILE}:failedToUpdateProfileImage`,
          ),
      });
    },
  });

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddPhotoPress = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 0.8 as const,
      maxWidth: 1024,
      maxHeight: 1024,
      includeBase64: false,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        return;
      }

      if (response.errorMessage) {
        Toast.show({
          type: 'fail',
          text1: response.errorMessage,
        });
        return;
      }

      if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        if (asset.uri) {
          // Create FormData
          const formData = new FormData();

          // Determine file type
          const fileType = asset.type || 'image/jpeg';
          const fileName = asset.fileName || `profile_${Date.now()}.jpg`;

          // Append file to FormData
          formData.append('image', {
            uri:
              Platform.OS === 'ios'
                ? asset.uri.replace('file://', '')
                : asset.uri,
            type: fileType,
            name: fileName,
          } as any);

          // Call API
          updateImage({ body: formData });
        }
      }
    });
  };

  const imageUri = (currentUser as any)?.imageUrl;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={AppColors.themeLight.primary_1}
      />

      {/* Header Content */}
      <View style={styles.headerContent}>
        <View style={styles.leftSection}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Image source={AppImages.leftArrow} />
          </TouchableOpacity>
          <Text style={styles.title}>
            {translate(`${TranslationNamespaces.EDIT_PROFILE}:title`)}
          </Text>
        </View>

        {/* Avatar floating in the middle */}
        <View style={styles.avatarContainer}>
          <TouchableOpacity
            style={styles.avatar}
            onPress={handleAddPhotoPress}
            disabled={isPending}
          >
            {isPending ? (
              <ActivityIndicator size="large" color="#999" />
            ) : imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>👤</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.addButton, isPending && styles.addButtonDisabled]}
            onPress={handleAddPhotoPress}
            disabled={isPending}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rightSection} />
      </View>
    </View>
  );
};

export default EditProfileHeader;
