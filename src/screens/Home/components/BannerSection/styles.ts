import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: ResponsiveDimensions.vs(32),
  },
  bannerContainer: {
    width: ResponsiveDimensions.percentWidth(100),
    paddingHorizontal: ResponsiveDimensions.vs(20),
  },
  banner: {
    height: ResponsiveDimensions.vs(180),
    borderRadius: ResponsiveDimensions.vs(16),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Subtle overlay
  },
});
