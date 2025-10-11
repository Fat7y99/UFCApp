import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { StyleSheet } from 'react-native';
import { AppColors } from 'modules/theme/src';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: ResponsiveDimensions.vs(100), // Space for bottom navigation
  },
});

export default styles;
