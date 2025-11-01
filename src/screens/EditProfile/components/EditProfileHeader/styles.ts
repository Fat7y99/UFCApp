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
    color: AppColors.themeLight.primaryButtonColor, // Light blue
    fontSize: ResponsiveDimensions.vs(24),
    fontWeight: 'bold',
  },
  title: {
    color: AppColors.themeLight.primaryButtonColor, // Light blue
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
  addButton: {
    position: 'absolute',
    bottom: ResponsiveDimensions.vs(8),
    right: ResponsiveDimensions.vs(8),
    width: ResponsiveDimensions.vs(32),
    height: ResponsiveDimensions.vs(32),
    borderRadius: ResponsiveDimensions.vs(16),
    backgroundColor: '#4CAF50', // Green color
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  addButtonText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: 'bold',
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: ResponsiveDimensions.vs(50),
  },
  rightSection: {
    flex: 1,
  },
});
