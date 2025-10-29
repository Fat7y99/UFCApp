import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { useNavigation } from '@react-navigation/native';
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

import type { RootStackParamList } from '@src/navigation';
import { getInputConstraints, formatAmount } from '@src/utils/InputFormatting';
import { Screen, NotificationButton } from '@modules/components';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppImages, SMEStep2Logo } from 'modules/assets/src';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SMEStep1: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [liabilityType, setLiabilityType] = useState('');
  const [monthlyInstallment, setMonthlyInstallment] = useState('');
  const [bankName, setBankName] = useState('');
  const [remainingBalance, setRemainingBalance] = useState('');

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
          {translate(`${TranslationNamespaces.FINANCING}:invoiceFinancing`)}
        </Text>
        <NotificationButton />
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

        {/* Document Icon */}
        <View style={styles.iconContainer}>
          <SMEStep2Logo />
        </View>

        {/* Liabilities Section */}
        <View style={styles.liabilitiesSection}>
          <Text style={styles.liabilitiesTitle}>
            {translate(`${TranslationNamespaces.FINANCING}:liabilities`)}
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={translate(
                `${TranslationNamespaces.FINANCING}:liabilityType`,
              )}
              placeholderTextColor="#999"
              value={liabilityType}
              onChangeText={setLiabilityType}
              {...getInputConstraints('text')}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={translate(
                `${TranslationNamespaces.FINANCING}:monthlyInstallment`,
              )}
              placeholderTextColor="#999"
              value={monthlyInstallment}
              onChangeText={text => setMonthlyInstallment(formatAmount(text))}
              {...getInputConstraints('amount')}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={translate(
                `${TranslationNamespaces.FINANCING}:bankName`,
              )}
              placeholderTextColor="#999"
              value={bankName}
              onChangeText={setBankName}
              {...getInputConstraints('text')}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={translate(
                `${TranslationNamespaces.FINANCING}:remainingBalance`,
              )}
              placeholderTextColor="#999"
              value={remainingBalance}
              onChangeText={text => setRemainingBalance(formatAmount(text))}
              {...getInputConstraints('amount')}
            />
          </View>
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('smeStep2')}
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
    width: '50%',
    backgroundColor: '#0080F7',
    borderRadius: ResponsiveDimensions.vs(4),
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: ResponsiveDimensions.vs(40),
    position: 'relative',
  },
  documentIcon: {
    width: ResponsiveDimensions.vs(120),
    height: ResponsiveDimensions.vs(120),
    backgroundColor: AppColors.themeLight.primary_1,
    borderRadius: ResponsiveDimensions.vs(16),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    borderBottomLeftRadius: ResponsiveDimensions.vs(8),
    borderBottomRightRadius: ResponsiveDimensions.vs(8),
  },
  documentLines: {
    gap: ResponsiveDimensions.vs(8),
  },
  documentLine: {
    width: ResponsiveDimensions.vs(60),
    height: ResponsiveDimensions.vs(4),
    backgroundColor: 'white',
    borderRadius: ResponsiveDimensions.vs(2),
  },
  documentBackground1: {
    position: 'absolute',
    width: ResponsiveDimensions.vs(100),
    height: ResponsiveDimensions.vs(100),
    backgroundColor: '#4CAF50',
    borderRadius: ResponsiveDimensions.vs(16),
    top: ResponsiveDimensions.vs(10),
    left: ResponsiveDimensions.vs(-10),
    zIndex: 1,
  },
  documentBackground2: {
    position: 'absolute',
    width: ResponsiveDimensions.vs(80),
    height: ResponsiveDimensions.vs(80),
    backgroundColor: '#00BCD4',
    borderRadius: ResponsiveDimensions.vs(16),
    top: ResponsiveDimensions.vs(20),
    right: ResponsiveDimensions.vs(-10),
    zIndex: 2,
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

export default SMEStep1;
