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
    flex: 1,
    color: 'white',
    fontSize: ResponsiveDimensions.vs(20),
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingTop: ResponsiveDimensions.vs(20),
    paddingBottom: ResponsiveDimensions.vs(40),
  },
  contentCard: {
    backgroundColor: 'white',
  },
  questionText: {
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: '600',
    color: '#333',
    marginBottom: ResponsiveDimensions.vs(16),
    lineHeight: ResponsiveDimensions.vs(26),
  },
  answerText: {
    fontSize: ResponsiveDimensions.vs(16),
    color: '#666',
    lineHeight: ResponsiveDimensions.vs(24),
  },
});

export default styles;
