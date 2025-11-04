import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import type { RootStackParamList } from '@src/navigation';
import { styles } from './styles';
import type { FinancingOption } from './types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  AppImages,
  PersonalLogo,
  RealEstateLogo,
  SMELogo,
} from 'modules/assets/src';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ServicesSection: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const financingOptions: FinancingOption[] = [
    {
      id: 1,
      title: 'SME',
      icon: () => <SMELogo />,
      description: 'Small and Medium Enterprises',
      onPress: () => navigation.navigate('smeFinancing'),
    },
    {
      id: 2,
      title: 'Real Estate',
      icon: () => <RealEstateLogo />,
      description: 'Property and Real Estate',
      onPress: () => navigation.navigate('realEstateFinancing'),
    },
    {
      id: 3,
      title: 'Personal',
      icon: () => <PersonalLogo />,
      description: 'Personal Finance Solutions',
      onPress: () => navigation.navigate('personalStep1', { serviceId: 12 }),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Financing</Text>
      </View>

      {/* Financing Options */}
      <View style={styles.financingContainer}>
        {financingOptions.map(option => (
          <TouchableOpacity
            key={option.id}
            style={styles.financingCard}
            onPress={option.onPress}
          >
            <View style={styles.financingCardContent}>
              <View style={styles.financingIcon}>{option.icon()}</View>
              <Text style={styles.financingTitle}>{option.title}</Text>
              <Image source={AppImages.rightArrow} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ServicesSection;
