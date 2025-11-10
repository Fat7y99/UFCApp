import { StyleSheet } from 'react-native';
import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';

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
  button: { marginTop: ResponsiveDimensions.vs(24) },
  cancelBtn: { marginBottom: ResponsiveDimensions.vs(10) },
  cancelBtnReverse: { marginTop: ResponsiveDimensions.vs(10) },
});
