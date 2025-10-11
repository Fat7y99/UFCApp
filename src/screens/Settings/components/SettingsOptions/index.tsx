import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { RootStackParamList } from '@src/navigation';

import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface SettingsOption {
  id: string;
  title: string;
  onPress: () => void;
}

const SettingsOptions: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleOptionPress = (optionId: string) => {
    console.log(`${optionId} pressed`);
    // Handle navigation to specific settings screens
    if (optionId === 'help') {
      navigation.navigate('help');
    } else if (optionId === 'changePassword') {
      navigation.navigate('changePassword');
    }
  };

  const handleSignOut = () => {
    console.log('Sign out pressed');
    // Handle sign out logic
  };

  const firstGroupOptions: SettingsOption[] = [
    {
      id: 'changePassword',
      title: translate(`${TranslationNamespaces.SETTINGS}:changePassword`),
      onPress: () => handleOptionPress('changePassword'),
    },
    {
      id: 'termsAndConditions',
      title: translate(`${TranslationNamespaces.SETTINGS}:termsAndConditions`),
      onPress: () => handleOptionPress('termsAndConditions'),
    },
    {
      id: 'privacyPolicy',
      title: translate(`${TranslationNamespaces.SETTINGS}:privacyPolicy`),
      onPress: () => handleOptionPress('privacyPolicy'),
    },
    {
      id: 'help',
      title: translate(`${TranslationNamespaces.SETTINGS}:help`),
      onPress: () => handleOptionPress('help'),
    },
  ];

  const secondGroupOptions: SettingsOption[] = [
    {
      id: 'language',
      title: translate(`${TranslationNamespaces.SETTINGS}:language`),
      onPress: () => handleOptionPress('language'),
    },
    {
      id: 'signOut',
      title: translate(`${TranslationNamespaces.SETTINGS}:signOut`),
      onPress: handleSignOut,
    },
  ];

  const renderOption = (option: SettingsOption, isLast: boolean = false) => (
    <TouchableOpacity
      key={option.id}
      style={[styles.optionContainer, !isLast && styles.optionBorder]}
      onPress={option.onPress}
    >
      <Text style={styles.optionText}>{option.title}</Text>
      <Text style={styles.chevronIcon}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* First Group */}
      <View style={styles.groupContainer}>
        {firstGroupOptions.map((option, index) =>
          renderOption(option, index === firstGroupOptions.length - 1),
        )}
      </View>

      {/* Second Group */}
      <View style={styles.groupContainer}>
        {secondGroupOptions.map((option, index) =>
          renderOption(option, index === secondGroupOptions.length - 1),
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ResponsiveDimensions.vs(20),
    justifyContent: 'space-between',
    height: '80%',
  },
  groupContainer: {
    borderRadius: ResponsiveDimensions.vs(12),
    marginBottom: ResponsiveDimensions.vs(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: ResponsiveDimensions.vs(16),
    paddingHorizontal: ResponsiveDimensions.vs(16),
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionText: {
    fontSize: ResponsiveDimensions.vs(16),
    color: '#333',
    flex: 1,
  },
  chevronIcon: {
    fontSize: ResponsiveDimensions.vs(18),
    color: '#999',
    fontWeight: 'bold',
  },
});

export default SettingsOptions;
