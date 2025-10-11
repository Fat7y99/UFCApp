import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { AppColors } from '@modules/theme';

interface PhoneInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  placeholder,
  value,
  onChangeText,
}) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="white"
      value={value}
      onChangeText={onChangeText}
      keyboardType="phone-pad"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: ResponsiveDimensions.vs(16),
  },
  input: {
    height: ResponsiveDimensions.vs(50),
    backgroundColor: AppColors.themeLight.primary_1,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: ResponsiveDimensions.vs(15),
    paddingHorizontal: ResponsiveDimensions.vs(16),
    color: 'white',
    fontSize: ResponsiveDimensions.vs(16),
  },
});

export default PhoneInput;
