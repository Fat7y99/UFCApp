import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useAppDispatch, setErrorDialogMessage } from '@src/store';
import { useUpdateProfileApi } from '@modules/core';
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
}

const SaveButton: React.FC<SaveButtonProps> = ({ profileData }) => {
  const dispatch = useAppDispatch();
  const { mutate: updateProfile, isPending } = useUpdateProfileApi({
    onSuccess: () => {
      dispatch(setErrorDialogMessage('Profile updated successfully'));
    },
    onError: error => {
      dispatch(
        setErrorDialogMessage(error.errorMessage ?? 'Failed to update profile'),
      );
    },
  });

  const handleSavePress = () => {
    // Convert date from any format to DD-MM-YYYY if needed
    const formatDate = (date: string): string => {
      if (!date) return '';
      // If date is already in DD-MM-YYYY format, return as is
      if (date.match(/^\d{2}-\d{2}-\d{4}$/)) return date;
      // Otherwise try to parse and convert
      return date;
    };

    const body = {
      address: profileData.address || undefined,
      birthDate: formatDate(profileData.dateOfBirth) || undefined,
      gender: profileData.gender.toUpperCase() as 'MALE' | 'FEMALE' | undefined,
      preferredLanguage: 'EN' as const, // Default or get from user preferences
    };

    // Only include fields that have values
    const filteredBody = Object.fromEntries(
      Object.entries(body).filter(([_, v]) => v !== undefined),
    );

    updateProfile({ body: filteredBody });
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
