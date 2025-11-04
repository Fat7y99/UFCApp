import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { useNavigation, useRoute } from '@react-navigation/native';
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
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import type { RootStackParamList } from '@src/navigation';
import {
  getInputConstraints,
  formatPhoneNumber,
} from '@src/utils/InputFormatting';
import { Screen } from '@modules/components';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  AppImages,
  CalendarLogo,
  RealEstateAllStepsLogo,
} from 'modules/assets/src';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RealEstateStep1RouteProp = RouteProp<
  RootStackParamList,
  'realEstateStep1'
>;

const RealEstateStep1: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RealEstateStep1RouteProp>();
  const serviceId = route.params?.serviceId || 7;
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [employer, setEmployer] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [handleOpenCalendar, setHandleOpenCalendar] = useState<boolean>(false);

  const formatDateString = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getDatePickerValue = (): Date => {
    if (dob) {
      const [day, month, year] = dob.split('-');
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
    setDob(formattedDate);
    setHandleOpenCalendar(false);
  };

  const onCancelDate = () => {
    setHandleOpenCalendar(false);
  };

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
          {translate(`${TranslationNamespaces.FINANCING}:purchaseFinancing`)}
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

        {/* Building Icon */}
        <View style={styles.iconContainer}>
          <RealEstateAllStepsLogo />
        </View>

        {/* Base Registration Fields Section */}
        <View style={styles.registrationSection}>
          <Text style={styles.registrationTitle}>
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
              onChangeText={setName}
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
              onPress={() => setHandleOpenCalendar(true)}
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
              onChangeText={setEmployer}
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
              onChangeText={setJobTitle}
              {...getInputConstraints('text')}
            />
          </View>
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            navigation.navigate('realEstateStep2', {
              serviceId,
              customerBaseInfo: {
                name: name || undefined,
                phone: mobile || undefined,
                birthDate: dob || undefined,
                employer: employer || undefined,
                jobTitle: jobTitle || undefined,
              },
            });
          }}
        >
          <Text style={styles.nextButtonText}>
            {translate(`${TranslationNamespaces.FINANCING}:next`)}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <DateTimePickerModal
        date={getDatePickerValue()}
        isVisible={handleOpenCalendar}
        mode="date"
        onCancel={onCancelDate}
        minimumDate={getDatePickerMinDate()}
        maximumDate={getDatePickerMaxDate()}
        onConfirm={handleDateChange}
      />
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
    width: '33%',
    backgroundColor: '#0080F7',
    borderRadius: ResponsiveDimensions.vs(4),
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: ResponsiveDimensions.vs(40),
    position: 'relative',
  },
  buildingIcon: {
    width: ResponsiveDimensions.vs(100),
    height: ResponsiveDimensions.vs(120),
    backgroundColor: AppColors.themeLight.primary_1,
    borderRadius: ResponsiveDimensions.vs(16),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  buildingWindows: {
    gap: ResponsiveDimensions.vs(6),
  },
  windowRow: {
    flexDirection: 'row',
    gap: ResponsiveDimensions.vs(6),
  },
  window: {
    width: ResponsiveDimensions.vs(14),
    height: ResponsiveDimensions.vs(14),
    backgroundColor: '#4CAF50',
    borderRadius: ResponsiveDimensions.vs(7),
  },
  receiptIcon: {
    position: 'absolute',
    right: ResponsiveDimensions.vs(-20),
    top: ResponsiveDimensions.vs(20),
    width: ResponsiveDimensions.vs(80),
    height: ResponsiveDimensions.vs(100),
    backgroundColor: '#4CAF50',
    borderRadius: ResponsiveDimensions.vs(12),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  dollarSign: {
    fontSize: ResponsiveDimensions.vs(40),
    color: AppColors.themeLight.primary_1,
    fontWeight: 'bold',
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
    zIndex: 1,
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
});

export default RealEstateStep1;
