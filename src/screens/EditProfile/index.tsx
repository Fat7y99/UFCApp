import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Screen } from '@modules/components';
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

export default React.memo(() => {
  const [profileData, setProfileData] = React.useState<ProfileData>({
    username: 'greatPower.G',
    fullName: 'Ahmed Ibrahim Mahmoud',
    email: 'Ahmed@ui.com',
    mobileNumber: '(+966) 0547 6324 12',
    gender: 'male',
    dateOfBirth: '',
    address: '',
  });

  return (
    <Screen style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Edit Profile Header */}
        <EditProfileHeader />

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
});

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
});
