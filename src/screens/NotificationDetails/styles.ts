import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { StyleSheet } from 'react-native';
import { AppColors } from '@modules/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: ResponsiveDimensions.vs(140),
    backgroundColor: AppColors.themeLight.primary_1,
    paddingTop: ResponsiveDimensions.vs(50),
    paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingBottom: ResponsiveDimensions.vs(20),
    borderBottomEndRadius: ResponsiveDimensions.vs(12),
    borderBottomStartRadius: ResponsiveDimensions.vs(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: ResponsiveDimensions.vs(32),
    height: ResponsiveDimensions.vs(32),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ResponsiveDimensions.vs(12),
  },
  backIcon: {
    width: ResponsiveDimensions.vs(16),
    height: ResponsiveDimensions.vs(16),
  },
  headerTitle: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(20),
    fontWeight: 'bold',
  },
  headerTitleRTL: {
    textAlign: 'left',
  },
  scrollView: {
    flex: 1,
    // paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingTop: ResponsiveDimensions.vs(20),
  },
  contentCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: ResponsiveDimensions.vs(20),
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ResponsiveDimensions.vs(20),
    backgroundColor: 'white',
  },
  iconContainer: {
    width: ResponsiveDimensions.vs(50),
    height: ResponsiveDimensions.vs(50),
    borderRadius: ResponsiveDimensions.vs(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ResponsiveDimensions.vs(16),
    overflow: 'hidden',
  },
  notificationInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationTitle: {
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: ResponsiveDimensions.vs(4),
  },
  notificationDate: {
    fontSize: ResponsiveDimensions.vs(14),
    color: '#666',
  },
  notificationContent: {
    marginTop: ResponsiveDimensions.vs(10),
  },
  notificationMessage: {
    fontSize: ResponsiveDimensions.vs(16),
    lineHeight: ResponsiveDimensions.vs(24),
    color: '#333',
    textAlign: 'left',
  },
});

export default styles;
