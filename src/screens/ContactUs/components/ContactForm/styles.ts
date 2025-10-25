import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { StyleSheet } from 'react-native';

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
    paddingEnd: ResponsiveDimensions.vs(20),
  },
  instruction: {
    fontSize: ResponsiveDimensions.vs(14),
    color: '#B8B8B8', // Light gray as per design
    marginBottom: ResponsiveDimensions.vs(24),
    lineHeight: ResponsiveDimensions.vs(20),
    paddingEnd: ResponsiveDimensions.vs(20),
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
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#8C8C8C',
    borderRadius: ResponsiveDimensions.vs(8),
    paddingHorizontal: ResponsiveDimensions.vs(16),
    paddingVertical: ResponsiveDimensions.vs(14),
    fontSize: ResponsiveDimensions.vs(16),
    color: '#CACACA',
    backgroundColor: 'white',
    height: ResponsiveDimensions.vs(100),
    textAlignVertical: 'top',
    marginBottom: ResponsiveDimensions.vs(20),
  },
});
