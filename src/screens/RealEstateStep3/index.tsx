import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
  I18nManager,
} from 'react-native';
import Toast from 'react-native-toast-message';

import type { RootStackParamList } from '@src/navigation';
import { SuccessType } from '@src/screens/Success/types';
import {
  getInputConstraints,
  formatAmount,
  formatNumber,
} from '@src/utils/InputFormatting';
import { Screen } from '@modules/components';
import {
  useAddRealEstateApplicationApi,
  type ApiRequest,
  type RealEstateApplicationRequestBody,
} from '@modules/core';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppImages, RealEstateAllStepsLogo } from 'modules/assets/src';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RealEstateStep3RouteProp = RouteProp<
  RootStackParamList,
  'realEstateStep3'
>;

const isRTL = I18nManager.isRTL;
const RealEstateStep3: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RealEstateStep3RouteProp>();
  const serviceId = route.params?.serviceId || 7;
  const title = route.params?.title || '';
  const customerBaseInfo = route.params?.customerBaseInfo;
  const customerLiability = route.params?.customerLiability;

  const addRealEstateApplicationMutation = useAddRealEstateApplicationApi({
    onSuccess: () => {
      navigation.navigate('success', {
        type: SuccessType.APPLICATION_SUBMITTED,
      });
    },
    onError: error => {
      console.error('Error submitting real estate application:', error);
      // Handle error - you might want to show an error message
    },
  });
  const [realEstateFinancingType, setRealEstateFinancingType] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [propertyValue, setPropertyValue] = useState('');
  const [propertyAge, setPropertyAge] = useState('');
  const [propertyCity, setPropertyCity] = useState('');
  const [annualPropertyIncome, setAnnualPropertyIncome] = useState('');

  // Filter text input to only allow English letters and spaces
  const filterEnglishLettersAndSpaces = (text: string): string =>
    text.replace(/[^a-zA-Z\s]/g, '');

  // Check if all required fields are filled
  const isFormValid = useMemo(
    () =>
      realEstateFinancingType.trim() !== '' &&
      propertyType.trim() !== '' &&
      propertyValue.trim() !== '' &&
      propertyAge.trim() !== '' &&
      propertyCity.trim() !== '' &&
      annualPropertyIncome.trim() !== '',
    [
      realEstateFinancingType,
      propertyType,
      propertyValue,
      propertyAge,
      propertyCity,
      annualPropertyIncome,
    ],
  );

  const handleApply = () => {
    if (!isFormValid) {
      Toast.show({
        type: 'fail',
        text1: translate(`${TranslationNamespaces.COMMON}:fieldRequired`, {
          field: translate(
            `${TranslationNamespaces.FINANCING}:additionalFields`,
          ),
        }),
      });
      return;
    }
    // Collect all form data and submit
    const request: ApiRequest<RealEstateApplicationRequestBody> = {
      body: {
        serviceId,
        appRealStateFinance: {
          financingType: realEstateFinancingType || undefined,
          propertyType: propertyType || undefined,
          propertyValue: propertyValue
            ? parseFloat(propertyValue.replace(/,/g, ''))
            : undefined,
          propertyAgeYears: propertyAge ? parseInt(propertyAge, 10) : undefined,
          propertyCity: propertyCity || undefined,
          annualPropertyIncome: annualPropertyIncome
            ? parseFloat(annualPropertyIncome.replace(/,/g, ''))
            : undefined,
        },
        customerBaseInfo: customerBaseInfo || undefined,
        customerLiability: customerLiability || undefined,
      },
    };
    addRealEstateApplicationMutation.mutate(request);
  };

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
        <Text style={[styles.headerTitle, isRTL && { textAlign: 'left' }]}>
          {title}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Section */}
        <View style={styles.progressSection}>
          <Text style={[styles.progressTitle, isRTL && { textAlign: 'left' }]}>
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
          <Text
            style={[
              styles.additionalFieldsTitle,
              isRTL && { textAlign: 'left' },
            ]}
          >
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
              onChangeText={text =>
                setRealEstateFinancingType(filterEnglishLettersAndSpaces(text))
              }
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
              onChangeText={text =>
                setPropertyType(filterEnglishLettersAndSpaces(text))
              }
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
              onChangeText={text =>
                setPropertyCity(filterEnglishLettersAndSpaces(text))
              }
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
        <TouchableOpacity
          style={[
            styles.applyButton,
            (!isFormValid || addRealEstateApplicationMutation.isPending) &&
              styles.applyButtonDisabled,
          ]}
          onPress={handleApply}
          disabled={!isFormValid || addRealEstateApplicationMutation.isPending}
        >
          {addRealEstateApplicationMutation.isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.applyButtonText}>
              {translate(`${TranslationNamespaces.FINANCING}:apply`)}
            </Text>
          )}
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
    gap: ResponsiveDimensions.vs(16),
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
    textAlign: isRTL ? 'right' : 'left',
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
  applyButtonDisabled: {
    opacity: 0.6,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: ResponsiveDimensions.vs(40),
    position: 'relative',
  },
});

export default RealEstateStep3;
