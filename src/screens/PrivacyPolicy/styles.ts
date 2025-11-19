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
    tintColor: '#66B2FF',
  },
  headerTitle: {
    flex: 1,
    color: AppColors.themeLight.primaryButtonColor,
    fontSize: ResponsiveDimensions.vs(20),
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: ResponsiveDimensions.vs(32),
    paddingTop: ResponsiveDimensions.vs(20),
    paddingBottom: ResponsiveDimensions.vs(40),
  },
  contentCard: {
    backgroundColor: 'white',
  },
  headingText: {
    fontSize: ResponsiveDimensions.vs(16),
    fontWeight: '800',
    color: '#B8B8B8',
    marginBottom: ResponsiveDimensions.vs(16),
    marginTop: ResponsiveDimensions.vs(8),
    fontFamily: 'Roboto',
  },
  bodyText: {
    fontSize: ResponsiveDimensions.vs(16),
    color: '#CACACA',
    lineHeight: ResponsiveDimensions.vs(24),
    marginBottom: ResponsiveDimensions.vs(16),
    paddingStart: ResponsiveDimensions.vs(16),
  },
  bulletList: {
    marginBottom: ResponsiveDimensions.vs(16),
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: ResponsiveDimensions.vs(16),
    color: '#CACACA',
    lineHeight: ResponsiveDimensions.vs(24),
  },
  legalSection: {
    marginTop: ResponsiveDimensions.vs(32),
    paddingTop: ResponsiveDimensions.vs(24),
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  legalTitle: {
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: ResponsiveDimensions.vs(12),
  },
  legalText: {
    fontSize: ResponsiveDimensions.vs(16),
    color: '#666',
    lineHeight: ResponsiveDimensions.vs(24),
    marginBottom: ResponsiveDimensions.vs(8),
  },
  lastUpdatedText: {
    fontSize: ResponsiveDimensions.vs(14),
    color: '#999',
    marginTop: ResponsiveDimensions.vs(8),
  },
});

export default styles;
