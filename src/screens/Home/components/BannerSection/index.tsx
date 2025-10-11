import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { AppImages } from '@modules/assets';

const BannerSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={AppImages.signupBg} // Using existing background image
        style={styles.banner}
        resizeMode="cover"
      >
        {/* Overlay for better text visibility if needed */}
        <View style={styles.overlay} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ResponsiveDimensions.vs(20),
    marginBottom: ResponsiveDimensions.vs(32),
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

export default BannerSection;
