import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Screen } from '@modules/components';

import {
  HeaderSection,
  BannerSection,
  OffersSection,
  ServicesSection,
} from './components';

export default React.memo(() => (
  <Screen style={styles.container}>
    {/* Fixed Header Section */}
    <HeaderSection />

    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Banner Section */}
      <BannerSection />

      {/* Offers Section */}
      <OffersSection />

      {/* Services Section */}
      <ServicesSection />
    </ScrollView>
  </Screen>
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    marginTop: ResponsiveDimensions.vs(140), // Space for fixed header
  },
  scrollViewContent: {
    paddingBottom: ResponsiveDimensions.vs(20), // Reduced padding since no fixed bottom nav
  },
});
