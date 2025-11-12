import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { validateEmail } from '@src/utils/InputFormatting';
import { Screen } from '@modules/components';
import { ContactHeader, ContactForm, SendButton } from './components';

const ContactUs = () => {
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  // Validate email format
  const isEmailValid = React.useMemo(() => {
    if (!email.trim()) return false; // Email is required
    return validateEmail(email);
  }, [email]);

  const handleReset = () => {
    setEmail('');
    setMessage('');
  };

  return (
    <Screen style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Contact Header */}
        <ContactHeader />

        {/* Contact Form */}
        <ContactForm
          email={email}
          setEmail={setEmail}
          message={message}
          setMessage={setMessage}
        />

        {/* Send Button */}
        <SendButton onSend={handleReset} isEmailValid={isEmailValid} />
      </ScrollView>
    </Screen>
  );
};

export default React.memo(ContactUs);

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
