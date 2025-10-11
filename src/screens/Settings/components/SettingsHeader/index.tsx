import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';

const SettingsHeader: React.FC = () => {
  const handleBackPress = () => {
    // Handle back navigation
    console.log('Back pressed');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={AppColors.themeLight.primary_1}
      />

      {/* Header Content with Avatar */}
      <View style={styles.headerContent}>
        <View style={styles.leftSection}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            {translate(`${TranslationNamespaces.SETTINGS}:title`)}
          </Text>
        </View>

        {/* Avatar floating in the middle */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
        </View>

        <View style={styles.rightSection} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.themeLight.primary_1,
    paddingTop: ResponsiveDimensions.vs(50),
    paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingBottom: ResponsiveDimensions.vs(20),
    borderBottomLeftRadius: ResponsiveDimensions.vs(20),
    borderBottomRightRadius: ResponsiveDimensions.vs(20),
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ResponsiveDimensions.vs(20),
  },
  timeText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: 'bold',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: ResponsiveDimensions.vs(8),
  },
  statusIcon: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(16),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: ResponsiveDimensions.vs(20),
    position: 'relative',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: ResponsiveDimensions.vs(8),
    marginRight: ResponsiveDimensions.vs(12),
  },
  backIcon: {
    color: AppColors.themeLight.primaryButtonColor, // Bright blue
    fontSize: ResponsiveDimensions.vs(24),
    fontWeight: 'bold',
  },
  title: {
    color: AppColors.themeLight.primaryButtonColor, // Bright blue
    fontSize: ResponsiveDimensions.vs(20),
    fontWeight: 'bold',
  },
  avatarContainer: {
    position: 'absolute',
    left: '48%',
    bottom: -ResponsiveDimensions.vs(80), // Position at bottom edge of header
    transform: [{ translateX: -ResponsiveDimensions.vs(40) }], // Center horizontally only
    zIndex: 10,
  },
  avatar: {
    width: ResponsiveDimensions.vs(100),
    height: ResponsiveDimensions.vs(100),
    borderRadius: ResponsiveDimensions.vs(50),
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    fontSize: ResponsiveDimensions.vs(32),
    color: '#666',
  },
  rightSection: {
    flex: 1,
  },
});

export default SettingsHeader;
