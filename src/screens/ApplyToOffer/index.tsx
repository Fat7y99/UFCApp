import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  I18nManager,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import type { RootStackScreenProps } from '@src/navigation';
import { getInputConstraints, formatAmount } from '@src/utils/InputFormatting';
import { AppImages, CalendarLogo, DropDownArrow } from '@modules/assets';
import { Screen } from '@modules/components';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
import styles from './styles';

export default React.memo((props: RootStackScreenProps<'applyToOffer'>) => {
  const { route } = props;
  const navigation = useNavigation();
  const { offer } = route.params;
  const isRTL = I18nManager.isRTL;

  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [jobType, setJobType] = useState('');
  const [serviceStartDate, setServiceStartDate] = useState('');
  const [netSalary, setNetSalary] = useState('');
  const [currentSalaryBank, setCurrentSalaryBank] = useState('');
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

  const handleGetOffer = () => {
    // Handle form submission
    console.log('Applying to offer:', offer.title);
  };

  return (
    <Screen
      style={styles.container}
      showNavigationBar={false}
      statusBarColor={AppColors.themeLight.primary_1}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={isRTL ? AppImages.rightArrow : AppImages.leftArrow}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {offer.title} {translate(`${TranslationNamespaces.HOME}:rate`)}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={translate(`${TranslationNamespaces.HOME}:name`)}
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              textAlign={isRTL ? 'right' : 'left'}
              {...getInputConstraints('text')}
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
                  `${TranslationNamespaces.HOME}:dateOfBirth`,
                )}
                placeholderTextColor="#999"
                value={dob}
                onChangeText={setDob}
                editable={false}
                textAlign={isRTL ? 'right' : 'left'}
                onPress={() => setHandleOpenCalendar('dob')}
              />
              <CalendarLogo />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.dropdownContainer}>
              <TextInput
                style={styles.dropdownInput}
                placeholder={translate(
                  `${TranslationNamespaces.HOME}:workplace`,
                )}
                placeholderTextColor="#999"
                value={workplace}
                onChangeText={setWorkplace}
                textAlign={isRTL ? 'right' : 'left'}
                editable={false}
              />
              <DropDownArrow />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.dropdownContainer}>
              <TextInput
                style={styles.dropdownInput}
                placeholder={translate(`${TranslationNamespaces.HOME}:jobType`)}
                placeholderTextColor="#999"
                value={jobType}
                onChangeText={setJobType}
                editable={false}
                textAlign={isRTL ? 'right' : 'left'}
              />
              <DropDownArrow />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.dateInputContainer}
              onPress={() => setHandleOpenCalendar('serviceStartDate')}
            >
              <TextInput
                style={styles.dateInput}
                placeholder={translate(
                  `${TranslationNamespaces.HOME}:serviceStartDate`,
                )}
                placeholderTextColor="#999"
                value={serviceStartDate}
                onChangeText={setServiceStartDate}
                editable={false}
                textAlign={isRTL ? 'right' : 'left'}
                onPress={() => setHandleOpenCalendar('serviceStartDate')}
              />
              <CalendarLogo />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={translate(`${TranslationNamespaces.HOME}:netSalary`)}
              placeholderTextColor="#999"
              value={netSalary}
              textAlign={isRTL ? 'right' : 'left'}
              onChangeText={text => setNetSalary(formatAmount(text))}
              {...getInputConstraints('number')}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={translate(
                `${TranslationNamespaces.HOME}:currentSalaryBank`,
              )}
              placeholderTextColor="#999"
              value={currentSalaryBank}
              textAlign={isRTL ? 'right' : 'left'}
              onChangeText={setCurrentSalaryBank}
              {...getInputConstraints('text')}
            />
          </View>
        </View>

        {/* Get Offer Button */}
        <TouchableOpacity
          style={styles.getOfferButton}
          onPress={handleGetOffer}
        >
          <Text style={styles.getOfferButtonText}>
            {translate(`${TranslationNamespaces.HOME}:getOffer`)}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {handleOpenCalendar && (
        <DateTimePickerModal
          isDarkModeEnabled={false}
          themeVariant="light"
          date={getDatePickerValue(handleOpenCalendar as CalendarType)}
          isVisible={handleOpenCalendar !== null}
          mode="date"
          minimumDate={getDatePickerMinDate(handleOpenCalendar as CalendarType)}
          maximumDate={getDatePickerMaxDate(handleOpenCalendar as CalendarType)}
          onCancel={onCancelDate}
          onConfirm={(date: Date) => {
            handleDateChange(date, handleOpenCalendar as CalendarType);
          }}
        />
      )}
    </Screen>
  );
});
