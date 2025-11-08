import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useMemo } from 'react';
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
import { useAppSelector } from '@src/store';
import {
  getInputConstraints,
  formatPhoneNumber,
} from '@src/utils/InputFormatting';
import { Screen } from '@modules/components';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppImages, CalendarLogo, PersonalStep1Logo } from 'modules/assets/src';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const isRTL = I18nManager.isRTL;
const PersonalStep1: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const serviceId = 12; // Default to 12 for Personal Loan
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [employer, setEmployer] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [serviceStartDate, setServiceStartDate] = useState('');
  const [handleOpenCalendar, setHandleOpenCalendar] = useState<string | null>(
    null,
  );

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
      setDob(formattedDate);
    } else if (calendarType === 'serviceStartDate') {
      setServiceStartDate(formattedDate);
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

  // Filter text input to only allow English letters and spaces
  const filterEnglishLettersAndSpaces = (text: string): string =>
    text.replace(/[^a-zA-Z\s]/g, '');

  // Check if all required fields are filled
  const isFormValid = useMemo(
    () =>
      name.trim() !== '' &&
      mobile.trim() !== '' &&
      dob.trim() !== '' &&
      employer.trim() !== '' &&
      jobTitle.trim() !== '' &&
      serviceStartDate.trim() !== '',
    [name, mobile, dob, employer, jobTitle, serviceStartDate],
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
        customerBaseInfo: {
          name: name || undefined,
          phone: mobile || undefined,
          birthDate: dob || undefined,
          employer: employer || undefined,
          jobTitle: jobTitle || undefined,
          serviceStartDate: serviceStartDate || undefined,
        },
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
            <TextInput
              style={styles.input}
              placeholder={translate(`${TranslationNamespaces.FINANCING}:name`)}
              placeholderTextColor="#999"
              value={name}
              onChangeText={text =>
                setName(filterEnglishLettersAndSpaces(text))
              }
              {...getInputConstraints('text')}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={translate(
                `${TranslationNamespaces.FINANCING}:mobile`,
              )}
              placeholderTextColor="#999"
              value={mobile}
              onChangeText={text => setMobile(formatPhoneNumber(text))}
              {...getInputConstraints('phone')}
            />
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.dateInputContainer}
              onPress={() => setHandleOpenCalendar('dob')}
            >
              <TextInput
                style={styles.dateInput}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:dob`,
                )}
                placeholderTextColor="#999"
                value={dob}
                onChangeText={setDob}
                editable={false}
              />
              <CalendarLogo />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={translate(
                `${TranslationNamespaces.FINANCING}:employer`,
              )}
              placeholderTextColor="#999"
              value={employer}
              onChangeText={text =>
                setEmployer(filterEnglishLettersAndSpaces(text))
              }
              {...getInputConstraints('text')}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={translate(
                `${TranslationNamespaces.FINANCING}:jobTitle`,
              )}
              placeholderTextColor="#999"
              value={jobTitle}
              onChangeText={text =>
                setJobTitle(filterEnglishLettersAndSpaces(text))
              }
              {...getInputConstraints('text')}
            />
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.dateInputContainer}
              onPress={() => setHandleOpenCalendar('serviceStartDate')}
            >
              <TextInput
                style={styles.dateInput}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:serviceStartDate`,
                )}
                placeholderTextColor="#999"
                value={serviceStartDate}
                onChangeText={setServiceStartDate}
                editable={false}
              />
              <CalendarLogo />
            </TouchableOpacity>
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
          style={styles.datePicker}
          pickerStyleIOS={styles.datePicker}
          pickerContainerStyleIOS={styles.datePicker}
          pickerComponentStyleIOS={styles.datePicker}
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
