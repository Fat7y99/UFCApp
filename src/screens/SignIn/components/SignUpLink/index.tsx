import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from 'modules/theme/src';

interface SignUpLinkProps {
  onPress: () => void;
}

const SignUpLink: React.FC<SignUpLinkProps> = ({ onPress }) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {translate(`${TranslationNamespaces.LOGIN}:signUpText`)}{' '}
      <Text style={styles.linkText} onPress={onPress}>
        {translate(`${TranslationNamespaces.LOGIN}:signUpLink`)}
      </Text>
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(16),
  },
  linkText: {
    fontSize: ResponsiveDimensions.vs(16),
    fontWeight: 'bold',
    color: AppColors.themeLight.primaryButtonColor,
  },
});

export default SignUpLink;
