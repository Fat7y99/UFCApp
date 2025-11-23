import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  I18nManager,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Toast from 'react-native-toast-message';

import type { RootStackParamList } from '@src/navigation';
import { useAppDispatch, useAppSelector } from '@src/store';
import {
  resetPersonalForm,
  setServiceId,
  setName,
  setMobile,
  setDob,
  setEmployer,
  setJobTitle,
  setServiceStartDate,
  setBasicSalary,
  setNetSalary,
  setCurrentBank,
  setCity,
} from '@src/store/personalForm';
import {
  getInputConstraints,
  formatInput,
  filterEnglishLettersAndSpaces,
} from '@src/utils/InputFormatting';
import { Screen } from '@modules/components';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppImages, CalendarLogo, PersonalStep1Logo } from 'modules/assets/src';

const COUNTRY_CODE = '+966';

// Local MobileNumberInput component matching RealEstateStep1 input styles
interface MobileNumberInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  countryCode: string;
  textAlign?: 'left' | 'right';
}

const MobileNumberInput: React.FC<MobileNumberInputProps> = ({
  placeholder,
  value,
  onChangeText,
  countryCode,
  textAlign = 'left',
}) => {
  // Extract the number part (after country code)
  const numberPart = value.startsWith(countryCode)
    ? value.substring(countryCode.length)
    : value;

  const handleTextChange = (text: string) => {
    // Always prepend country code
    const newValue = countryCode + text.replace(/[^\d]/g, '');
    onChangeText(newValue);
  };

  return (
    <View style={styles.mobileInputWrapper}>
      <Text style={styles.countryCode}>{countryCode}</Text>
      <TextInput
        style={styles.mobileInput}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={numberPart}
        onChangeText={handleTextChange}
        keyboardType="phone-pad"
        textAlign={textAlign}
        maxLength={10}
      />
    </View>
  );
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const isRTL = I18nManager.isRTL;
const PersonalStep1: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const serviceId = 12; // Default to 12 for Personal Loan

  // Get form state from Redux
  const name = useAppSelector(state => state.personalForm.name || '');
  const mobile = useAppSelector(
    state => state.personalForm.mobile || COUNTRY_CODE,
  );
  const dob = useAppSelector(state => state.personalForm.dob || '');
  const employer = useAppSelector(state => state.personalForm.employer || '');
  const jobTitle = useAppSelector(state => state.personalForm.jobTitle || '');
  const serviceStartDate = useAppSelector(
    state => state.personalForm.serviceStartDate || '',
  );
  const basicSalary = useAppSelector(
    state => state.personalForm.basicSalary || '',
  );
  const netSalary = useAppSelector(state => state.personalForm.netSalary || '');
  const currentBank = useAppSelector(
    state => state.personalForm.currentBank || '',
  );
  const city = useAppSelector(state => state.personalForm.city || '');
  const [handleOpenCalendar, setHandleOpenCalendar] = useState<string | null>(
    null,
  );

  // Track which fields have been touched/changed by user
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // Reset form and set serviceId when component mounts
  useEffect(() => {
    dispatch(resetPersonalForm());
    dispatch(setServiceId(serviceId));
    // Reset touched fields when form is reset
    setTouchedFields(new Set());
  }, [dispatch, serviceId]);

  type CalendarType = 'dob' | 'serviceStartDate';

  const formatDateString = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getDatePickerValue = (calendarType: CalendarType): Date => {
    const dateString = calendarType === 'dob' ? dob : serviceStartDate;
    if (dateString) {
      const [day, month, year] = dateString.split('-');
      return new Date(
        parseInt(year, 10),
        parseInt(month, 10) - 1,
        parseInt(day, 10),
      );
    }
    return new Date();
  };

  const getDatePickerMinDate = (calendarType: CalendarType): Date => {
    if (calendarType === 'dob') {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 100);
      return date;
    }
    return new Date(1900, 0, 1);
  };

  const getDatePickerMaxDate = (calendarType: CalendarType): Date => {
    if (calendarType === 'dob') {
      return new Date();
    }
    return new Date(2100, 11, 31);
  };

  const handleDateChange = (date: Date, calendarType: CalendarType) => {
    const formattedDate = formatDateString(date);
    if (calendarType === 'dob') {
      setTouchedFields(prev => new Set(prev).add('dob'));
      dispatch(setDob(formattedDate));
    } else if (calendarType === 'serviceStartDate') {
      setTouchedFields(prev => new Set(prev).add('serviceStartDate'));
      dispatch(setServiceStartDate(formattedDate));
    }
    setHandleOpenCalendar(null);
  };

  const onCancelDate = () => {
    setHandleOpenCalendar(null);
  };
  const { user } = useAppSelector(state => state.user);
  const goSignUpScreen = () => {
    navigation.navigate('signup');
  };

  // Validate all fields
  const isNameValid = useMemo(() => name.trim() !== '', [name]);
  const isMobileValid = useMemo(
    () => mobile.length > COUNTRY_CODE.length, // Ensure there are digits after country code
    [mobile],
  );
  const isDobValid = useMemo(() => dob.trim() !== '', [dob]);
  const isEmployerValid = useMemo(() => employer.trim() !== '', [employer]);
  const isJobTitleValid = useMemo(() => jobTitle.trim() !== '', [jobTitle]);
  const isServiceStartDateValid = useMemo(
    () => serviceStartDate.trim() !== '',
    [serviceStartDate],
  );
  const isBasicSalaryValid = useMemo(() => {
    if (!basicSalary || basicSalary.trim() === '') {
      return false;
    }
    const numericValue = basicSalary.replace(/,/g, '');
    const numValue = parseFloat(numericValue);
    return !isNaN(numValue) && numValue > 0;
  }, [basicSalary]);
  const isNetSalaryValid = useMemo(() => {
    if (!netSalary || netSalary.trim() === '') {
      return false;
    }
    const numericValue = netSalary.replace(/,/g, '');
    const numValue = parseFloat(numericValue);
    return !isNaN(numValue) && numValue > 0;
  }, [netSalary]);
  const isCurrentBankValid = useMemo(
    () => currentBank.trim() !== '',
    [currentBank],
  );
  const isCityValid = useMemo(() => city.trim() !== '', [city]);

  // Check if fields have errors (for red border display)
  // Show error only if field has been touched AND is invalid
  const hasNameError = touchedFields.has('name') && !isNameValid;
  const hasMobileError = touchedFields.has('mobile') && !isMobileValid;
  const hasDobError = touchedFields.has('dob') && !isDobValid;
  const hasEmployerError = touchedFields.has('employer') && !isEmployerValid;
  const hasJobTitleError = touchedFields.has('jobTitle') && !isJobTitleValid;
  const hasServiceStartDateError =
    touchedFields.has('serviceStartDate') && !isServiceStartDateValid;
  const hasBasicSalaryError =
    touchedFields.has('basicSalary') && !isBasicSalaryValid;
  const hasNetSalaryError = touchedFields.has('netSalary') && !isNetSalaryValid;
  const hasCurrentBankError =
    touchedFields.has('currentBank') && !isCurrentBankValid;
  const hasCityError = touchedFields.has('city') && !isCityValid;

  // Check if all required fields are filled
  const isFormValid = useMemo(
    () =>
      isNameValid &&
      isMobileValid &&
      isDobValid &&
      isEmployerValid &&
      isJobTitleValid &&
      isServiceStartDateValid &&
      isBasicSalaryValid &&
      isNetSalaryValid &&
      isCurrentBankValid &&
      isCityValid,
    [
      isNameValid,
      isMobileValid,
      isDobValid,
      isEmployerValid,
      isJobTitleValid,
      isServiceStartDateValid,
      isBasicSalaryValid,
      isNetSalaryValid,
      isCurrentBankValid,
      isCityValid,
    ],
  );

  const handleNext = () => {
    if (!isFormValid && Boolean(user)) {
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
    if (user) {
      navigation.navigate('personalStep2', {
        serviceId,
      });
    } else {
      goSignUpScreen();
    }
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
                style={[styles.input, hasNameError && styles.inputError]}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:name`,
                )}
                placeholderTextColor="#999"
                value={name}
                onChangeText={text => {
                  setTouchedFields(prev => new Set(prev).add('name'));
                  dispatch(setName(filterEnglishLettersAndSpaces(text)));
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
                  styles.input,
                  hasMobileError && styles.inputError,
                  styles.mobileInputContainer,
                ]}
              >
                <MobileNumberInput
                  textAlign={isRTL ? 'right' : 'left'}
                  placeholder={translate(
                    `${TranslationNamespaces.FINANCING}:mobile`,
                  )}
                  value={mobile}
                  onChangeText={(value: string) => {
                    setTouchedFields(prev => new Set(prev).add('mobile'));
                    dispatch(setMobile(value));
                  }}
                  countryCode={COUNTRY_CODE}
                />
              </View>
              <Text style={styles.mandatoryStar}>*</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TouchableOpacity
                style={[
                  styles.dateInputContainer,
                  hasDobError && styles.inputError,
                ]}
                onPress={() => {
                  setTouchedFields(prev => new Set(prev).add('dob'));
                  setHandleOpenCalendar('dob');
                }}
              >
                <TextInput
                  style={styles.dateInput}
                  placeholder={translate(
                    `${TranslationNamespaces.FINANCING}:dob`,
                  )}
                  placeholderTextColor="#999"
                  value={dob}
                  onChangeText={text => dispatch(setDob(text))}
                  editable={false}
                />
                <CalendarLogo />
              </TouchableOpacity>
              <Text style={styles.mandatoryStar}>*</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, hasEmployerError && styles.inputError]}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:employer`,
                )}
                placeholderTextColor="#999"
                value={employer}
                onChangeText={text => {
                  setTouchedFields(prev => new Set(prev).add('employer'));
                  dispatch(setEmployer(filterEnglishLettersAndSpaces(text)));
                }}
                {...getInputConstraints('text')}
              />
              <Text style={styles.mandatoryStar}>*</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, hasJobTitleError && styles.inputError]}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:jobTitle`,
                )}
                placeholderTextColor="#999"
                value={jobTitle}
                onChangeText={text => {
                  setTouchedFields(prev => new Set(prev).add('jobTitle'));
                  dispatch(setJobTitle(filterEnglishLettersAndSpaces(text)));
                }}
                {...getInputConstraints('text')}
              />
              <Text style={styles.mandatoryStar}>*</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TouchableOpacity
                style={[
                  styles.dateInputContainer,
                  hasServiceStartDateError && styles.inputError,
                ]}
                onPress={() => {
                  setTouchedFields(prev =>
                    new Set(prev).add('serviceStartDate'),
                  );
                  setHandleOpenCalendar('serviceStartDate');
                }}
              >
                <TextInput
                  style={styles.dateInput}
                  placeholder={translate(
                    `${TranslationNamespaces.FINANCING}:serviceStartDate`,
                  )}
                  placeholderTextColor="#999"
                  value={serviceStartDate}
                  onChangeText={text => dispatch(setServiceStartDate(text))}
                  editable={false}
                />
                <CalendarLogo />
              </TouchableOpacity>
              <Text style={styles.mandatoryStar}>*</Text>
            </View>
          </View>

          {/* Basic Salary */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, hasBasicSalaryError && styles.inputError]}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:basicSalary`,
                )}
                placeholderTextColor="#999"
                value={basicSalary}
                onChangeText={text => {
                  setTouchedFields(prev => new Set(prev).add('basicSalary'));
                  const formattedText = formatInput(text, true);
                  dispatch(setBasicSalary(formattedText));
                }}
                keyboardType="numeric"
                textAlign={isRTL ? 'right' : 'left'}
              />
              <Text style={styles.mandatoryStar}>*</Text>
            </View>
          </View>

          {/* Net Salary (After GOSI) */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, hasNetSalaryError && styles.inputError]}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:netSalaryAfterGOSI`,
                )}
                placeholderTextColor="#999"
                value={netSalary}
                onChangeText={text => {
                  setTouchedFields(prev => new Set(prev).add('netSalary'));
                  const formattedText = formatInput(text, true);
                  dispatch(setNetSalary(formattedText));
                }}
                keyboardType="numeric"
                textAlign={isRTL ? 'right' : 'left'}
              />
              <Text style={styles.mandatoryStar}>*</Text>
            </View>
          </View>

          {/* Current Bank */}
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

          {/* City */}
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

        {/* Next Button */}
        <TouchableOpacity
          style={[
            styles.nextButton,
            !isFormValid && Boolean(user) && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={!isFormValid && Boolean(user)}
        >
          <Text style={styles.nextButtonText}>
            {user
              ? translate(`${TranslationNamespaces.FINANCING}:next`)
              : translate(`${TranslationNamespaces.HOME}:signUpToApply`)}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {handleOpenCalendar && (
        <DateTimePickerModal
          isDarkModeEnabled={false}
          themeVariant="light"
          date={getDatePickerValue(handleOpenCalendar as CalendarType)}
          isVisible={!!handleOpenCalendar}
          mode="date"
          onCancel={onCancelDate}
          minimumDate={getDatePickerMinDate(handleOpenCalendar as CalendarType)}
          maximumDate={getDatePickerMaxDate(handleOpenCalendar as CalendarType)}
          onConfirm={(date: Date) => {
            handleDateChange(date, handleOpenCalendar as CalendarType);
          }}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  datePicker: {
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
    width: '33%',
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
  mobileInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  mobileInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: ResponsiveDimensions.vs(16),
    paddingVertical: ResponsiveDimensions.vs(16),
  },
  countryCode: {
    color: '#333',
    fontSize: ResponsiveDimensions.vs(16),
    marginRight: ResponsiveDimensions.vs(8),
    fontWeight: '500',
  },
  mobileInput: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: ResponsiveDimensions.vs(16),
    color: '#333',
    padding: 0,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: ResponsiveDimensions.vs(12),
    borderWidth: 1,
    borderColor: '#8C8C8C',
    paddingHorizontal: ResponsiveDimensions.vs(16),
    paddingVertical: ResponsiveDimensions.vs(16),
  },
  dateInput: {
    flex: 1,
    fontSize: ResponsiveDimensions.vs(16),
    color: '#333',
    textAlign: isRTL ? 'right' : 'left',
  },
  calendarIcon: {
    fontSize: ResponsiveDimensions.vs(16),
    color: '#007AFF',
    marginLeft: ResponsiveDimensions.vs(8),
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

export default PersonalStep1;
