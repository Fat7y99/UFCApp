import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import type { RootStackParamList } from '@src/navigation';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ContactHeader: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleNotificationPress = () => {
    // Handle notification press
    console.log('Notifications pressed');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={AppColors.themeLight.primary_1}
      />

      {/* Header Content */}
      <View style={styles.headerContent}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          {translate(`${TranslationNamespaces.CONTACT}:title`)}
        </Text>

        <TouchableOpacity
          style={styles.notificationButton}
          onPress={handleNotificationPress}
        >
          <Text style={styles.notificationIcon}>🔔</Text>
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
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
  },
  backButton: {
    padding: ResponsiveDimensions.vs(8),
  },
  backIcon: {
    color: AppColors.themeLight.primaryButtonColor, // Light blue
    fontSize: ResponsiveDimensions.vs(24),
    fontWeight: 'bold',
  },
  title: {
    color: AppColors.themeLight.primaryButtonColor, // Light blue
    fontSize: ResponsiveDimensions.vs(20),
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  notificationButton: {
    padding: ResponsiveDimensions.vs(8),
    position: 'relative',
  },
  notificationIcon: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(20),
  },
  notificationBadge: {
    position: 'absolute',
    top: ResponsiveDimensions.vs(4),
    right: ResponsiveDimensions.vs(4),
    backgroundColor: AppColors.themeLight.primaryButtonColor, // Light blue
    borderRadius: ResponsiveDimensions.vs(8),
    minWidth: ResponsiveDimensions.vs(16),
    height: ResponsiveDimensions.vs(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(10),
    fontWeight: 'bold',
  },
});

export default ContactHeader;
