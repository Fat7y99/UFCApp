import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';

const ProfileForm: React.FC = () => {
  const [username, setUsername] = useState('greatPower.G');
  const [fullName, setFullName] = useState('Ahmed Ibrahim Mahmoud');
  const [email, setEmail] = useState('Ahmed@ui.com');
  const [mobileNumber, setMobileNumber] = useState('(+966) 0547 6324 12');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');

  const handleGenderSelect = (selectedGender: 'male' | 'female') => {
    setGender(selectedGender);
  };

  return (
    <View style={styles.container}>
      {/* Username Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>
          {translate(`${TranslationNamespaces.EDIT_PROFILE}:username`)}
        </Text>
        <TextInput
          style={styles.fieldValue}
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#B0B0B0"
        />
        <View style={styles.separator} />
      </View>

      {/* Full Name Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>
          {translate(`${TranslationNamespaces.EDIT_PROFILE}:fullName`)}
        </Text>
        <TextInput
          style={styles.fieldValue}
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor="#B0B0B0"
        />
        <View style={styles.separator} />
      </View>

      {/* Email Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>
          {translate(`${TranslationNamespaces.EDIT_PROFILE}:email`)}
        </Text>
        <TextInput
          style={styles.fieldValue}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#B0B0B0"
        />
        <View style={styles.separator} />
      </View>

      {/* Mobile Number Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>
          {translate(`${TranslationNamespaces.EDIT_PROFILE}:mobileNumber`)}
        </Text>
        <TextInput
          style={styles.fieldValue}
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="phone-pad"
          placeholderTextColor="#B0B0B0"
        />
        <View style={styles.separator} />
      </View>

      {/* Gender Selection */}
      <View style={styles.fieldContainer}>
        <Text style={styles.genderLabel}>
          {translate(`${TranslationNamespaces.EDIT_PROFILE}:gender`)}
        </Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={styles.genderOption}
            onPress={() => handleGenderSelect('male')}
          >
            <View
              style={[
                styles.radioButton,
                gender === 'male' && styles.radioButtonSelected,
              ]}
            >
              {gender === 'male' && <View style={styles.radioButtonInner} />}
            </View>
            <Text
              style={[
                styles.genderText,
                gender === 'male' && styles.genderTextSelected,
              ]}
            >
              {translate(`${TranslationNamespaces.EDIT_PROFILE}:male`)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.genderOption}
            onPress={() => handleGenderSelect('female')}
          >
            <View
              style={[
                styles.radioButton,
                gender === 'female' && styles.radioButtonSelected,
              ]}
            >
              {gender === 'female' && <View style={styles.radioButtonInner} />}
            </View>
            <Text
              style={[
                styles.genderText,
                gender === 'female' && styles.genderTextSelected,
              ]}
            >
              {translate(`${TranslationNamespaces.EDIT_PROFILE}:female`)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
      </View>

      {/* Date of Birth Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>
          {translate(`${TranslationNamespaces.EDIT_PROFILE}:dateOfBirth`)}
        </Text>
        <View style={styles.dateInputContainer}>
          <TextInput
            style={styles.dateInput}
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            placeholder={translate(
              `${TranslationNamespaces.EDIT_PROFILE}:datePlaceholder`,
            )}
            placeholderTextColor="#B0B0B0"
          />
          <Text style={styles.calendarIcon}>📅</Text>
        </View>
        <View style={styles.separator} />
      </View>

      {/* Address Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>
          {translate(`${TranslationNamespaces.EDIT_PROFILE}:address`)}
        </Text>
        <TextInput
          style={styles.fieldValue}
          value={address}
          onChangeText={setAddress}
          placeholder={translate(
            `${TranslationNamespaces.EDIT_PROFILE}:addressPlaceholder`,
          )}
          placeholderTextColor="#B0B0B0"
        />
        <View style={styles.separator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingTop: ResponsiveDimensions.vs(60), // Space for floating avatar
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
});

export default ProfileForm;
