import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ResponsiveDimensions.vs(16),
    paddingHorizontal: ResponsiveDimensions.vs(20),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
  notificationItemContent: {
    flex: 1,
    marginRight: ResponsiveDimensions.vs(12),
  },
  notificationTitle: {
    fontSize: ResponsiveDimensions.vs(16),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: ResponsiveDimensions.vs(4),
  },
  notificationMessage: {
    fontSize: ResponsiveDimensions.vs(14),
    color: '#666',
    lineHeight: ResponsiveDimensions.vs(20),
  },
  notificationDate: {
    fontSize: ResponsiveDimensions.vs(12),
    color: '#999',
    textAlign: 'right',
    paddingStart: ResponsiveDimensions.vs(10),
  },
});

export default styles;
