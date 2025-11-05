import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { StyleSheet } from 'react-native';
import { AppColors } from '@modules/theme';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ResponsiveDimensions.vs(20),
    marginBottom: ResponsiveDimensions.vs(32),
  },
  sectionHeader: {
    marginBottom: ResponsiveDimensions.vs(20),
  },
  sectionTitle: {
    color: '#666',
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: '600',
    textAlign: 'left',
  },
  financingContainer: {
    gap: ResponsiveDimensions.vs(12),
  },
  financingCard: {
    backgroundColor: AppColors.themeLight.primary_1,
    borderRadius: ResponsiveDimensions.vs(12),
    padding: ResponsiveDimensions.vs(20),
    minHeight: ResponsiveDimensions.vs(70),
  },
  financingCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  financingIcon: {
    fontSize: ResponsiveDimensions.vs(24),
    marginStart: ResponsiveDimensions.vs(16),
    marginEnd: 0,
  },
  financingTitle: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: '600',
    flex: 1,
    textAlign: 'left',
    marginStart: ResponsiveDimensions.vs(16),
    marginEnd: ResponsiveDimensions.vs(16),
  },
  arrowIcon: {
    width: ResponsiveDimensions.vs(16),
    height: ResponsiveDimensions.vs(16),
  },
});
