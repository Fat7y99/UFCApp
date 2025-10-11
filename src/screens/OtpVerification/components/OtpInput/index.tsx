import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface OtpInputProps {
  otpCode: string[];
  onOtpChange: (index: number, value: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ otpCode, onOtpChange }) => {
  const inputRefs = React.useRef<(TextInput | null)[]>([]);

  const handleTextChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) {
      value = value.slice(-1);
    }

    onOtpChange(index, value);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    // Handle backspace
    if (key === 'Backspace' && !otpCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otpCode.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => (inputRefs.current[index] = ref)}
          style={styles.input}
          value={digit}
          onChangeText={value => handleTextChange(index, value)}
          onKeyPress={({ nativeEvent }) =>
            handleKeyPress(index, nativeEvent.key)
          }
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: ResponsiveDimensions.vs(14),
    marginBottom: ResponsiveDimensions.vs(20),
  },
  input: {
    width: ResponsiveDimensions.vs(45),
    height: ResponsiveDimensions.vs(45),
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: ResponsiveDimensions.vs(16),
    color: 'white',
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: 'bold',
  },
});

export default OtpInput;
