import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Image, I18nManager } from 'react-native';

import type { RootStackParamList } from '@src/navigation';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
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
  const isRTL = I18nManager.isRTL;

  const financingOptions: FinancingOption[] = [
    {
      id: 1,
      title: translate(`${TranslationNamespaces.FINANCING}:smeFinancing`),
      icon: () => <SMELogo />,
      description: translate(`${TranslationNamespaces.FINANCING}:smeFinancing`),
      onPress: () => navigation.navigate('smeFinancing'),
    },
    {
      id: 2,
      title: translate(
        `${TranslationNamespaces.FINANCING}:realEstateFinancing`,
      ),
      icon: () => <RealEstateLogo />,
      description: translate(
        `${TranslationNamespaces.FINANCING}:realEstateFinancing`,
      ),
      onPress: () => navigation.navigate('realEstateFinancing'),
    },
    {
      id: 3,
      title: translate(`${TranslationNamespaces.FINANCING}:personalFinancing`),
      icon: () => <PersonalLogo />,
      description: translate(
        `${TranslationNamespaces.FINANCING}:personalFinancing`,
      ),
      onPress: () => navigation.navigate('personalStep1', { serviceId: 12 }),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {translate(`${TranslationNamespaces.FINANCING}:financing`)}
        </Text>
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
              <Image
                source={AppImages.leftArrow}
                style={[
                  styles.arrowIcon,
                  !isRTL && { transform: [{ scaleX: -1 }] },
                ]}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ServicesSection;
