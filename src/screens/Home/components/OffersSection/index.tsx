import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import type { RootStackParamList } from '@src/navigation';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { styles } from './styles';
import type { OffersSectionProps } from './types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppImages } from 'modules/assets/src';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const OffersSection: React.FC<OffersSectionProps> = ({
  offers = [
    {
      id: '2',
      title: '20%',
      description: 'Interest on loans Starting from',
    },
    {
      id: '1',
      title: '7 DAYS',
      description: 'Application for installments',
    },

    {
      id: '3',
      title: '30%',
      description: 'Interest on loans Starting from',
    },
  ],
}) => {
  const navigation = useNavigation<NavigationProp>();

  const handleViewAllPress = () => {
    navigation.navigate('offers');
  };

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {translate(`${TranslationNamespaces.HOME}:offers`)}
        </Text>
        <TouchableOpacity onPress={handleViewAllPress}>
          <Text style={styles.viewAllText}>
            {translate(`${TranslationNamespaces.HOME}:viewAll`)}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Offers Cards */}
      <FlatList
        data={offers}
        renderItem={({ item: offer, index }) => {
          const isOdd = index % 2 === 0; // 0-based index, so even index = odd position
          const cardStyle = isOdd ? styles.offerCardOdd : styles.offerCardEven;

          return (
            <View style={[styles.offerCard, cardStyle]}>
              {/* Frame Image */}
              <Image
                source={isOdd ? AppImages.oddFrame : AppImages.evenFrame}
                style={isOdd ? styles.oddFrame : styles.evenFrame}
                resizeMode="contain"
              />

              <Text style={styles.offerTitle}>{offer.title}</Text>
              <Text style={styles.offerDescription}>{offer.description}</Text>
            </View>
          );
        }}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.offersContainer}
      />
    </View>
  );
};

export default OffersSection;
