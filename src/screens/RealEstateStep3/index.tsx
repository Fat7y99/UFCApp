import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';

import type { RootStackParamList } from '@src/navigation';
import {
  getInputConstraints,
  formatAmount,
  formatNumber,
} from '@src/utils/InputFormatting';
import { Screen } from '@modules/components';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppImages, RealEstateAllStepsLogo } from 'modules/assets/src';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RealEstateStep3: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [realEstateFinancingType, setRealEstateFinancingType] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [propertyValue, setPropertyValue] = useState('');
  const [propertyAge, setPropertyAge] = useState('');
  const [propertyCity, setPropertyCity] = useState('');
  const [annualPropertyIncome, setAnnualPropertyIncome] = useState('');

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
          {translate(`${TranslationNamespaces.FINANCING}:realEstateFinancing`)}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Section */}
        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>
            {translate(`${TranslationNamespaces.FINANCING}:progress`)}
          </Text>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <RealEstateAllStepsLogo />
        </View>
        {/* Additional Fields Section */}
        <View style={styles.additionalFieldsSection}>
          <Text style={styles.additionalFieldsTitle}>
            {translate(`${TranslationNamespaces.FINANCING}:additionalFields`)}
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={translate(
                `${TranslationNamespaces.FINANCING}:realEstateFinancingType`,
              )}
              placeholderTextColor="#999"
              value={realEstateFinancingType}
              onChangeText={setRealEstateFinancingType}
              {...getInputConstraints('text')}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={translate(
                `${TranslationNamespaces.FINANCING}:propertyType`,
              )}
              placeholderTextColor="#999"
              value={propertyType}
              onChangeText={setPropertyType}
              {...getInputConstraints('text')}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={translate(
                `${TranslationNamespaces.FINANCING}:propertyValue`,
              )}
              placeholderTextColor="#999"
              value={propertyValue}
              onChangeText={text => setPropertyValue(formatAmount(text))}
              {...getInputConstraints('amount')}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={translate(
                `${TranslationNamespaces.FINANCING}:propertyAge`,
              )}
              placeholderTextColor="#999"
              value={propertyAge}
              onChangeText={text => setPropertyAge(formatNumber(text))}
              {...getInputConstraints('year')}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={translate(
                `${TranslationNamespaces.FINANCING}:propertyCity`,
              )}
              placeholderTextColor="#999"
              value={propertyCity}
              onChangeText={setPropertyCity}
              {...getInputConstraints('text')}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={translate(
                `${TranslationNamespaces.FINANCING}:annualPropertyIncome`,
              )}
              placeholderTextColor="#999"
              value={annualPropertyIncome}
              onChangeText={text => setAnnualPropertyIncome(formatAmount(text))}
              {...getInputConstraints('amount')}
            />
          </View>
        </View>

        {/* Apply Button */}
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>
            {translate(`${TranslationNamespaces.FINANCING}:apply`)}
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
    width: ResponsiveDimensions.vs(16),
    height: ResponsiveDimensions.vs(16),
  },
  headerTitle: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(20),
    fontWeight: 'bold',
  },
  notificationButton: {
    position: 'relative',
    padding: ResponsiveDimensions.vs(8),
  },
  bellIcon: {
    width: ResponsiveDimensions.vs(24),
    height: ResponsiveDimensions.vs(24),
  },
  badge: {
    position: 'absolute',
    top: ResponsiveDimensions.vs(2),
    right: ResponsiveDimensions.vs(2),
    backgroundColor: AppColors.themeLight.primary_1,
    borderRadius: ResponsiveDimensions.vs(10),
    minWidth: ResponsiveDimensions.vs(20),
    height: ResponsiveDimensions.vs(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  badgeText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(12),
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: ResponsiveDimensions.vs(20),
    paddingBottom: ResponsiveDimensions.vs(100),
  },
  progressSection: {
    marginBottom: ResponsiveDimensions.vs(40),
  },
  progressTitle: {
    color: '#333',
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: '600',
    marginBottom: ResponsiveDimensions.vs(16),
  },
  progressBarContainer: {
    width: '100%',
  },
  progressBar: {
    height: ResponsiveDimensions.vs(8),
    backgroundColor: '#E0E0E0',
    borderRadius: ResponsiveDimensions.vs(4),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '100%',
    backgroundColor: '#0080F7',
    borderRadius: ResponsiveDimensions.vs(4),
  },
  additionalFieldsSection: {
    marginBottom: ResponsiveDimensions.vs(40),
  },
  additionalFieldsTitle: {
    color: '#333',
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: '600',
    marginBottom: ResponsiveDimensions.vs(24),
  },
  inputContainer: {
    marginBottom: ResponsiveDimensions.vs(16),
  },
  input: {
    backgroundColor: 'transparent',
    borderRadius: ResponsiveDimensions.vs(12),
    paddingHorizontal: ResponsiveDimensions.vs(16),
    paddingVertical: ResponsiveDimensions.vs(16),
    fontSize: ResponsiveDimensions.vs(16),
    color: '#333',
    borderWidth: 1,
    borderColor: '#8C8C8C',
  },
  applyButton: {
    backgroundColor: '#4CAF50',
    borderRadius: ResponsiveDimensions.vs(12),
    paddingVertical: ResponsiveDimensions.vs(18),
    alignItems: 'center',
    marginTop: ResponsiveDimensions.vs(20),
  },
  applyButtonText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: 'bold',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: ResponsiveDimensions.vs(40),
    position: 'relative',
  },
});

export default RealEstateStep3;
