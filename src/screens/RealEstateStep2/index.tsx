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
  I18nManager,
} from 'react-native';
import Toast from 'react-native-toast-message';

import type { RootStackParamList } from '@src/navigation';
import { useAppDispatch, useAppSelector } from '@src/store';
import {
  setLiabilityType,
  setMonthlyInstallment,
  setBankName,
  setRemainingBalance,
} from '@src/store/realEstateForm';
import { getInputConstraints, formatInput } from '@src/utils/InputFormatting';
import { Screen } from '@modules/components';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppImages, RealEstateAllStepsLogo } from 'modules/assets/src';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RealEstateStep2RouteProp = RouteProp<
  RootStackParamList,
  'realEstateStep2'
>;
const isRTL = I18nManager.isRTL;
const RealEstateStep2: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RealEstateStep2RouteProp>();
  const dispatch = useAppDispatch();

  // Get form state from Redux
  const serviceId = useAppSelector(
    state => state.realEstateForm.serviceId || route.params?.serviceId || 7,
  );
  const title = useAppSelector(
    state => state.realEstateForm.title || route.params?.title || '',
  );

  // Step 2 fields from Redux
  const liabilityType = useAppSelector(
    state => state.realEstateForm.liabilityType || '',
  );
  const monthlyInstallment = useAppSelector(
    state => state.realEstateForm.monthlyInstallment || '',
  );
  const bankName = useAppSelector(state => state.realEstateForm.bankName || '');
  const remainingBalance = useAppSelector(
    state => state.realEstateForm.remainingBalance || '',
  );

  // Track which fields have been touched/changed by user
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // Filter text input to only allow English letters and spaces
  const filterEnglishLettersAndSpaces = (text: string): string =>
    text.replace(/[^a-zA-Z\s]/g, '');

  // Validate all fields
  const isLiabilityTypeValid = useMemo(
    () => liabilityType.trim() !== '',
    [liabilityType],
  );

  const isMonthlyInstallmentValid = useMemo(() => {
    if (!monthlyInstallment || monthlyInstallment.trim() === '') {
      return false;
    }
    const numericValue = monthlyInstallment.replace(/,/g, '');
    const numValue = parseFloat(numericValue);
    // Valid if it's a number and > 0 (must be greater than 0)
    return !isNaN(numValue) && numValue > 0;
  }, [monthlyInstallment]);

  const isBankNameValid = useMemo(() => bankName.trim() !== '', [bankName]);

  const isRemainingBalanceValid = useMemo(() => {
    if (!remainingBalance || remainingBalance.trim() === '') {
      return false;
    }
    const numericValue = remainingBalance.replace(/,/g, '');
    const numValue = parseFloat(numericValue);
    // Valid if it's a number and > 0 (must be greater than 0)
    return !isNaN(numValue) && numValue > 0;
  }, [remainingBalance]);

  // Check if fields have errors (for red border display)
  // Show error only if field has been touched AND is invalid
  const hasLiabilityTypeError =
    touchedFields.has('liabilityType') && !isLiabilityTypeValid;
  const hasMonthlyInstallmentError =
    touchedFields.has('monthlyInstallment') && !isMonthlyInstallmentValid;
  const hasBankNameError = touchedFields.has('bankName') && !isBankNameValid;
  const hasRemainingBalanceError =
    touchedFields.has('remainingBalance') && !isRemainingBalanceValid;

  // Check if all required fields are filled
  const isFormValid = useMemo(
    () =>
      isLiabilityTypeValid &&
      isMonthlyInstallmentValid &&
      isBankNameValid &&
      isRemainingBalanceValid,
    [
      isLiabilityTypeValid,
      isMonthlyInstallmentValid,
      isBankNameValid,
      isRemainingBalanceValid,
    ],
  );

  const handleNext = () => {
    if (!isFormValid) {
      Toast.show({
        type: 'fail',
        text1: translate(`${TranslationNamespaces.COMMON}:fieldRequired`, {
          field: translate(`${TranslationNamespaces.FINANCING}:liabilities`),
        }),
      });
      return;
    }
    navigation.navigate('realEstateStep3', {
      serviceId,
      title,
    });
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

        {/* Building Icon */}
        <View style={styles.iconContainer}>
          <RealEstateAllStepsLogo />
        </View>

        {/* Liabilities Section */}
        <View style={styles.liabilitiesSection}>
          <Text
            style={[styles.liabilitiesTitle, isRTL && { textAlign: 'left' }]}
          >
            {translate(`${TranslationNamespaces.FINANCING}:liabilities`)}
          </Text>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  hasLiabilityTypeError && styles.inputError,
                ]}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:liabilityType`,
                )}
                placeholderTextColor="#999"
                value={liabilityType}
                onChangeText={text => {
                  setTouchedFields(prev => new Set(prev).add('liabilityType'));
                  dispatch(
                    setLiabilityType(filterEnglishLettersAndSpaces(text)),
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
                  hasMonthlyInstallmentError && styles.inputError,
                ]}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:monthlyInstallment`,
                )}
                placeholderTextColor="#999"
                onChangeText={text => {
                  setTouchedFields(prev =>
                    new Set(prev).add('monthlyInstallment'),
                  );
                  const formattedText = formatInput(text, true);
                  dispatch(setMonthlyInstallment(formattedText));
                }}
                value={monthlyInstallment?.toLocaleString() ?? ''}
                {...getInputConstraints('amount')}
              />
              <Text style={styles.mandatoryStar}>*</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, hasBankNameError && styles.inputError]}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:bankName`,
                )}
                placeholderTextColor="#999"
                value={bankName}
                onChangeText={text => {
                  setTouchedFields(prev => new Set(prev).add('bankName'));
                  dispatch(setBankName(filterEnglishLettersAndSpaces(text)));
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
                  hasRemainingBalanceError && styles.inputError,
                ]}
                placeholder={translate(
                  `${TranslationNamespaces.FINANCING}:remainingBalance`,
                )}
                placeholderTextColor="#999"
                onChangeText={text => {
                  setTouchedFields(prev =>
                    new Set(prev).add('remainingBalance'),
                  );
                  const formattedText = formatInput(text, true);
                  dispatch(setRemainingBalance(formattedText));
                }}
                value={remainingBalance?.toLocaleString() ?? ''}
                {...getInputConstraints('amount')}
              />
              <Text style={styles.mandatoryStar}>*</Text>
            </View>
          </View>
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={[styles.nextButton, !isFormValid && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!isFormValid}
        >
          <Text style={styles.nextButtonText}>
            {translate(`${TranslationNamespaces.FINANCING}:next`)}
          </Text>
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
    width: '66%',
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
  liabilitiesSection: {
    marginBottom: ResponsiveDimensions.vs(40),
  },
  liabilitiesTitle: {
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

export default RealEstateStep2;
