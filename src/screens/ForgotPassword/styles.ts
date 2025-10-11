import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { StyleSheet } from 'react-native';
import { AppColors } from 'modules/theme/src';

const styles = StyleSheet.create({
  // Legacy styles - can be removed if not used elsewhere
  scrollView: { marginVertical: ResponsiveDimensions.vs(8) },
  scrollViewContent: {
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
  btnText: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
});

export default styles;
