import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme, AppColors } from '@modules/theme';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';

const OffersSection: React.FC = () => {
  const theme = useAppTheme();

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {translate(`${TranslationNamespaces.HOME}:offers`)}
        </Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>
            {translate(`${TranslationNamespaces.HOME}:viewAll`)}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Offers Cards */}
      <View style={styles.offersContainer}>
        {/* First Offer Card - 7 Days */}
        <View style={styles.offerCard}>
          <View style={styles.offerCardContent}>
            <Text style={styles.offerTitle}>7 DAYS</Text>
            <Text style={styles.offerDescription}>
              Application for installments
            </Text>
          </View>
        </View>

        {/* Second Offer Card - 20% Interest */}
        <View style={[styles.offerCard, styles.offerCardGreen]}>
          <View style={styles.offerCardContent}>
            <Text style={styles.offerTitle}>%20</Text>
            <Text style={styles.offerDescription}>
              Interest on loans Starting from
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ResponsiveDimensions.vs(20),
    marginBottom: ResponsiveDimensions.vs(32),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ResponsiveDimensions.vs(20),
  },
  viewAllText: {
    color: AppColors.themeLight.primary_1,
    fontSize: ResponsiveDimensions.vs(16),
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: AppColors.themeLight.primary_1,
    fontSize: ResponsiveDimensions.vs(20),
    fontWeight: 'bold',
  },
  offersContainer: {
    flexDirection: 'row',
    gap: ResponsiveDimensions.vs(16),
  },
  offerCard: {
    flex: 1,
    backgroundColor: AppColors.themeLight.primary_1,
    borderRadius: ResponsiveDimensions.vs(16),
    padding: ResponsiveDimensions.vs(20),
    minHeight: ResponsiveDimensions.vs(140),
    justifyContent: 'center',
  },
  offerCardGreen: {
    backgroundColor: '#4CAF50',
  },
  offerCardContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerTitle: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(28),
    fontWeight: 'bold',
    marginBottom: ResponsiveDimensions.vs(12),
    textAlign: 'center',
  },
  offerDescription: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(14),
    lineHeight: ResponsiveDimensions.vs(20),
    textAlign: 'center',
  },
});

export default OffersSection;
