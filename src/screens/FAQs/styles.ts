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
  listContainer: {
    backgroundColor: 'white',
    marginTop: ResponsiveDimensions.vs(20),
    marginHorizontal: ResponsiveDimensions.vs(20),
    borderRadius: ResponsiveDimensions.vs(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  questionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: ResponsiveDimensions.vs(16),
    paddingHorizontal: ResponsiveDimensions.vs(16),
  },
  questionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  questionText: {
    fontSize: ResponsiveDimensions.vs(16),
    color: '#333',
    flex: 1,
  },
  chevronIcon: {
    width: ResponsiveDimensions.vs(20),
    height: ResponsiveDimensions.vs(20),
    tintColor: '#999',
  },
});

export default styles;
