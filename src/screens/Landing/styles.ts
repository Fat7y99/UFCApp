import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { AppColors } from 'modules/theme/src';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollView: { marginVertical: ResponsiveDimensions.vs(8) },
  scrollViewContent: {
    // paddingVertical: ResponsiveDimensions.vs(32),
    gap: ResponsiveDimensions.vs(8),
    flexGrow: 1,
    justifyContent: 'center',
  },

  landingNoteText: {
    marginTop: ResponsiveDimensions.vs(16),

    textAlign: 'center',
    color: AppColors.themeLight.onPrimary,
  },
  btn: {
    paddingVertical: ResponsiveDimensions.vs(16),
    borderRadius: ResponsiveDimensions.vs(16),
  },
});

export default styles;
