import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useAppSelector } from '@src/store';
import { Screen } from '@modules/components';

import {
  HeaderSection,
  BannerSection,
  OffersSection,
  ServicesSection,
} from './components';
import { AppColors } from 'modules/theme/src';
import { fetchUnreadNotificationsCount } from 'modules/utils/src/UserUtils';

export default () => {
  const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);

  React.useEffect(() => {
    if (isLoggedIn) {
      fetchUnreadNotificationsCount();
    }
  }, [isLoggedIn]);
  return (
    <Screen
      style={styles.container}
      showNavigationBar={false}
      statusBarColor={AppColors.themeLight.primary_1}
    >
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    paddingTop: ResponsiveDimensions.percentHeight(3), // Space for fixed header
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: ResponsiveDimensions.percentHeight(10), // Reduced padding since no fixed bottom nav
  },
});
