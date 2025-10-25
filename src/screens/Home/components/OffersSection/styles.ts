import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { StyleSheet } from 'react-native';
import { AppColors } from '@modules/theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: ResponsiveDimensions.vs(32),
  },
  sectionHeader: {
    paddingHorizontal: ResponsiveDimensions.vs(20),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ResponsiveDimensions.vs(20),
  },
  viewAllText: {
    color: AppColors.themeLight.primary_1,
    fontSize: ResponsiveDimensions.vs(16),
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: AppColors.themeLight.primary_1,
    fontSize: ResponsiveDimensions.vs(20),
    fontWeight: 'bold',
  },
  offersContainer: {
    paddingHorizontal: ResponsiveDimensions.vs(10),

    flexDirection: 'row',
    gap: ResponsiveDimensions.vs(16),
  },
  offerCard: {
    width: ResponsiveDimensions.vs(180),
    backgroundColor: AppColors.themeLight.primary_1,
    borderRadius: ResponsiveDimensions.vs(16),
    padding: ResponsiveDimensions.vs(20),
    minHeight: ResponsiveDimensions.vs(140),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  offerCardOdd: {
    backgroundColor: '#0080F7',
  },
  offerCardEven: {
    backgroundColor: '#0A2277',
  },
  oddFrame: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  evenFrame: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  offerCardContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerTitle: {
    fontFamily: 'Poppins-Black',
    color: 'white',
    fontSize: ResponsiveDimensions.vs(33),
    fontWeight: '900',
    marginBottom: ResponsiveDimensions.vs(12),
  },
  offerDescription: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: ResponsiveDimensions.vs(12),
    fontWeight: '500',
    lineHeight: ResponsiveDimensions.vs(20),
    paddingEnd: ResponsiveDimensions.vs(20),
  },
});
