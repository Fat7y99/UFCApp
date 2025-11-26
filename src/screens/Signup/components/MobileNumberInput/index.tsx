import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { AppColors } from '@modules/theme';

interface MobileNumberInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  countryCode: string;
  textAlign?: 'left' | 'right';
}

const MobileNumberInput: React.FC<MobileNumberInputProps> = ({
  placeholder,
  value,
  onChangeText,
  countryCode,
  textAlign = 'left',
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
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text style={styles.countryCode}>{countryCode}</Text>
        <TextInput
          style={[styles.input, textAlign === 'right' && styles.inputRTL]}
          placeholder={placeholder}
          placeholderTextColor="white"
          value={numberPart}
          onChangeText={handleTextChange}
          keyboardType="phone-pad"
          textAlign={textAlign}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: ResponsiveDimensions.vs(16),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ResponsiveDimensions.vs(50),
    backgroundColor: AppColors.themeLight.primary_1,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: ResponsiveDimensions.vs(15),
    paddingHorizontal: ResponsiveDimensions.vs(16),
  },
  countryCode: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(16),
    marginRight: ResponsiveDimensions.vs(8),
    fontWeight: '500',
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: ResponsiveDimensions.vs(16),
    padding: 0,
  },
  inputRTL: {
    textAlign: 'right',
  },
});

export default MobileNumberInput;
