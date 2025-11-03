import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import type { RootStackScreenProps } from '@src/navigation';
import { getInputConstraints, formatAmount } from '@src/utils/InputFormatting';
import { AppImages, CalendarLogo } from '@modules/assets';
import { Screen } from '@modules/components';

import { AppColors } from '@modules/theme';
import styles from './styles';

export default React.memo((props: RootStackScreenProps<'applyToOffer'>) => {
  const { route } = props;
  const navigation = useNavigation();
  const { offer } = route.params;

  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [jobType, setJobType] = useState('');
  const [serviceStartDate, setServiceStartDate] = useState('');
  const [netSalary, setNetSalary] = useState('');
  const [currentSalaryBank, setCurrentSalaryBank] = useState('');

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
          <Image source={AppImages.leftArrow} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{offer.title} Rate</Text>
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
              placeholder="Name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              {...getInputConstraints('text')}
            />
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.dateInputContainer}>
              <TextInput
                style={styles.dateInput}
                placeholder="Date Of Birth"
                placeholderTextColor="#999"
                value={dob}
                onChangeText={setDob}
                editable={false}
              />
              <CalendarLogo />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.dropdownContainer}>
              <TextInput
                style={styles.dropdownInput}
                placeholder="Workplace"
                placeholderTextColor="#999"
                value={workplace}
                onChangeText={setWorkplace}
                editable={false}
              />
              <Text style={styles.dropdownIcon}>⌄</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.dropdownContainer}>
              <TextInput
                style={styles.dropdownInput}
                placeholder="Job Type"
                placeholderTextColor="#999"
                value={jobType}
                onChangeText={setJobType}
                editable={false}
              />
              <Text style={styles.dropdownIcon}>⌄</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.dateInputContainer}>
              <TextInput
                style={styles.dateInput}
                placeholder="Service Start Date"
                placeholderTextColor="#999"
                value={serviceStartDate}
                onChangeText={setServiceStartDate}
                editable={false}
              />
              <CalendarLogo />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Net Salary"
              placeholderTextColor="#999"
              value={netSalary}
              onChangeText={text => setNetSalary(formatAmount(text))}
              keyboardType="numeric"
              {...getInputConstraints('number')}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Current Salary Bank"
              placeholderTextColor="#999"
              value={currentSalaryBank}
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
          <Text style={styles.getOfferButtonText}>GET OFFER</Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
});
