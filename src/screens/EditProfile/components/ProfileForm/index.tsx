import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
import { CalendarLogo } from 'modules/assets/src';
const isRTL = I18nManager.isRTL;
const COUNTRY_CODE = !isRTL ? '+966' : '+٩٦٦';
// Local MobileNumberInput component matching RealEstateStep1 input styles
interface MobileNumberInputProps {
  value: string;
  onChangeText: (text: string) => void;
  countryCode: string;
  textAlign?: 'left' | 'right';
  style?: any;
  editable?: boolean;
}

const MobileNumberInput: React.FC<MobileNumberInputProps> = ({
  value,
  onChangeText,
  countryCode,
  textAlign = 'left',
  style,
  editable = true,
}) => {
  // Extract the number part (after country code)
  const numberPart = value.startsWith(countryCode)
    ? value.substring(countryCode.length)
    : value;

  const handleTextChange = (text: string) => {
    // Always prepend country code
    const newValue = countryCode + text.replace(/[^\d\u0660-\u0669]/g, '');
    onChangeText(newValue);
  };

  return (
    <View style={styles.mobileInputWrapper}>
      <Text style={styles.countryCode}>{countryCode}</Text>
      <TextInput
        style={[style, styles.mobileInput]}
        value={numberPart}
        onChangeText={handleTextChange}
        keyboardType="phone-pad"
        textAlign={textAlign}
        placeholderTextColor="#B0B0B0"
        editable={editable}
        maxLength={10}
      />
    </View>
  );
};
interface ProfileData {
  username: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  address: string;
}

interface ProfileFormProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  profileData,
  setProfileData,
}) => {
  const [handleOpenCalendar, setHandleOpenCalendar] = useState<boolean>(false);
  const [, setTouchedFields] = useState<Set<string>>(new Set());

  // Validate mobile number - ensures there are digits after country code
  const isMobileValid = useMemo(
    () => profileData.mobileNumber.length > COUNTRY_CODE.length,
    [profileData.mobileNumber],
  );

  // Track validation state (can be used for form submission validation or visual feedback)
  useEffect(() => {
    // Validation is computed and available via isMobileValid
    // This effect ensures the validation runs when mobileNumber changes
    if (profileData.mobileNumber && !isMobileValid) {
      // Mobile number is invalid (only country code, no digits)
      // This can be used for showing error messages or disabling save button
    }
  }, [profileData.mobileNumber, isMobileValid]);

  const formatDateString = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getDatePickerValue = (): Date => {
    if (profileData.dateOfBirth) {
      const [day, month, year] = profileData.dateOfBirth.split('-');
      return new Date(
        parseInt(year, 10),
        parseInt(month, 10) - 1,
        parseInt(day, 10),
      );
    }
    return new Date();
  };

  const getDatePickerMinDate = (): Date => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 100);
    return date;
  };

  const getDatePickerMaxDate = (): Date => new Date();

  const handleDateChange = (date: Date) => {
    const formattedDate = formatDateString(date);
    setProfileData(prev => ({ ...prev, dateOfBirth: formattedDate }));
    setHandleOpenCalendar(false);
  };

  const onCancelDate = () => {
    setHandleOpenCalendar(false);
  };

  return (
    <View style={styles.container}>
      {/* Username Field */}
      <View style={styles.fieldContainer}>
        <Text style={[styles.fieldLabel, isRTL && { textAlign: 'left' }]}>
          {translate(`${TranslationNamespaces.EDIT_PROFILE}:username`)}
        </Text>
        <TextInput
          style={styles.fieldValue}
          value={profileData.username}
          onChangeText={value =>
            setProfileData(prev => ({ ...prev, username: value }))
          }
          placeholderTextColor="#B0B0B0"
          editable={false}
        />
        <View style={styles.separator} />
      </View>

      {/* Full Name Field */}
      <View style={styles.fieldContainer}>
        <Text style={[styles.fieldLabel, isRTL && { textAlign: 'left' }]}>
          {translate(`${TranslationNamespaces.EDIT_PROFILE}:fullName`)}
        </Text>
        <TextInput
          style={styles.fieldValue}
          value={profileData.fullName}
          onChangeText={value =>
            setProfileData(prev => ({ ...prev, fullName: value }))
          }
          placeholderTextColor="#B0B0B0"
          maxLength={30}
        />
        <View style={styles.separator} />
      </View>

      {/* Email Field */}
      <View style={styles.fieldContainer}>
        <Text style={[styles.fieldLabel, isRTL && { textAlign: 'left' }]}>
          {translate(`${TranslationNamespaces.EDIT_PROFILE}:email`)}
        </Text>
        <TextInput
          style={styles.fieldValue}
          value={profileData.email}
          onChangeText={value =>
            setProfileData(prev => ({ ...prev, email: value }))
          }
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#B0B0B0"
          maxLength={30}
        />
        <View style={styles.separator} />
      </View>

      {/* Mobile Number Field */}
      <View style={styles.fieldContainer}>
        <Text style={[styles.fieldLabel, isRTL && { textAlign: 'left' }]}>
          {translate(`${TranslationNamespaces.EDIT_PROFILE}:mobileNumber`)}
        </Text>
        <MobileNumberInput
          value={profileData.mobileNumber || COUNTRY_CODE}
          onChangeText={value => {
            setTouchedFields(prev => new Set(prev).add('mobileNumber'));
            setProfileData(prev => ({ ...prev, mobileNumber: value }));
          }}
          countryCode={COUNTRY_CODE}
          textAlign={isRTL ? 'right' : 'left'}
          style={styles.fieldValue}
          editable={false}
        />
        <View style={styles.separator} />
      </View>

      {/* Gender Selection */}
      <View style={styles.fieldContainer}>
        <Text style={[styles.genderLabel, isRTL && { textAlign: 'left' }]}>
          {translate(`${TranslationNamespaces.EDIT_PROFILE}:gender`)}
        </Text>
        <View style={styles.genderContainer}>
          <View style={styles.genderOption}>
            <View
              style={[
                styles.radioButton,
                profileData.gender === 'male' && styles.radioButtonSelected,
              ]}
            >
              {profileData.gender === 'male' && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
            <Text
              style={[
                styles.genderText,
                profileData.gender === 'male' && styles.genderTextSelected,
              ]}
            >
              {translate(`${TranslationNamespaces.EDIT_PROFILE}:male`)}
            </Text>
          </View>

          <View style={styles.genderOption}>
            <View
              style={[
                styles.radioButton,
                profileData.gender === 'female' && styles.radioButtonSelected,
              ]}
            >
              {profileData.gender === 'female' && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
            <Text
              style={[
                styles.genderText,
                profileData.gender === 'female' && styles.genderTextSelected,
              ]}
            >
              {translate(`${TranslationNamespaces.EDIT_PROFILE}:female`)}
            </Text>
          </View>
        </View>
        <View style={styles.separator} />
      </View>

      {/* Date of Birth Field */}
      <View style={styles.fieldContainer}>
        <Text style={[styles.fieldLabel, isRTL && { textAlign: 'left' }]}>
          {translate(`${TranslationNamespaces.EDIT_PROFILE}:dateOfBirth`)}
        </Text>
        <TouchableOpacity
          style={styles.dateInputContainer}
          onPress={() => setHandleOpenCalendar(true)}
        >
          <TextInput
            style={styles.dateInput}
            value={profileData.dateOfBirth}
            onChangeText={value =>
              setProfileData(prev => ({ ...prev, dateOfBirth: value }))
            }
            placeholder={translate(
              `${TranslationNamespaces.EDIT_PROFILE}:datePlaceholder`,
            )}
            placeholderTextColor="#B0B0B0"
            editable={false}
            onPress={() => setHandleOpenCalendar(true)}
          />
          <CalendarLogo />
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>

      {/* Address Field */}
      <View style={styles.fieldContainer}>
        <Text style={[styles.fieldLabel, isRTL && { textAlign: 'left' }]}>
          {translate(`${TranslationNamespaces.EDIT_PROFILE}:address`)}
        </Text>
        <TextInput
          style={styles.fieldValue}
          value={profileData.address}
          onChangeText={value =>
            setProfileData(prev => ({ ...prev, address: value }))
          }
          placeholder={translate(
            `${TranslationNamespaces.EDIT_PROFILE}:addressPlaceholder`,
          )}
          placeholderTextColor="#B0B0B0"
          maxLength={30}
        />
        <View style={styles.separator} />
      </View>
      <DateTimePickerModal
        isDarkModeEnabled={false}
        themeVariant="light"
        date={getDatePickerValue()}
        isVisible={handleOpenCalendar}
        mode="date"
        onCancel={onCancelDate}
        minimumDate={getDatePickerMinDate()}
        maximumDate={getDatePickerMaxDate()}
        onConfirm={handleDateChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingTop: ResponsiveDimensions.vs(60), // Space for floating avatar
    backgroundColor: 'white',
  },
  datePicker: {
    backgroundColor: 'white',
  },
  fieldContainer: {
    marginBottom: ResponsiveDimensions.vs(20),
  },
  fieldLabel: {
    fontSize: ResponsiveDimensions.vs(14),
    color: '#B0B0B0',
    marginBottom: ResponsiveDimensions.vs(8),
  },
  fieldValue: {
    fontSize: ResponsiveDimensions.vs(16),
    color: '#2C2C2C',
    paddingVertical: ResponsiveDimensions.vs(8),
    textAlign: isRTL ? 'right' : 'left',
  },
  genderLabel: {
    fontSize: ResponsiveDimensions.vs(16),
    color: AppColors.themeLight.primary_1,
    fontWeight: 'bold',
    marginBottom: ResponsiveDimensions.vs(12),
  },
  genderContainer: {
    flexDirection: 'row',
    gap: ResponsiveDimensions.vs(24),
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ResponsiveDimensions.vs(8),
  },
  radioButton: {
    width: ResponsiveDimensions.vs(20),
    height: ResponsiveDimensions.vs(20),
    borderRadius: ResponsiveDimensions.vs(10),
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: AppColors.themeLight.primary_1,
    backgroundColor: AppColors.themeLight.primary_1,
  },
  radioButtonInner: {
    width: ResponsiveDimensions.vs(8),
    height: ResponsiveDimensions.vs(8),
    borderRadius: ResponsiveDimensions.vs(4),
    backgroundColor: 'white',
  },
  genderText: {
    fontSize: ResponsiveDimensions.vs(16),
    color: '#999',
  },
  genderTextSelected: {
    color: AppColors.themeLight.primary_1,
    fontWeight: 'bold',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateInput: {
    flex: 1,
    fontSize: ResponsiveDimensions.vs(16),
    color: '#2C2C2C',
    paddingVertical: ResponsiveDimensions.vs(8),
    textAlign: isRTL ? 'right' : 'left',
  },
  calendarIcon: {
    fontSize: ResponsiveDimensions.vs(20),
    color: '#999',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginTop: ResponsiveDimensions.vs(8),
  },
  mobileInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCode: {
    color: '#2C2C2C',
    fontSize: ResponsiveDimensions.vs(16),
    marginRight: ResponsiveDimensions.vs(8),
    fontWeight: '500',
    paddingVertical: ResponsiveDimensions.vs(8),
  },
  mobileInput: {
    flex: 1,
    paddingVertical: 0,
  },
});

export default ProfileForm;
