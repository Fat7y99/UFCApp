import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: ResponsiveDimensions.vs(24),
    width: ResponsiveDimensions.vs(327),
  },
  title: {
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: '600',
    color: '#272424',
    textAlign: 'center',
  },
  numberNoOnboarding: {
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: '600',
    color: '#0038FF',
    textAlign: 'center',
  },
  description: {
    marginTop: ResponsiveDimensions.vs(2),
  },
  descriptionText: {
    fontSize: ResponsiveDimensions.vs(14),
    fontWeight: '400',
    color: '#272424',
    textAlign: 'center',
  },
  button: {
    marginTop: ResponsiveDimensions.vs(24),
    paddingVertical: ResponsiveDimensions.vs(12),
    paddingHorizontal: ResponsiveDimensions.vs(24),
    borderRadius: ResponsiveDimensions.vs(8),
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: ResponsiveDimensions.vs(100),
  },
  primaryButton: {
    backgroundColor: '#0038FF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0038FF',
  },
  buttonText: {
    fontSize: ResponsiveDimensions.vs(16),
    fontWeight: '600',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#0038FF',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ResponsiveDimensions.vs(16),
    gap: ResponsiveDimensions.vs(12),
  },
  buttonSpacing: {
    marginLeft: ResponsiveDimensions.vs(12),
  },
  cancelBtn: { marginBottom: ResponsiveDimensions.vs(10) },
  cancelBtnReverse: { marginTop: ResponsiveDimensions.vs(10) },
});
