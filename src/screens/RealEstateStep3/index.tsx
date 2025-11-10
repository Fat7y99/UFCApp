import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '@src/store';
import {
  setRealEstateFinancingType,
  setPropertyType,
  setPropertyValue,
  setPropertyAge,
  setPropertyCity,
  setAnnualPropertyIncome,
} from '@src/store/realEstateForm';
import {
  getInputConstraints,
  formatNumber,
  formatInput,
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
  const dispatch = useAppDispatch();

  // Get form state from Redux
  const serviceId = useAppSelector(
    state => state.realEstateForm.serviceId || route.params?.serviceId || 7,
  );
  const title = useAppSelector(
    state => state.realEstateForm.title || route.params?.title || '',
  );

  // Step 1 fields from Redux
  const name = useAppSelector(state => state.realEstateForm.name);
  const mobile = useAppSelector(state => state.realEstateForm.mobile);
  const dob = useAppSelector(state => state.realEstateForm.dob);
  const employer = useAppSelector(state => state.realEstateForm.employer);
  const jobTitle = useAppSelector(state => state.realEstateForm.jobTitle);

  // Step 2 fields from Redux
  const liabilityType = useAppSelector(
    state => state.realEstateForm.liabilityType,
  );
  const monthlyInstallment = useAppSelector(
    state => state.realEstateForm.monthlyInstallment,
  );
  const bankName = useAppSelector(state => state.realEstateForm.bankName);
  const remainingBalance = useAppSelector(
    state => state.realEstateForm.remainingBalance,
  );

  // Step 3 fields from Redux
  const realEstateFinancingType = useAppSelector(
    state => state.realEstateForm.realEstateFinancingType || '',
  );
  const propertyType = useAppSelector(
    state => state.realEstateForm.propertyType || '',
  );
  const propertyValue = useAppSelector(
    state => state.realEstateForm.propertyValue || '',
  );
  const propertyAge = useAppSelector(
    state => state.realEstateForm.propertyAge || '',
  );
  const propertyCity = useAppSelector(
    state => state.realEstateForm.propertyCity || '',
  );
  const annualPropertyIncome = useAppSelector(
    state => state.realEstateForm.annualPropertyIncome || '',
  );

  // Track which fields have been touched/changed by user
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const addRealEstateApplicationMutation = useAddRealEstateApplicationApi({
    onSuccess: () => {
      navigation.navigate('success', {
        type: SuccessType.APPLICATION_SUBMITTED,
      });
    },
    onError: error => {
      Toast.show({
        type: 'fail',
        text1:
          error.errorMessage ??
          translate(
            `${TranslationNamespaces.FINANCING}:failedToSubmitRealEstateApplication`,
          ),
      });
      console.error('Error submitting real estate application:', error);
      // Handle error - you might want to show an error message
    },
  });

  // Filter text input to only allow English letters and spaces
  const filterEnglishLettersAndSpaces = (text: string): string =>
    text.replace(/[^a-zA-Z\s]/g, '');

  // Validate all fields
  const isRealEstateFinancingTypeValid = useMemo(
    () => realEstateFinancingType.trim() !== '',
    [realEstateFinancingType],
  );
  const isPropertyTypeValid = useMemo(
    () => propertyType.trim() !== '',
    [propertyType],
  );
  const isPropertyValueValid = useMemo(() => {
    if (!propertyValue || propertyValue.trim() === '') {
      return false;
    }
    const numericValue = propertyValue.replace(/,/g, '');
    const numValue = parseFloat(numericValue);
    // Valid if it's a number and > 0 (must be greater than 0)
    return !isNaN(numValue) && numValue > 0;
  }, [propertyValue]);
  const isPropertyAgeValid = useMemo(() => {
    if (!propertyAge.trim()) {
      return false;
    }
    const age = parseInt(propertyAge.replace(/,/g, ''), 10);
    return !isNaN(age) && age > 3;
  }, [propertyAge]);
  const isPropertyCityValid = useMemo(
    () => propertyCity.trim() !== '',
    [propertyCity],
  );
  const isAnnualPropertyIncomeValid = useMemo(() => {
    if (!annualPropertyIncome || annualPropertyIncome.trim() === '') {
      return false;
    }
    const numericValue = annualPropertyIncome.replace(/,/g, '');
    const numValue = parseFloat(numericValue);
    // Valid if it's a number and > 0 (must be greater than 0)
    return !isNaN(numValue) && numValue > 0;
  }, [annualPropertyIncome]);

  // Check if fields have errors (for red border display)
  // Show error only if field has been touched AND is invalid
  const hasRealEstateFinancingTypeError =
    touchedFields.has('realEstateFinancingType') &&
    !isRealEstateFinancingTypeValid;
  const hasPropertyTypeError =
    touchedFields.has('propertyType') && !isPropertyTypeValid;
  const hasPropertyValueError =
    touchedFields.has('propertyValue') && !isPropertyValueValid;
  const hasPropertyAgeError =
    touchedFields.has('propertyAge') && !isPropertyAgeValid;
  const hasPropertyCityError =
    touchedFields.has('propertyCity') && !isPropertyCityValid;
  const hasAnnualPropertyIncomeError =
    touchedFields.has('annualPropertyIncome') && !isAnnualPropertyIncomeValid;

  // Check if all required fields are filled
  const isFormValid = useMemo(
    () =>
      isRealEstateFinancingTypeValid &&
      isPropertyTypeValid &&
      isPropertyValueValid &&
      isPropertyAgeValid &&
      isPropertyCityValid &&
      isAnnualPropertyIncomeValid,
    [
      isRealEstateFinancingTypeValid,
      isPropertyTypeValid,
      isPropertyValueValid,
      isPropertyAgeValid,
      isPropertyCityValid,
      isAnnualPropertyIncomeValid,
    ],
  );

  const handleApply = () => {
    if (!isFormValid) {
      // Check specifically for property age validation
      if (propertyAge.trim() && !isPropertyAgeValid) {
        Toast.show({
          type: 'fail',
          text1: translate(
            `${TranslationNamespaces.FINANCING}:propertyAgeMinimumError`,
          ),
        });
        return;
      }
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
        customerBaseInfo: {
          name: name || undefined,
          phone: mobile || undefined,
          birthDate: dob || undefined,
          employer: employer || undefined,
          jobTitle: jobTitle || undefined,
        },
        customerLiability: {
          liabilityType: liabilityType || undefined,
          monthlyInstallment: monthlyInstallment
            ? parseFloat(monthlyInstallment.replace(/,/g, ''))
            : undefined,
          bankName: bankName || undefined,
          remainingBalance: remainingBalance
            ? parseFloat(remainingBalance.replace(/,/g, ''))
            : undefined,
        },
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
          {title +
            ' ' +
            translate(`${TranslationNamespaces.FINANCING}:financing`)}{' '}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
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
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  hasRealEstateFinancingTypeError && styles.inputError,
                ]}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:realEstateFinancingType`,
                )}
                placeholderTextColor="#999"
                value={realEstateFinancingType}
                onChangeText={text => {
                  setTouchedFields(prev =>
                    new Set(prev).add('realEstateFinancingType'),
                  );
                  dispatch(
                    setRealEstateFinancingType(
                      filterEnglishLettersAndSpaces(text),
                    ),
                  );
                }}
                {...getInputConstraints('text')}
              />
              <Text style={styles.mandatoryStar}>*</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  hasPropertyTypeError && styles.inputError,
                ]}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:propertyType`,
                )}
                placeholderTextColor="#999"
                value={propertyType}
                onChangeText={text => {
                  setTouchedFields(prev => new Set(prev).add('propertyType'));
                  dispatch(
                    setPropertyType(filterEnglishLettersAndSpaces(text)),
                  );
                }}
                {...getInputConstraints('text')}
              />
              <Text style={styles.mandatoryStar}>*</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  hasPropertyValueError && styles.inputError,
                ]}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:propertyValue`,
                )}
                placeholderTextColor="#999"
                onChangeText={text => {
                  setTouchedFields(prev => new Set(prev).add('propertyValue'));
                  const formattedText = formatInput(text, true);
                  dispatch(setPropertyValue(formattedText));
                }}
                value={propertyValue?.toLocaleString() ?? ''}
                {...getInputConstraints('amount')}
              />
              <Text style={styles.mandatoryStar}>*</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, hasPropertyAgeError && styles.inputError]}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:propertyAge`,
                )}
                placeholderTextColor="#999"
                value={propertyAge}
                onChangeText={text => {
                  setTouchedFields(prev => new Set(prev).add('propertyAge'));
                  dispatch(setPropertyAge(formatNumber(text)));
                }}
                {...getInputConstraints('year')}
              />
              <Text style={styles.mandatoryStar}>*</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  hasPropertyCityError && styles.inputError,
                ]}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:propertyCity`,
                )}
                placeholderTextColor="#999"
                value={propertyCity}
                onChangeText={text => {
                  setTouchedFields(prev => new Set(prev).add('propertyCity'));
                  dispatch(
                    setPropertyCity(filterEnglishLettersAndSpaces(text)),
                  );
                }}
                {...getInputConstraints('text')}
              />
              <Text style={styles.mandatoryStar}>*</Text>
            </View>
          </View>

          {serviceId === 11 && (
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    hasAnnualPropertyIncomeError && styles.inputError,
                  ]}
                  placeholder={translate(
                    `${TranslationNamespaces.FINANCING}:annualPropertyIncome`,
                  )}
                  placeholderTextColor="#999"
                  onChangeText={text => {
                    setTouchedFields(prev =>
                      new Set(prev).add('annualPropertyIncome'),
                    );
                    const formattedText = formatInput(text, true);
                    dispatch(setAnnualPropertyIncome(formattedText));
                  }}
                  value={annualPropertyIncome?.toLocaleString() ?? ''}
                  {...getInputConstraints('amount')}
                />
                <Text style={styles.mandatoryStar}>*</Text>
              </View>
            </View>
          )}
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
  inputWrapper: {
    position: 'relative',
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
  inputError: {
    borderColor: '#FF0000',
  },
  mandatoryStar: {
    position: 'absolute',
    top: ResponsiveDimensions.vs(4),
    [isRTL ? 'left' : 'right']: ResponsiveDimensions.vs(8),
    color: AppColors.themeLight.secondary,
    fontSize: ResponsiveDimensions.vs(16),
    fontWeight: 'bold',
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
