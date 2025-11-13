import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { I18nManager, StyleSheet } from 'react-native';
import { AppColors } from '@modules/theme';
const isRTL = I18nManager.isRTL;
export const styles = StyleSheet.create({
  container: {
    height: ResponsiveDimensions.vs(140),
    backgroundColor: AppColors.themeLight.primary_1,
    paddingTop: ResponsiveDimensions.vs(50),
    paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingBottom: ResponsiveDimensions.vs(20),
    borderBottomEndRadius: ResponsiveDimensions.vs(12),
    borderBottomStartRadius: ResponsiveDimensions.vs(12),
    marginBottom: ResponsiveDimensions.vs(20),
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
    gap: ResponsiveDimensions.vs(16),
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: ResponsiveDimensions.vs(32),
    paddingHorizontal: ResponsiveDimensions.vs(34),
    paddingVertical: ResponsiveDimensions.vs(12),
  },
  loginText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(16),
    fontWeight: 'bold',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: ResponsiveDimensions.vs(32),
    paddingHorizontal: ResponsiveDimensions.vs(16),
    paddingVertical: ResponsiveDimensions.vs(12),
  },
  searchIcon: {
    width: ResponsiveDimensions.vs(18),
    height: ResponsiveDimensions.vs(18),
    marginRight: ResponsiveDimensions.vs(12),
  },
  searchInput: {
    flex: 1,
    fontSize: ResponsiveDimensions.vs(16),
    color: '#333',
    textAlign: isRTL ? 'right' : 'left',
  },
  notificationButton: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    width: ResponsiveDimensions.vs(24),
    height: ResponsiveDimensions.vs(24),
  },
  backButton: {
    padding: ResponsiveDimensions.vs(8),
    marginRight: ResponsiveDimensions.vs(8),
  },
  backIcon: {
    width: ResponsiveDimensions.vs(16),
    height: ResponsiveDimensions.vs(16),
    tintColor: 'white',
  },
});
