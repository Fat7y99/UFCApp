import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme, AppColors } from '@modules/theme';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';

const ServicesSection: React.FC = () => {
  const theme = useAppTheme();

  const services = [
    {
      id: 1,
      title: 'Personal Loans',
      icon: '👤',
      backgroundColor: '#E3F2FD',
    },
    {
      id: 2,
      title: 'Credit Cards',
      icon: '💳',
      backgroundColor: AppColors.themeLight.primary_1,
    },
    {
      id: 3,
      title: 'Rate Tables',
      icon: '📊',
      backgroundColor: '#E3F2FD',
    },
    {
      id: 4,
      title: 'Corporate Facilities',
      icon: '🏢',
      backgroundColor: '#E3F2FD',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {translate(`${TranslationNamespaces.HOME}:services`)}
        </Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>
            {translate(`${TranslationNamespaces.HOME}:viewAll`)}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Services Grid */}
      <View style={styles.servicesGrid}>
        {services.map(service => (
          <TouchableOpacity
            key={service.id}
            style={[
              styles.serviceCard,
              { backgroundColor: service.backgroundColor },
            ]}
          >
            <View style={styles.serviceCardContent}>
              <View style={styles.serviceIcons}>
                <Text style={styles.heartIcon}>🤍</Text>
                <Text style={styles.serviceIcon}>{service.icon}</Text>
              </View>
              <Text
                style={[
                  styles.serviceTitle,
                  {
                    color:
                      service.backgroundColor === AppColors.themeLight.primary_1
                        ? 'white'
                        : '#333',
                  },
                ]}
              >
                {service.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ResponsiveDimensions.vs(16),
  },
  serviceCard: {
    width: '48%',
    borderRadius: ResponsiveDimensions.vs(16),
    padding: ResponsiveDimensions.vs(20),
    minHeight: ResponsiveDimensions.vs(120),
  },
  serviceCardContent: {
    flex: 1,
  },
  serviceIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: ResponsiveDimensions.vs(16),
  },
  heartIcon: {
    fontSize: ResponsiveDimensions.vs(18),
  },
  serviceIcon: {
    fontSize: ResponsiveDimensions.vs(22),
  },
  serviceTitle: {
    fontSize: ResponsiveDimensions.vs(14),
    fontWeight: 'bold',
    lineHeight: ResponsiveDimensions.vs(18),
  },
});

export default ServicesSection;
