import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  I18nManager,
} from 'react-native';
import type { RootStackParamList } from '@src/navigation';
import { AppImages } from '@modules/assets';
import { AppColors } from '@modules/theme';
import { styles } from './styles';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface SuccessHeaderProps {
  title: string;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const isRTL = I18nManager.isRTL;
const SuccessHeader: React.FC<SuccessHeaderProps> = ({ title }) => {
  const navigation = useNavigation<NavigationProp>();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={AppColors.themeLight.primary_1}
      />
      <View style={styles.headerContent}>
        <TouchableOpacity
          style={[styles.backButton, isRTL && { transform: [{ scaleX: -1 }] }]}
          onPress={handleBackPress}
        >
          <Image source={AppImages.leftArrow} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.rightSection} />
      </View>
    </View>
  );
};

export default SuccessHeader;
