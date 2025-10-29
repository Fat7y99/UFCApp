import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { StyleSheet } from 'react-native';
import { AppColors } from '@modules/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    paddingBottom: ResponsiveDimensions.vs(40),
  },
  offerCardContainer: {
    paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingTop: ResponsiveDimensions.vs(20),
  },
  offerCard: {
    borderRadius: ResponsiveDimensions.vs(16),
    padding: ResponsiveDimensions.vs(24),
    minHeight: ResponsiveDimensions.vs(200),
    justifyContent: 'center',
    // alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  offerCardOdd: {
    backgroundColor: '#0080F7',
  },
  offerCardEven: {
    backgroundColor: '#0A2277',
  },
  bgImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // bgImage: {
  //   width: '100%',
  //   height: '100%',
  // },
  offerTitle: {
    fontSize: ResponsiveDimensions.vs(48),
    fontWeight: '900',
    color: 'white',
    marginBottom: ResponsiveDimensions.vs(12),
    fontFamily: 'Poppins-Black',
  },
  offerDescription: {
    fontSize: ResponsiveDimensions.vs(14),
    color: 'white',
    // textAlign: 'center',
    lineHeight: ResponsiveDimensions.vs(20),
    fontFamily: 'Poppins-Medium',
  },
  detailsSection: {
    marginTop: ResponsiveDimensions.vs(20),
    marginHorizontal: ResponsiveDimensions.vs(20),
    padding: ResponsiveDimensions.vs(20),
    borderRadius: ResponsiveDimensions.vs(12),
  },
  detailsTitle: {
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: 'bold',
    color: '#CACACA',
    marginBottom: ResponsiveDimensions.vs(12),
  },
  detailsText: {
    fontSize: ResponsiveDimensions.vs(14),
    color: '#CACACA',
    lineHeight: ResponsiveDimensions.vs(20),
  },
  getOfferButton: {
    backgroundColor: AppColors.themeLight.primaryButtonColor,
    marginHorizontal: ResponsiveDimensions.vs(20),
    marginTop: ResponsiveDimensions.vs(20),
    paddingVertical: ResponsiveDimensions.vs(18),
    borderRadius: ResponsiveDimensions.vs(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  getOfferButtonText: {
    color: AppColors.themeLight.pressedButtonColor,
    fontSize: ResponsiveDimensions.vs(16),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default styles;
