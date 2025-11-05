import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { StyleSheet } from 'react-native';
import { AppColors } from '@modules/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.themeLight.primary_1,
    borderBottomLeftRadius: ResponsiveDimensions.vs(20),
    borderBottomRightRadius: ResponsiveDimensions.vs(20),
    paddingTop: ResponsiveDimensions.vs(10),
    paddingBottom: ResponsiveDimensions.vs(16),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ResponsiveDimensions.vs(16),
    paddingTop: ResponsiveDimensions.vs(10),
  },
  backButton: {
    padding: ResponsiveDimensions.vs(8),
  },
  title: {
    flex: 1,
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: '600',
    color: AppColors.themeLight.primaryButtonColor,
    marginLeft: ResponsiveDimensions.vs(16),
    textAlign: 'left',
  },
  rightSection: {
    width: ResponsiveDimensions.vs(40),
  },
});
