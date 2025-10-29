import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import type { RootStackParamList } from '@src/navigation';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppImages } from 'modules/assets/src';

interface HelpOption {
  id: string;
  title: string;
  onPress: () => void;
}

const HelpOptions: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleOptionPress = (optionId: string) => {
    console.log(`${optionId} pressed`);
    // Handle navigation to specific help screens
    if (optionId === 'faqs') {
      navigation.navigate('faqs');
    } else if (optionId === 'contactUs') {
      navigation.navigate('contactUs');
    }
  };

  const helpOptions: HelpOption[] = [
    {
      id: 'faqs',
      title: translate(`${TranslationNamespaces.HELP}:faqs`),
      onPress: () => handleOptionPress('faqs'),
    },
    {
      id: 'contactUs',
      title: translate(`${TranslationNamespaces.HELP}:contactUs`),
      onPress: () => handleOptionPress('contactUs'),
    },
  ];

  const renderOption = (option: HelpOption, isLast: boolean = false) => (
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
      <View style={styles.groupContainer}>
        {helpOptions.map((option, index) =>
          renderOption(option, index === helpOptions.length - 1),
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingTop: ResponsiveDimensions.vs(20),
    backgroundColor: 'white',
  },
  groupContainer: {
    backgroundColor: 'white',
    borderRadius: ResponsiveDimensions.vs(12),
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

export default HelpOptions;
