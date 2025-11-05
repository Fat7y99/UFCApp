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
  ActivityIndicator,
  I18nManager,
} from 'react-native';

import type { RootStackParamList } from '@src/navigation';
import { SuccessType } from '@src/screens/Success/types';
import {
  getInputConstraints,
  formatAmount,
  formatNumber,
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
  const serviceId = route.params?.serviceId || 1;
  const customerLiability = route.params?.customerLiability;

  const addSmeApplicationMutation = useAddSmeApplicationApi({
    onSuccess: () => {
      navigation.navigate('success', {
        type: SuccessType.APPLICATION_SUBMITTED,
      });
    },
    onError: error => {
      console.error('Error submitting SME application:', error);
      // Handle error - you might want to show an error message
    },
  });
  const [businessActivityType, setBusinessActivityType] = useState('');
  const [crAge, setCrAge] = useState('');
  const [businessRegion, setBusinessRegion] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [posAnnualPropertyIncome, setPosAnnualPropertyIncome] = useState('');
  const [financialStatementAvailable, setFinancialStatementAvailable] =
    useState('');
  const [showDropdown, setShowDropdown] = useState(false);

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
          {translate(`${TranslationNamespaces.FINANCING}:invoiceFinancing`)}
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

        {/* Additional Fields Section */}
        <View style={styles.additionalFieldsSection}>
          <Text style={styles.additionalFieldsTitle}>
            {translate(`${TranslationNamespaces.FINANCING}:additionalFields`)}
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={translate(
                `${TranslationNamespaces.FINANCING}:businessActivityType`,
              )}
              placeholderTextColor="#999"
              value={businessActivityType}
              onChangeText={setBusinessActivityType}
              {...getInputConstraints('text')}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={translate(
                `${TranslationNamespaces.FINANCING}:crAge`,
              )}
              placeholderTextColor="#999"
              value={crAge}
              onChangeText={text => setCrAge(formatNumber(text))}
              {...getInputConstraints('year')}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={translate(
                `${TranslationNamespaces.FINANCING}:businessRegion`,
              )}
              placeholderTextColor="#999"
              value={businessRegion}
              onChangeText={setBusinessRegion}
              {...getInputConstraints('text')}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={translate(
                `${TranslationNamespaces.FINANCING}:businessType`,
              )}
              placeholderTextColor="#999"
              value={businessType}
              onChangeText={setBusinessType}
              {...getInputConstraints('text')}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={translate(
                `${TranslationNamespaces.FINANCING}:posAnnualPropertyIncome`,
              )}
              placeholderTextColor="#999"
              value={posAnnualPropertyIncome}
              onChangeText={text =>
                setPosAnnualPropertyIncome(formatAmount(text))
              }
              {...getInputConstraints('amount')}
            />
          </View>

          {/* Financial Statement Available Dropdown */}
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.dropdownContainer}
              onPress={() => setShowDropdown(!showDropdown)}
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

            {showDropdown && (
              <View style={styles.dropdownOptions}>
                <TouchableOpacity
                  style={styles.dropdownOption}
                  onPress={() => {
                    setFinancialStatementAvailable(
                      translate(`${TranslationNamespaces.FINANCING}:yes`),
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
                    setFinancialStatementAvailable(
                      translate(`${TranslationNamespaces.FINANCING}:no`),
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
            addSmeApplicationMutation.isPending && styles.nextButtonDisabled,
          ]}
          onPress={() => {
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
                },
                customerLiability: customerLiability || undefined,
              },
            };
            addSmeApplicationMutation.mutate(request);
          }}
          disabled={addSmeApplicationMutation.isPending}
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
    textAlign: isRTL ? 'left' : 'right',
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
    color: '#333',
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
