import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Screen } from '@modules/components';
import { ContactHeader, ContactForm, SendButton } from './components';

export default React.memo(() => (
  <Screen style={styles.container}>
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Contact Header */}
      <ContactHeader />

      {/* Contact Form */}
      <ContactForm />

      {/* Send Button */}
      <SendButton />
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
