import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: '50%',
    justifyContent: 'flex-end',
    paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingTop: ResponsiveDimensions.vs(30),
    backgroundColor: 'white',
  },
  changePasswordButton: {
    backgroundColor: '#4CAF50', // Green color as per design
    borderRadius: ResponsiveDimensions.vs(8),
    paddingVertical: ResponsiveDimensions.vs(16),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  changePasswordButtonText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(16),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  changePasswordButtonDisabled: {
    opacity: 0.6,
  },
});
