import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { StyleSheet } from 'react-native';
import { AppColors } from '@modules/theme';

export const styles = StyleSheet.create({
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
    width: ResponsiveDimensions.vs(32),
    height: ResponsiveDimensions.vs(32),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ResponsiveDimensions.vs(12),
  },
  backIcon: {
    color: AppColors.themeLight.primaryButtonColor, // Bright blue
    width: ResponsiveDimensions.vs(16),
    height: ResponsiveDimensions.vs(16),
    fontWeight: 'bold',
  },
  title: {
    color: AppColors.themeLight.primaryButtonColor, // Bright blue
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
    width: ResponsiveDimensions.vs(24),
    height: ResponsiveDimensions.vs(24),
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
