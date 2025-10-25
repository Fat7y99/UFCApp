import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import type { RootStackParamList } from '@src/navigation';

import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { removeUserDataLogout } from '@modules/utils';
import { styles } from './styles';
import type { SettingsOption } from './types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppImages } from 'modules/assets/src';

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
    Alert.alert(
      translate(`${TranslationNamespaces.COMMON}:signOutTitle`),
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign out',
          style: 'destructive',
          onPress: () => removeUserDataLogout(),
        },
      ],
      { cancelable: true },
    );
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
      <Image source={AppImages.chevronRight} />
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

export default SettingsOptions;
