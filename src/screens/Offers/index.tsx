import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import type { RootStackParamList } from '@src/navigation';
import { Screen } from '@modules/components';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
import { OfferCard } from './components/OfferCard';
import { styles } from './styles';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppImages } from 'modules/assets/src';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Offers: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleFilterPress = () => {
    // Handle filter press
    console.log('Filter pressed');
  };

  const offers = [
    {
      id: '1',
      title: '20%',
      description: 'Interest on loans Starting from\n20th Sep til 20th Oct',
      isOdd: true,
    },
    {
      id: '2',
      title: '7 DAYS',
      description: 'Application for installments\n20th Sep til 20th Oct',
      isOdd: false,
    },
    {
      id: '3',
      title: '20%',
      description: 'Interest on loans Starting from\n20th Sep til 20th Oct',
      isOdd: true,
    },
    {
      id: '4',
      title: '7 DAYS',
      description: 'Application for installments\n20th Sep til 20th Oct',
      isOdd: false,
    },
  ];

  return (
    <Screen style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={AppColors.themeLight.primary_1}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.navigationBar}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Image source={AppImages.leftArrow} />
          </TouchableOpacity>
          <Text style={styles.title}>
            {translate(`${TranslationNamespaces.HOME}:offers`)}
          </Text>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={handleFilterPress}
          >
            <Text style={styles.filterIcon}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {offers.map(offer => (
          <OfferCard
            key={offer.id}
            title={offer.title}
            description={offer.description}
            isOdd={offer.isOdd}
            onPress={() => navigation.navigate('offerDetails', { offer })}
          />
        ))}
      </ScrollView>
    </Screen>
  );
};

export default Offers;
