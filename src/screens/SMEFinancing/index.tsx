import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import type { RootStackParamList } from '@src/navigation';
import { Screen } from '@modules/components';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppImages, SMEStep1Logo } from 'modules/assets/src';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FinancingType {
  id: number;
  title: string;
  onPress: () => void;
}

const SMEFinancing: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const financingTypes: FinancingType[] = [
    {
      id: 1,
      title: translate(`${TranslationNamespaces.FINANCING}:invoice`),
      onPress: () => navigation.navigate('smeStep1'),
    },
    {
      id: 2,
      title: translate(`${TranslationNamespaces.FINANCING}:project`),
      onPress: () => {},
    },
    {
      id: 3,
      title: translate(`${TranslationNamespaces.FINANCING}:pos`),
      onPress: () => {},
    },
    {
      id: 4,
      title: translate(`${TranslationNamespaces.FINANCING}:bankGuarantee`),
      onPress: () => {},
    },
    {
      id: 5,
      title: translate(`${TranslationNamespaces.FINANCING}:workingCapital`),
      onPress: () => {},
    },
    {
      id: 6,
      title: translate(
        `${TranslationNamespaces.FINANCING}:smeSecuredByProperty`,
      ),
      onPress: () => {},
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
          <Image source={AppImages.leftArrow} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {translate(`${TranslationNamespaces.FINANCING}:smeFinancing`)}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Icon */}
        <View style={styles.iconContainer}>
          <SMEStep1Logo />
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
              style={styles.financingButton}
              onPress={type.onPress}
            >
              <Text style={styles.financingButtonText}>{type.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>
            {translate(`${TranslationNamespaces.FINANCING}:next`)}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
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
    color: 'white',
    fontSize: ResponsiveDimensions.vs(24),
    fontWeight: 'bold',
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
  buildingIcon: {
    width: ResponsiveDimensions.vs(80),
    height: ResponsiveDimensions.vs(80),
    backgroundColor: AppColors.themeLight.primary_1,
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
  briefcaseIcon: {
    width: ResponsiveDimensions.vs(60),
    height: ResponsiveDimensions.vs(60),
    backgroundColor: '#4CAF50',
    borderRadius: ResponsiveDimensions.vs(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  briefcaseEmoji: {
    fontSize: ResponsiveDimensions.vs(30),
  },
  sectionLabel: {
    color: '#666',
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: '600',
    marginBottom: ResponsiveDimensions.vs(24),
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
  },
  financingButtonText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(16),
    fontWeight: '600',
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

export default SMEFinancing;
