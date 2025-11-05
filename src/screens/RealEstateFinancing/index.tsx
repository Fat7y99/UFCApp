import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  I18nManager,
} from 'react-native';

import type { RootStackParamList } from '@src/navigation';
import { Screen } from '@modules/components';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppImages, RealEstateStep1Logo } from 'modules/assets/src';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FinancingType {
  id: number;
  title: string;
  subtitle?: string;
  onPress: () => void;
}
const isRTL = I18nManager.isRTL;
const RealEstateFinancing: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [serviceId, setServiceId] = useState<number>(1);
  const financingTypes: FinancingType[] = [
    {
      id: 1,
      title: translate(`${TranslationNamespaces.FINANCING}:purchase`),
      onPress: () => setServiceId(7),
    },
    {
      id: 2,
      title: translate(`${TranslationNamespaces.FINANCING}:mortgage`),
      onPress: () => setServiceId(8),
    },
    {
      id: 3,
      title: translate(`${TranslationNamespaces.FINANCING}:refinance`),
      onPress: () => setServiceId(9),
    },
    {
      id: 4,
      title: translate(`${TranslationNamespaces.FINANCING}:selfBuild`),
      onPress: () => setServiceId(10),
    },
    {
      id: 5,
      title: translate(`${TranslationNamespaces.FINANCING}:wealthFinancing`),
      subtitle: translate(
        `${TranslationNamespaces.FINANCING}:commercialBuildings`,
      ),
      onPress: () => setServiceId(11),
    },
  ];

  return (
    <Screen style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={AppImages.leftArrow}
            style={[styles.backIcon, isRTL && { transform: [{ scaleX: -1 }] }]}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {translate(`${TranslationNamespaces.FINANCING}:realEstateFinancing`)}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Building Icon */}
        <View style={styles.iconContainer}>
          <RealEstateStep1Logo />
        </View>

        {/* Select Financing Type Label */}
        <Text style={styles.sectionLabel}>
          {translate(`${TranslationNamespaces.FINANCING}:selectFinancingType`)}
        </Text>

        {/* Financing Type Buttons */}
        <View style={styles.buttonsContainer}>
          {financingTypes.map((type: FinancingType) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.financingButton,
                type.id === 5 && styles.fullWidthButton,
                serviceId === type.id && styles.activeButton,
              ]}
              onPress={() => {
                setServiceId(type.id);
              }}
            >
              <Text
                style={[
                  styles.financingButtonText,
                  serviceId === type.id && styles.activeButtonText,
                ]}
              >
                {type.title}
              </Text>
              {type.subtitle && (
                <Text
                  style={[
                    styles.financingButtonSubtext,
                    serviceId === type.id && styles.activeButtonText,
                  ]}
                >
                  {type.subtitle}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            navigation.navigate('realEstateStep1', { serviceId });
          }}
        >
          <Text style={styles.nextButtonText}>
            {translate(`${TranslationNamespaces.FINANCING}:next`)}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  activeButtonText: {
    color: AppColors.themeLight.pressedButtonColor,
  },
  activeButton: {
    backgroundColor: AppColors.themeLight.primaryButtonColor,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AppColors.themeLight.primary_1,
    paddingTop: ResponsiveDimensions.vs(50),
    paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingBottom: ResponsiveDimensions.vs(20),
    borderBottomEndRadius: ResponsiveDimensions.vs(12),
    borderBottomStartRadius: ResponsiveDimensions.vs(12),
  },
  backButton: {
    padding: ResponsiveDimensions.vs(8),
  },
  backIcon: {
    width: ResponsiveDimensions.vs(16),
    height: ResponsiveDimensions.vs(16),
  },
  headerTitle: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(20),
    fontWeight: 'bold',
  },
  headerSpacer: {
    width: ResponsiveDimensions.vs(40),
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: ResponsiveDimensions.vs(20),
    paddingBottom: ResponsiveDimensions.vs(100),
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: ResponsiveDimensions.vs(40),
    flexDirection: 'row',
    justifyContent: 'center',
    gap: ResponsiveDimensions.vs(20),
  },
  buildingLeft: {
    width: ResponsiveDimensions.vs(80),
    height: ResponsiveDimensions.vs(100),
    backgroundColor: AppColors.themeLight.primary_1,
    borderRadius: ResponsiveDimensions.vs(12),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  buildingRight: {
    width: ResponsiveDimensions.vs(80),
    height: ResponsiveDimensions.vs(100),
    backgroundColor: '#4CAF50',
    borderRadius: ResponsiveDimensions.vs(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buildingWindows: {
    gap: ResponsiveDimensions.vs(4),
  },
  windowRow: {
    flexDirection: 'row',
    gap: ResponsiveDimensions.vs(4),
  },
  window: {
    width: ResponsiveDimensions.vs(12),
    height: ResponsiveDimensions.vs(12),
    backgroundColor: 'white',
    borderRadius: ResponsiveDimensions.vs(6),
  },
  buildingDoor: {
    position: 'absolute',
    bottom: ResponsiveDimensions.vs(8),
    width: ResponsiveDimensions.vs(20),
    height: ResponsiveDimensions.vs(30),
    backgroundColor: '#4CAF50',
    borderRadius: ResponsiveDimensions.vs(4),
  },
  sectionLabel: {
    color: '#666',
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: '600',
    marginBottom: ResponsiveDimensions.vs(24),
    textAlign: 'left',
  },
  buttonsContainer: {
    gap: ResponsiveDimensions.vs(16),
    marginBottom: ResponsiveDimensions.vs(40),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  financingButton: {
    backgroundColor: AppColors.themeLight.primary_1,
    borderRadius: ResponsiveDimensions.vs(12),
    paddingVertical: ResponsiveDimensions.vs(16),
    paddingHorizontal: ResponsiveDimensions.vs(20),
    alignItems: 'center',
    width: '48%',
  },
  fullWidthButton: {
    width: '100%',
  },
  financingButtonText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(16),
    fontWeight: '600',
  },
  financingButtonSubtext: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(12),
    fontWeight: '400',
    marginTop: ResponsiveDimensions.vs(4),
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    borderRadius: ResponsiveDimensions.vs(12),
    paddingVertical: ResponsiveDimensions.vs(18),
    alignItems: 'center',
    marginTop: ResponsiveDimensions.vs(20),
  },
  nextButtonText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: 'bold',
  },
});

export default RealEstateFinancing;
