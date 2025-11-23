import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  I18nManager,
} from 'react-native';

import { AppImages } from '@modules/assets';
import { AppColors } from '@modules/theme';
import { styles } from './styles';

interface SuccessHeaderProps {
  title: string;
  handlePrimaryButtonPress?: () => void;
}

const isRTL = I18nManager.isRTL;
const SuccessHeader: React.FC<SuccessHeaderProps> = ({
  title,
  handlePrimaryButtonPress,
}) => (
  <View style={styles.container}>
    <StatusBar
      barStyle="light-content"
      backgroundColor={AppColors.themeLight.primary_1}
    />
    <View style={styles.headerContent}>
      <TouchableOpacity
        style={[styles.backButton, isRTL && { transform: [{ scaleX: -1 }] }]}
        onPress={handlePrimaryButtonPress}
      >
        <Image source={AppImages.leftArrow} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightSection} />
    </View>
  </View>
);

export default SuccessHeader;
