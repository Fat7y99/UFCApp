import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: ResponsiveDimensions.vs(56),
    paddingBottom: ResponsiveDimensions.vs(20),
    paddingHorizontal: ResponsiveDimensions.vs(20),
    backgroundColor: 'white',
  },
  username: {
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: 'bold',
    color: '#6A1B9A', // Dark purple
    marginBottom: ResponsiveDimensions.vs(8),
  },
  editProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ResponsiveDimensions.vs(8),
  },
  editProfileText: {
    fontSize: ResponsiveDimensions.vs(14),
    color: '#999',
  },
  editIcon: {
    fontSize: ResponsiveDimensions.vs(12),
  },
});
