import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
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
  Modal,
} from 'react-native';
import Toast from 'react-native-toast-message';

import type { RootStackParamList } from '@src/navigation';
import { SuccessType } from '@src/screens/Success/types';
import {
  useAppDispatch,
  useAppSelector,
  setBusinessActivityType,
  setCrAge,
  setBusinessRegion,
  setBusinessType,
  setPosAnnualPropertyIncome,
  setFinancialStatementAvailable,
} from '@src/store';
import {
  getInputConstraints,
  formatInput,
  filterEnglishLettersAndSpaces,
  validateInput,
  convertArabicNumberToEnglish,
} from '@src/utils/InputFormatting';
import { Screen } from '@modules/components';
import {
  useAddSmeApplicationApi,
  type ApiRequest,
  type SmeApplicationRequestBody,
} from '@modules/core';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppImages, DropDownArrow } from 'modules/assets/src';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type SMEStep2RouteProp = RouteProp<RootStackParamList, 'smeStep2'>;
const isRTL = I18nManager.isRTL;
const SMEStep2: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<SMEStep2RouteProp>();
  const dispatch = useAppDispatch();

  // Get form state from Redux
  const serviceId = useAppSelector(
    state => state.smeForm.serviceId || route.params?.serviceId || 1,
  );
  const title = useAppSelector(
    state => state.smeForm.title || route.params?.title || '',
  );

  // Step 1 fields from Redux
  const liabilityType = useAppSelector(state => state.smeForm.liabilityType);
  const monthlyInstallment = useAppSelector(
    state => state.smeForm.monthlyInstallment,
  );
  const bankName = useAppSelector(state => state.smeForm.bankName);
  const remainingBalance = useAppSelector(
    state => state.smeForm.remainingBalance,
  );

  // Step 2 fields from Redux
  const businessActivityType = useAppSelector(
    state => state.smeForm.businessActivityType || '',
  );
  const crAge = useAppSelector(state => state.smeForm.crAge || '');
  const businessRegion = useAppSelector(
    state => state.smeForm.businessRegion || '',
  );
  const businessType = useAppSelector(
    state => state.smeForm.businessType || '',
  );
  const posAnnualPropertyIncome = useAppSelector(
    state => state.smeForm.posAnnualPropertyIncome || '',
  );
  const financialStatementAvailable = useAppSelector(
    state => state.smeForm.financialStatementAvailable || '',
  );

  const addSmeApplicationMutation = useAddSmeApplicationApi({
    onSuccess: () => {
      //remove the current steps from the stack
      navigation.popTo('home');
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
            `${TranslationNamespaces.FINANCING}:failedToSubmitSmeApplication`,
          ),
      });
      console.error('Error submitting SME application:', error);
      // Handle error - you might want to show an error message
    },
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCrAgeTooltip, setShowCrAgeTooltip] = useState(false);

  // Track which fields have been touched/changed by user
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // Validate all fields
  const isBusinessActivityTypeValid = useMemo(
    () => businessActivityType.trim() !== '',
    [businessActivityType],
  );
  const isCrAgeValid = useMemo(() => crAge.trim() !== '', [crAge]);
  const isBusinessRegionValid = useMemo(
    () => businessRegion.trim() !== '',
    [businessRegion],
  );
  const isBusinessTypeValid = useMemo(
    () => businessType.trim() !== '',
    [businessType],
  );
  const isPosAnnualPropertyIncomeValid = useMemo(() => {
    // Only validate if serviceId === 3 (field is shown)
    if (serviceId !== 3) {
      return true; // Field not shown, so it's valid
    }
    if (!posAnnualPropertyIncome || posAnnualPropertyIncome.trim() === '') {
      return false;
    }
    return validateInput(posAnnualPropertyIncome, 'amount');
  }, [posAnnualPropertyIncome, serviceId]);
  const isFinancialStatementAvailableValid = useMemo(
    () => financialStatementAvailable.trim() !== '',
    [financialStatementAvailable],
  );

  // Check if fields have errors (for red border display)
  // Show error only if field has been touched AND is invalid
  const hasBusinessActivityTypeError =
    touchedFields.has('businessActivityType') && !isBusinessActivityTypeValid;
  const hasCrAgeError = touchedFields.has('crAge') && !isCrAgeValid;
  const hasBusinessRegionError =
    touchedFields.has('businessRegion') && !isBusinessRegionValid;
  const hasBusinessTypeError =
    touchedFields.has('businessType') && !isBusinessTypeValid;
  const hasPosAnnualPropertyIncomeError =
    touchedFields.has('posAnnualPropertyIncome') &&
    !isPosAnnualPropertyIncomeValid;
  const hasFinancialStatementAvailableError =
    touchedFields.has('financialStatementAvailable') &&
    !isFinancialStatementAvailableValid;

  // Check if all required fields are filled
  const isFormValid = useMemo(
    () =>
      isBusinessActivityTypeValid &&
      isCrAgeValid &&
      isBusinessRegionValid &&
      isBusinessTypeValid &&
      isPosAnnualPropertyIncomeValid &&
      isFinancialStatementAvailableValid,
    [
      isBusinessActivityTypeValid,
      isCrAgeValid,
      isBusinessRegionValid,
      isBusinessTypeValid,
      isPosAnnualPropertyIncomeValid,
      isFinancialStatementAvailableValid,
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
    const request: ApiRequest<SmeApplicationRequestBody> = {
      body: {
        serviceId,
        appSmeFinance: {
          businessActivityType: businessActivityType || undefined,
          businessRegion: businessRegion || undefined,
          businessType: businessType || undefined,
          posAnnualRevenue: posAnnualPropertyIncome
            ? parseFloat(posAnnualPropertyIncome.replace(/,/g, ''))
            : undefined,
          financialStatementsAvailable:
            financialStatementAvailable ===
            translate(`${TranslationNamespaces.FINANCING}:yes`),
          crAgeYears: crAge
            ? parseInt(
                convertArabicNumberToEnglish(crAge.replace(/,/g, '')),
                10,
              )
            : undefined,
        },
        customerLiability: {
          liabilityType: liabilityType || undefined,
          monthlyInstallment: monthlyInstallment
            ? parseFloat(
                convertArabicNumberToEnglish(
                  monthlyInstallment.replace(/,/g, ''),
                ),
              )
            : undefined,
          bankName: bankName || undefined,
          remainingBalance: remainingBalance
            ? parseFloat(
                convertArabicNumberToEnglish(
                  remainingBalance.replace(/,/g, ''),
                ),
              )
            : undefined,
        },
      },
    };
    addSmeApplicationMutation.mutate(request);
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
        <Text style={styles.headerTitle}>
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
          <Text style={styles.progressTitle}>
            {translate(`${TranslationNamespaces.FINANCING}:progress`)}
          </Text>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </View>

        {/* Additional Fields Section */}
        <View style={styles.additionalFieldsSection}>
          <Text style={styles.additionalFieldsTitle}>
            {translate(`${TranslationNamespaces.FINANCING}:additionalFields`)}
          </Text>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  hasBusinessActivityTypeError && styles.inputError,
                ]}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:businessActivityType`,
                )}
                placeholderTextColor="#999"
                value={businessActivityType}
                onChangeText={text => {
                  setTouchedFields(prev =>
                    new Set(prev).add('businessActivityType'),
                  );
                  dispatch(
                    setBusinessActivityType(
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
              <View
                style={[
                  styles.inputWithInfoIcon,
                  hasCrAgeError && styles.inputError,
                ]}
              >
                <TextInput
                  style={styles.inputInsideContainer}
                  placeholder={translate(
                    `${TranslationNamespaces.FINANCING}:crAge`,
                  )}
                  placeholderTextColor="#999"
                  value={crAge}
                  onChangeText={text => {
                    setTouchedFields(prev => new Set(prev).add('crAge'));
                    dispatch(setCrAge(text));
                  }}
                  {...getInputConstraints('year')}
                />
                <TouchableOpacity
                  onPress={() => setShowCrAgeTooltip(true)}
                  activeOpacity={0.7}
                >
                  <MaterialDesignIcons
                    name="information-variant-circle"
                    size={ResponsiveDimensions.vs(20)}
                    color={AppColors.themeLight.primary_1}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.mandatoryStar}>*</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  hasBusinessRegionError && styles.inputError,
                ]}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:businessRegion`,
                )}
                placeholderTextColor="#999"
                value={businessRegion}
                onChangeText={text => {
                  setTouchedFields(prev => new Set(prev).add('businessRegion'));
                  dispatch(
                    setBusinessRegion(filterEnglishLettersAndSpaces(text)),
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
                  hasBusinessTypeError && styles.inputError,
                ]}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:businessType`,
                )}
                placeholderTextColor="#999"
                value={businessType}
                onChangeText={text => {
                  setTouchedFields(prev => new Set(prev).add('businessType'));
                  dispatch(
                    setBusinessType(filterEnglishLettersAndSpaces(text)),
                  );
                }}
                {...getInputConstraints('text')}
              />
              <Text style={styles.mandatoryStar}>*</Text>
            </View>
          </View>

          {serviceId === 3 && (
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    hasPosAnnualPropertyIncomeError && styles.inputError,
                  ]}
                  placeholder={translate(
                    `${TranslationNamespaces.FINANCING}:posAnnualPropertyIncome`,
                  )}
                  placeholderTextColor="#999"
                  onChangeText={text => {
                    setTouchedFields(prev =>
                      new Set(prev).add('posAnnualPropertyIncome'),
                    );
                    const formattedText = formatInput(text, true);
                    dispatch(setPosAnnualPropertyIncome(formattedText));
                  }}
                  value={posAnnualPropertyIncome?.toLocaleString() ?? ''}
                  {...getInputConstraints('amount')}
                />
                <Text style={styles.mandatoryStar}>*</Text>
              </View>
            </View>
          )}

          {/* Financial Statement Available Dropdown */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TouchableOpacity
                style={[
                  styles.dropdownContainer,
                  hasFinancialStatementAvailableError && styles.inputError,
                ]}
                onPress={() => {
                  setTouchedFields(prev =>
                    new Set(prev).add('financialStatementAvailable'),
                  );
                  setShowDropdown(!showDropdown);
                }}
              >
                <TextInput
                  style={styles.dropdownInput}
                  placeholder={translate(
                    `${TranslationNamespaces.FINANCING}:financialStatementAvailable`,
                  )}
                  placeholderTextColor="#999"
                  value={financialStatementAvailable}
                  editable={false}
                />
                <DropDownArrow />
              </TouchableOpacity>
              <Text style={styles.mandatoryStar}>*</Text>
            </View>

            {showDropdown && (
              <View style={styles.dropdownOptions}>
                <TouchableOpacity
                  style={styles.dropdownOption}
                  onPress={() => {
                    setTouchedFields(prev =>
                      new Set(prev).add('financialStatementAvailable'),
                    );
                    dispatch(
                      setFinancialStatementAvailable(
                        translate(`${TranslationNamespaces.FINANCING}:yes`),
                      ),
                    );
                    setShowDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownOptionText}>
                    {translate(`${TranslationNamespaces.FINANCING}:yes`)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownOption}
                  onPress={() => {
                    setTouchedFields(prev =>
                      new Set(prev).add('financialStatementAvailable'),
                    );
                    dispatch(
                      setFinancialStatementAvailable(
                        translate(`${TranslationNamespaces.FINANCING}:no`),
                      ),
                    );
                    setShowDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownOptionText}>
                    {translate(`${TranslationNamespaces.FINANCING}:no`)}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.nextButton,
            (!isFormValid || addSmeApplicationMutation.isPending) &&
              styles.nextButtonDisabled,
          ]}
          onPress={handleApply}
          disabled={!isFormValid || addSmeApplicationMutation.isPending}
        >
          {addSmeApplicationMutation.isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.nextButtonText}>
              {translate(`${TranslationNamespaces.FINANCING}:apply`)}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* CR Age Tooltip Modal */}
      <Modal
        visible={showCrAgeTooltip}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCrAgeTooltip(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCrAgeTooltip(false)}
        >
          <View style={styles.tooltipContainer}>
            <View style={styles.tooltipContent}>
              <Text style={styles.tooltipTitle}>
                {translate(`${TranslationNamespaces.FINANCING}:crAge`)}
              </Text>
              <Text style={styles.tooltipDescription}>
                {translate(
                  `${TranslationNamespaces.FINANCING}:crAgeDescription`,
                )}
              </Text>
              <View style={styles.tooltipExample}>
                <Text style={styles.tooltipExampleLabel}>
                  {translate(`${TranslationNamespaces.FINANCING}:example`)}
                </Text>
                <Text style={styles.tooltipExampleValue}>20</Text>
                <Text style={styles.tooltipExampleText}>
                  {translate(`${TranslationNamespaces.FINANCING}:years`)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.tooltipCloseButton}
                onPress={() => setShowCrAgeTooltip(false)}
              >
                <Text style={styles.tooltipCloseButtonText}>
                  {translate(`${TranslationNamespaces.COMMON}:close`)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
    flexWrap: 'wrap',
    width: '80%',
    textAlign: 'left',
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
    textAlign: 'left',
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
    textAlign: 'left',
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
    right: ResponsiveDimensions.vs(8),
    color: AppColors.themeLight.secondary,
    fontSize: ResponsiveDimensions.vs(16),
    fontWeight: 'bold',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: ResponsiveDimensions.vs(12),
    borderWidth: 1,
    borderColor: '#8C8C8C',
    paddingHorizontal: ResponsiveDimensions.vs(16),
    paddingVertical: ResponsiveDimensions.vs(16),
  },
  dropdownInput: {
    flex: 1,
    fontSize: ResponsiveDimensions.vs(16),
    color: '#333',
    textAlign: isRTL ? 'right' : 'left',
  },
  dropdownIcon: {
    fontSize: ResponsiveDimensions.vs(12),
    color: '#999',
    marginLeft: ResponsiveDimensions.vs(8),
  },
  dropdownOptions: {
    marginTop: ResponsiveDimensions.vs(8),
    backgroundColor: 'white',
    borderRadius: ResponsiveDimensions.vs(8),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  dropdownOption: {
    paddingVertical: ResponsiveDimensions.vs(12),
    paddingHorizontal: ResponsiveDimensions.vs(16),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dropdownOptionText: {
    fontSize: ResponsiveDimensions.vs(16),
  },
  inputWithInfoIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderRadius: ResponsiveDimensions.vs(12),
    borderWidth: 1,
    borderColor: '#8C8C8C',
    paddingHorizontal: ResponsiveDimensions.vs(16),
    paddingVertical: ResponsiveDimensions.vs(16),
  },
  inputInsideContainer: {
    flex: 1,
    fontSize: ResponsiveDimensions.vs(16),
    color: '#333',
    textAlign: isRTL ? 'right' : 'left',
    padding: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: ResponsiveDimensions.vs(20),
  },
  tooltipContainer: {
    width: '100%',
    maxWidth: ResponsiveDimensions.vs(400),
  },
  tooltipContent: {
    backgroundColor: 'white',
    borderRadius: ResponsiveDimensions.vs(16),
    padding: ResponsiveDimensions.vs(24),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tooltipTitle: {
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: ResponsiveDimensions.vs(12),
    textAlign: 'left',
  },
  tooltipDescription: {
    fontSize: ResponsiveDimensions.vs(14),
    color: '#666',
    marginBottom: ResponsiveDimensions.vs(16),
    lineHeight: ResponsiveDimensions.vs(20),
    textAlign: 'left',
  },
  tooltipExample: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: ResponsiveDimensions.vs(12),
    borderRadius: ResponsiveDimensions.vs(8),
    marginBottom: ResponsiveDimensions.vs(16),
    gap: ResponsiveDimensions.vs(8),
  },
  tooltipExampleLabel: {
    fontSize: ResponsiveDimensions.vs(14),
    color: '#666',
    fontWeight: '500',
  },
  tooltipExampleValue: {
    fontSize: ResponsiveDimensions.vs(16),
    fontWeight: 'bold',
    color: AppColors.themeLight.primary_1,
  },
  tooltipExampleText: {
    fontSize: ResponsiveDimensions.vs(14),
    color: '#666',
  },
  tooltipCloseButton: {
    backgroundColor: AppColors.themeLight.primary_1,
    paddingVertical: ResponsiveDimensions.vs(12),
    paddingHorizontal: ResponsiveDimensions.vs(24),
    borderRadius: ResponsiveDimensions.vs(8),
    alignItems: 'center',
  },
  tooltipCloseButtonText: {
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
  nextButtonDisabled: {
    opacity: 0.6,
  },
});

export default SMEStep2;
