import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
  text: string;
  linkText: string;
  onLinkPress: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onToggle,
  text,
  linkText,
  onLinkPress,
}) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.checkboxContainer} onPress={onToggle}>
      <View style={[styles.checkbox, checked && styles.checkedBox]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>
    <View style={styles.textContainer}>
      <Text style={styles.text}>
        {text}{' '}
        <Text style={styles.linkText} onPress={onLinkPress}>
          {linkText}
        </Text>
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: ResponsiveDimensions.vs(24),
  },
  checkboxContainer: {
    marginRight: ResponsiveDimensions.vs(12),
  },
  checkbox: {
    width: ResponsiveDimensions.vs(24),
    height: ResponsiveDimensions.vs(24),
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: ResponsiveDimensions.vs(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#00FFFF',
    borderColor: '#00FFFF',
  },
  checkmark: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(14),
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(14),
    lineHeight: ResponsiveDimensions.vs(20),
  },
  linkText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(14),
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default Checkbox;
