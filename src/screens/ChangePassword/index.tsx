import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Screen } from '@modules/components';
import {
  ChangePasswordHeader,
  PasswordForm,
  ChangePasswordButton,
} from './components';

export default React.memo(() => (
  <Screen style={styles.container}>
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Change Password Header */}
      <ChangePasswordHeader />

      {/* Password Form */}
      <PasswordForm />

      {/* Change Password Button */}
      <ChangePasswordButton />
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
