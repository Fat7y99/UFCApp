import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useUpdateUserProfileApi } from '@modules/core';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';

interface ProfileData {
  username: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  address: string;
}

interface SaveButtonProps {
  profileData: ProfileData;
  userId?: number;
}

const SaveButton: React.FC<SaveButtonProps> = ({ profileData }) => {
  const { mutate: updateProfile, isPending } = useUpdateUserProfileApi({
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: translate(
          `${TranslationNamespaces.EDIT_PROFILE}:profileUpdatedSuccessfully`,
        ),
      });
    },
    onError: error => {
      Toast.show({
        type: 'fail',
        text1:
          error.errorMessage ??
          translate(
            `${TranslationNamespaces.EDIT_PROFILE}:failedToUpdateProfile`,
          ),
      });
    },
  });

  const handleSavePress = () => {
    if (!profileData) {
      Toast.show({
        type: 'fail',
        text1: translate(
          `${TranslationNamespaces.EDIT_PROFILE}:profileDataRequired`,
        ),
      });
      return;
    }

    // Convert profile data to UpdateProfileBody
    const updateProfileBody: {
      address?: string;
      birthDate?: string;
      gender?: 'MALE' | 'FEMALE';
      name?: string;
      username?: string;
      phone?: string;
      email?: string;
    } = {};

    if (profileData.address && profileData.address.trim() !== '') {
      updateProfileBody.address = profileData.address;
    }

    if (profileData.dateOfBirth && profileData.dateOfBirth.trim() !== '') {
      updateProfileBody.birthDate = profileData.dateOfBirth;
    }
    if (profileData.fullName && profileData.fullName.trim() !== '') {
      updateProfileBody.name = profileData.fullName;
    }
    if (profileData.username && profileData.username.trim() !== '') {
      updateProfileBody.username = profileData.username;
    }
    if (profileData.mobileNumber && profileData.mobileNumber.trim() !== '') {
      updateProfileBody.phone = profileData.mobileNumber;
    }
    if (profileData.email && profileData.email.trim() !== '') {
      updateProfileBody.email = profileData.email;
    }
    if (
      profileData.gender &&
      (profileData.gender === 'male' || profileData.gender === 'female')
    ) {
      updateProfileBody.gender = profileData.gender.toUpperCase() as
        | 'MALE'
        | 'FEMALE';
    }

    updateProfile({ body: updateProfileBody });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.saveButton, isPending && styles.disabledButton]}
        onPress={handleSavePress}
        disabled={isPending}
      >
        {isPending ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.saveButtonText}>
            {translate(`${TranslationNamespaces.EDIT_PROFILE}:saveButton`)}
          </Text>
        )}
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
  disabledButton: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(16),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default SaveButton;
