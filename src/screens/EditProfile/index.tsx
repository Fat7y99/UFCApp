import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import * as React from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { useAppSelector } from '@src/store';
import { Screen } from '@modules/components';
import { useGetCurrentUserApi } from '@modules/core';
import { EditProfileHeader, ProfileForm, SaveButton } from './components';
interface ProfileData {
  username: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  address: string;
}

export default () => {
  const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);
  const { data: currentUser, isLoading } = useGetCurrentUserApi({
    enabled: isLoggedIn,
  });

  const [profileData, setProfileData] = React.useState<ProfileData>({
    username: '',
    fullName: '',
    email: '',
    mobileNumber: '',
    gender: 'male',
    dateOfBirth: '',
    address: '',
  });

  // Populate form when user data is loaded
  React.useEffect(() => {
    if (currentUser) {
      const genderValue = currentUser.gender?.toLowerCase();
      const validGender: 'male' | 'female' =
        genderValue === 'male' || genderValue === 'female'
          ? genderValue
          : 'male';

      setProfileData({
        username: currentUser.username ?? '',
        fullName: currentUser.name ?? '',
        email: currentUser.email ?? '',
        mobileNumber: currentUser.phone ?? '',
        gender: validGender,
        dateOfBirth: currentUser.birthDate
          ? moment(currentUser.birthDate).format('DD-MM-YYYY')
          : '',
        address: currentUser.address ?? '',
      });
    }
  }, [currentUser]);

  if (isLoading) {
    return (
      <Screen style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      </Screen>
    );
  }

  if (!currentUser) {
    return (
      <Screen style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      </Screen>
    );
  }
  const route = useRoute<any>();
  const onChangeImageUrl = route.params.onChangeImageUrl;
  return (
    <Screen style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        {/* Edit Profile Header */}
        <EditProfileHeader onChangeImageUrl={onChangeImageUrl} />

        {/* Profile Form */}
        <ProfileForm
          profileData={profileData}
          setProfileData={setProfileData}
        />

        {/* Save Button */}
        <SaveButton profileData={profileData} />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: ResponsiveDimensions.vs(20),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
