import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';

interface ForgotPasswordLinkProps {
  onPress: () => void;
}

const ForgotPasswordLink: React.FC<ForgotPasswordLinkProps> = ({ onPress }) => (
  <View style={styles.container}>
    <Text style={styles.linkText} onPress={onPress}>
      {translate(`${TranslationNamespaces.LOGIN}:forgotPassword`)}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    marginBottom: ResponsiveDimensions.vs(20),
  },
  linkText: {
    color: '#00FFFF', // Cyan color for forgot password link
    fontSize: ResponsiveDimensions.vs(14),
    textDecorationLine: 'underline',
  },
});

export default ForgotPasswordLink;
