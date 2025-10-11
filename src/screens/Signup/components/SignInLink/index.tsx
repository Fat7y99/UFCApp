import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from 'modules/theme/src';

interface SignInLinkProps {
  onPress: () => void;
}

const SignInLink: React.FC<SignInLinkProps> = ({ onPress }) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {translate(`${TranslationNamespaces.SIGNUP}:signInText`)}{' '}
      <Text style={styles.linkText} onPress={onPress}>
        {translate(`${TranslationNamespaces.SIGNUP}:signInLink`)}
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

export default SignInLink;
