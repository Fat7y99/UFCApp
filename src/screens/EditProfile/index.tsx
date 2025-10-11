import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Screen } from '@modules/components';
import { EditProfileHeader, ProfileForm, SaveButton } from './components';

export default React.memo(() => (
  <Screen style={styles.container}>
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Edit Profile Header */}
      <EditProfileHeader />

      {/* Profile Form */}
      <ProfileForm />

      {/* Save Button */}
      <SaveButton />
    </ScrollView>
  </Screen>
));

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
