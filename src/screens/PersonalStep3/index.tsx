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
  setBasicSalary,
  setNetSalary,
  setCurrentBank,
  setCity,
} from '@src/store/personalForm';
import {
  getInputConstraints,
  formatInput,
  filterEnglishLettersAndSpaces,
  validateInput,
  convertArabicNumberToEnglish,
} from '@src/utils/InputFormatting';
import { Screen } from '@modules/components';
import {
  useAddPersonalApplicationApi,
  type ApiRequest,
  type PersonalApplicationRequestBody,
} from '@modules/core';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppImages, PersonalStep1Logo } from 'modules/assets/src';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type PersonalStep3RouteProp = RouteProp<RootStackParamList, 'personalStep3'>;
const isRTL = I18nManager.isRTL;
const PersonalStep3: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<PersonalStep3RouteProp>();
  const dispatch = useAppDispatch();

  // Get form state from Redux
  const serviceId = useAppSelector(
    state => state.personalForm.serviceId || route.params?.serviceId || 12,
  );

  // Step 1 fields from Redux
  const name = useAppSelector(state => state.personalForm.name);
  const mobile = useAppSelector(state => state.personalForm.mobile);
  const dob = useAppSelector(state => state.personalForm.dob);
  const employer = useAppSelector(state => state.personalForm.employer);
  const jobTitle = useAppSelector(state => state.personalForm.jobTitle);
  const serviceStartDate = useAppSelector(
    state => state.personalForm.serviceStartDate,
  );

  // Step 2 fields from Redux
  const liabilityType = useAppSelector(
    state => state.personalForm.liabilityType,
  );
  const monthlyInstallment = useAppSelector(
    state => state.personalForm.monthlyInstallment,
  );
  const bankName = useAppSelector(state => state.personalForm.bankName);
  const remainingBalance = useAppSelector(
    state => state.personalForm.remainingBalance,
  );

  // Step 3 fields from Redux
  const basicSalary = useAppSelector(
    state => state.personalForm.basicSalary || '',
  );
  const netSalary = useAppSelector(state => state.personalForm.netSalary || '');
  const currentBank = useAppSelector(
    state => state.personalForm.currentBank || '',
  );
  const city = useAppSelector(state => state.personalForm.city || '');

  // Track which fields have been touched/changed by user
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const addPersonalApplicationMutation = useAddPersonalApplicationApi({
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
            `${TranslationNamespaces.FINANCING}:failedToSubmitPersonalApplication`,
          ),
      });
      console.error('Error submitting personal application:', error);
      // Handle error - you might want to show an error message
    },
  });

  // Validate all fields
  const isBasicSalaryValid = useMemo(() => {
    if (!basicSalary || basicSalary.trim() === '') {
      return false;
    }
    return validateInput(basicSalary, 'amount');
  }, [basicSalary]);
  const isNetSalaryValid = useMemo(() => {
    if (!netSalary || netSalary.trim() === '') {
      return false;
    }
    return validateInput(netSalary, 'amount');
  }, [netSalary]);
  const isCurrentBankValid = useMemo(
    () => currentBank.trim() !== '',
    [currentBank],
  );
  const isCityValid = useMemo(() => city.trim() !== '', [city]);

  // Check if fields have errors (for red border display)
  // Show error only if field has been touched AND is invalid
  const hasBasicSalaryError =
    touchedFields.has('basicSalary') && !isBasicSalaryValid;
  const hasNetSalaryError = touchedFields.has('netSalary') && !isNetSalaryValid;
  const hasCurrentBankError =
    touchedFields.has('currentBank') && !isCurrentBankValid;
  const hasCityError = touchedFields.has('city') && !isCityValid;

  // Check if all required fields are filled
  const isFormValid = useMemo(
    () =>
      isBasicSalaryValid &&
      isNetSalaryValid &&
      isCurrentBankValid &&
      isCityValid,
    [isBasicSalaryValid, isNetSalaryValid, isCurrentBankValid, isCityValid],
  );

  const handleApply = () => {
    if (!isFormValid) {
      Toast.show({
        type: 'fail',
        text1: translate(`${TranslationNamespaces.COMMON}:fieldRequired`, {
          field: translate(
            `${TranslationNamespaces.FINANCING}:baseRegistrationFields`,
          ),
        }),
      });
      return;
    }
    // Combine all form data and submit
    const request: ApiRequest<PersonalApplicationRequestBody> = {
      body: {
        serviceId,
        customerBaseInfo: {
          name: name || undefined,
          phone: mobile || undefined,
          birthDate: dob || undefined,
          employer: employer || undefined,
          jobTitle: jobTitle || undefined,
          serviceStartDate: serviceStartDate || undefined,
          basicSalary: basicSalary
            ? parseFloat(
                convertArabicNumberToEnglish(basicSalary.replace(/,/g, '')),
              )
            : undefined,
          netSalary: netSalary
            ? parseFloat(
                convertArabicNumberToEnglish(netSalary.replace(/,/g, '')),
              )
            : undefined,
          currentBank: currentBank || undefined,
          city: city || undefined,
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
    addPersonalApplicationMutation.mutate(request);
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
          {translate(`${TranslationNamespaces.FINANCING}:personalFinancing`)}
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

        {/* Person Icon */}
        <View style={styles.iconContainer}>
          <PersonalStep1Logo />
        </View>

        {/* Base Registration Fields Section */}
        <View style={styles.registrationSection}>
          <Text
            style={[styles.registrationTitle, isRTL && { textAlign: 'left' }]}
          >
            {translate(
              `${TranslationNamespaces.FINANCING}:baseRegistrationFields`,
            )}
          </Text>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, hasBasicSalaryError && styles.inputError]}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:basicSalary`,
                )}
                placeholderTextColor="#999"
                onChangeText={text => {
                  setTouchedFields(prev => new Set(prev).add('basicSalary'));
                  const formattedText = formatInput(text, true);
                  dispatch(setBasicSalary(formattedText));
                }}
                value={basicSalary?.toLocaleString() ?? ''}
                {...getInputConstraints('amount')}
              />
              <Text style={styles.mandatoryStar}>*</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, hasNetSalaryError && styles.inputError]}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:netSalaryAfterGOSI`,
                )}
                placeholderTextColor="#999"
                onChangeText={text => {
                  setTouchedFields(prev => new Set(prev).add('netSalary'));
                  const formattedText = formatInput(text, true);
                  dispatch(setNetSalary(formattedText));
                }}
                value={netSalary?.toLocaleString() ?? ''}
                {...getInputConstraints('amount')}
              />
              <Text style={styles.mandatoryStar}>*</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, hasCurrentBankError && styles.inputError]}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:currentBank`,
                )}
                placeholderTextColor="#999"
                value={currentBank}
                onChangeText={text => {
                  setTouchedFields(prev => new Set(prev).add('currentBank'));
                  dispatch(setCurrentBank(filterEnglishLettersAndSpaces(text)));
                }}
                {...getInputConstraints('text')}
              />
              <Text style={styles.mandatoryStar}>*</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, hasCityError && styles.inputError]}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:city`,
                )}
                placeholderTextColor="#999"
                value={city}
                onChangeText={text => {
                  setTouchedFields(prev => new Set(prev).add('city'));
                  dispatch(setCity(filterEnglishLettersAndSpaces(text)));
                }}
                {...getInputConstraints('text')}
              />
              <Text style={styles.mandatoryStar}>*</Text>
            </View>
          </View>
        </View>

        {/* Apply Button */}
        <TouchableOpacity
          style={[
            styles.applyButton,
            (!isFormValid || addPersonalApplicationMutation.isPending) &&
              styles.applyButtonDisabled,
          ]}
          onPress={handleApply}
          disabled={!isFormValid || addPersonalApplicationMutation.isPending}
        >
          {addPersonalApplicationMutation.isPending ? (
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
  iconContainer: {
    alignItems: 'center',
    marginBottom: ResponsiveDimensions.vs(40),
    position: 'relative',
  },
  personIcon: {
    width: ResponsiveDimensions.vs(100),
    height: ResponsiveDimensions.vs(120),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  personHead: {
    width: ResponsiveDimensions.vs(60),
    height: ResponsiveDimensions.vs(60),
    backgroundColor: AppColors.themeLight.primary_1,
    borderRadius: ResponsiveDimensions.vs(30),
    marginBottom: ResponsiveDimensions.vs(8),
  },
  personBody: {
    width: ResponsiveDimensions.vs(80),
    height: ResponsiveDimensions.vs(50),
    backgroundColor: AppColors.themeLight.primary_1,
    borderRadius: ResponsiveDimensions.vs(25),
  },
  backgroundShape1: {
    position: 'absolute',
    left: ResponsiveDimensions.vs(-30),
    top: ResponsiveDimensions.vs(10),
    width: ResponsiveDimensions.vs(60),
    height: ResponsiveDimensions.vs(60),
    backgroundColor: '#4CAF50',
    borderRadius: ResponsiveDimensions.vs(30),
    zIndex: 1,
  },
  backgroundShape2: {
    position: 'absolute',
    right: ResponsiveDimensions.vs(-40),
    top: ResponsiveDimensions.vs(30),
    width: ResponsiveDimensions.vs(40),
    height: ResponsiveDimensions.vs(40),
    backgroundColor: '#00BCD4',
    borderRadius: ResponsiveDimensions.vs(20),
    zIndex: 2,
  },
  registrationSection: {
    marginBottom: ResponsiveDimensions.vs(40),
  },
  registrationTitle: {
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
    right: ResponsiveDimensions.vs(8),
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
});

export default PersonalStep3;
