import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { StyleSheet, I18nManager } from 'react-native';

const isRTL = !I18nManager.isRTL;

export const styles = StyleSheet.create({
  card: {
    width: ResponsiveDimensions.percentWidth(85),
    height: ResponsiveDimensions.vs(200),
    borderRadius: ResponsiveDimensions.vs(16),
    marginBottom: ResponsiveDimensions.vs(16),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  offerCardOdd: {
    backgroundColor: '#0080F7',
  },
  offerCardEven: {
    backgroundColor: '#0A2277',
  },
  content: {
    padding: ResponsiveDimensions.vs(30),
    minHeight: ResponsiveDimensions.vs(120),
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-Black',
    color: 'white',
    fontSize: ResponsiveDimensions.vs(62),
    marginBottom: ResponsiveDimensions.vs(8),
    textTransform: 'uppercase',
    fontWeight: '900',
    textAlign: isRTL ? 'right' : 'left',
  },
  description: {
    marginTop: ResponsiveDimensions.vs(14),
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: ResponsiveDimensions.vs(16),
    textTransform: 'uppercase',
    fontWeight: '500',
    verticalAlign: 'middle',
    opacity: 0.9,
    textAlign: isRTL ? 'right' : 'left',
  },
  bgOddImage: {
    alignSelf: isRTL ? 'flex-end' : 'flex-start',
    marginBottom: ResponsiveDimensions.vs(20),
    transform: !isRTL ? [{ scaleX: -1 }] : undefined,
  },
  bgOddImage2: {
    alignSelf: isRTL ? 'flex-end' : 'flex-start',
    marginBottom: ResponsiveDimensions.vs(20),
  },
  bgEvenImage: {
    alignSelf: isRTL ? 'flex-start' : 'flex-end',
    transform: !isRTL ? [{ scaleX: -1 }] : undefined,
  },
  bgImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
