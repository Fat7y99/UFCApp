import { StyleSheet } from 'react-native';
import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ResponsiveDimensions.vs(20),
    justifyContent: 'space-between',
    height: '80%',
  },
  groupContainer: {
    borderRadius: ResponsiveDimensions.vs(12),
    marginBottom: ResponsiveDimensions.vs(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: ResponsiveDimensions.vs(16),
    paddingHorizontal: ResponsiveDimensions.vs(16),
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionText: {
    fontSize: ResponsiveDimensions.vs(16),
    color: '#333',
    flex: 1,
  },
  chevronIcon: {
    fontSize: ResponsiveDimensions.vs(18),
    color: '#999',
    fontWeight: 'bold',
  },
});
