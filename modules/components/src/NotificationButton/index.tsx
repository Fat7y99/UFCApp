import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { AppImages } from '@modules/assets';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '@src/store';
import { AppColors } from 'modules/theme/src';
import * as React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import type { RootStackParamList } from '@src/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface NotificationButtonProps {
  onPress?: () => void;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({ onPress }) => {
  const navigation = useNavigation<NavigationProp>();
  const unreadCount = useAppSelector(state => state.notifications.unreadCount);
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('notifications');
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={AppImages.notificationIcon}
        style={styles.bellIcon}
        tintColor="white"
      />
      {unreadCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {unreadCount > 99 ? '99+' : unreadCount.toString()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bellIcon: {
    width: ResponsiveDimensions.vs(24),
    height: ResponsiveDimensions.vs(24),
  },
  badge: {
    position: 'absolute',
    top: ResponsiveDimensions.vs(2),
    right: ResponsiveDimensions.vs(2),
    backgroundColor: AppColors.themeLight.primary_1,
    borderRadius: ResponsiveDimensions.vs(10),
    minWidth: ResponsiveDimensions.vs(20),
    height: ResponsiveDimensions.vs(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  badgeText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(12),
    fontWeight: 'bold',
  },
  notificationButton: {
    position: 'relative',
    padding: ResponsiveDimensions.vs(8),
  },

  container: {
    position: 'relative',
    width: ResponsiveDimensions.vs(24),
    height: ResponsiveDimensions.vs(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotificationButton;
