import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { I18nManager, StyleSheet } from 'react-native';
const isRTL = I18nManager.isRTL;
export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingTop: ResponsiveDimensions.vs(20),
    backgroundColor: 'white',
  },
  title: {
    fontSize: ResponsiveDimensions.vs(20),
    fontWeight: 'bold',
    color: '#B8B8B8', // Dark gray as per design
    marginBottom: ResponsiveDimensions.vs(12),
    [isRTL ? 'paddingStart' : 'paddingEnd']: ResponsiveDimensions.vs(20),
    textAlign: 'left',
  },
  instruction: {
    fontSize: ResponsiveDimensions.vs(14),
    color: '#B8B8B8', // Light gray as per design
    marginBottom: ResponsiveDimensions.vs(24),
    lineHeight: ResponsiveDimensions.vs(20),
    [isRTL ? 'paddingStart' : 'paddingEnd']: ResponsiveDimensions.vs(20),
    textAlign: 'left',
  },
  emailInput: {
    borderWidth: 1,
    borderColor: '#8C8C8C',
    borderRadius: ResponsiveDimensions.vs(8),
    paddingHorizontal: ResponsiveDimensions.vs(16),
    paddingVertical: ResponsiveDimensions.vs(14),
    fontSize: ResponsiveDimensions.vs(16),
    color: '#2C2C2C',
    backgroundColor: 'white',
    marginBottom: ResponsiveDimensions.vs(20),
    textAlign: isRTL ? 'right' : 'left',
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#8C8C8C',
    borderRadius: ResponsiveDimensions.vs(8),
    paddingHorizontal: ResponsiveDimensions.vs(16),
    paddingVertical: ResponsiveDimensions.vs(14),
    fontSize: ResponsiveDimensions.vs(16),
    color: '#2C2C2C',
    backgroundColor: 'white',
    height: ResponsiveDimensions.vs(100),
    textAlignVertical: 'top',
    marginBottom: ResponsiveDimensions.vs(20),
    textAlign: isRTL ? 'right' : 'left',
  },
  emailInputError: {
    borderColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: ResponsiveDimensions.vs(12),
    marginTop: ResponsiveDimensions.vs(-16),
    marginBottom: ResponsiveDimensions.vs(20),
    textAlign: isRTL ? 'right' : 'left',
  },
});
