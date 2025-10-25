import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import type { OfferCardProps } from './types';
import { AppImages } from 'modules/assets/src';

const OfferCard: React.FC<OfferCardProps> = ({
  title,
  description,
  isOdd,
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.card, isOdd ? styles.offerCardOdd : styles.offerCardEven]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.content}>
      <View style={styles.bgImageContainer}>
        <Image
          resizeMode="contain"
          source={isOdd ? AppImages.bgOddFrame : AppImages.bgEvenFrame}
          style={[isOdd ? styles.bgOddImage : styles.bgEvenImage]}
        />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  </TouchableOpacity>
);

export { OfferCard };
