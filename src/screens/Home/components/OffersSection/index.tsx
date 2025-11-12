import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  I18nManager,
} from 'react-native';
import type { RootStackParamList } from '@src/navigation';
import { translate, getCurrentLocale } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { styles } from './styles';
import type { OffersSectionProps } from './types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppImages } from 'modules/assets/src';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const isRTL = I18nManager.isRTL;
const formatDateRange = (
  startDay: number,
  startMonth: string,
  endDay: number,
  endMonth: string,
): string => {
  const locale = getCurrentLocale();
  const isArabic = locale === 'ar';

  const monthMap: Record<string, string> = {
    january: 'january',
    february: 'february',
    march: 'march',
    april: 'april',
    may: 'may',
    june: 'june',
    july: 'july',
    august: 'august',
    september: 'september',
    october: 'october',
    november: 'november',
    december: 'december',
  };

  const startMonthKey =
    monthMap[startMonth.toLowerCase()] || startMonth.toLowerCase();
  const endMonthKey =
    monthMap[endMonth.toLowerCase()] || endMonth.toLowerCase();

  if (isArabic) {
    return `${startDay} ${translate(
      `${TranslationNamespaces.HOME}:${startMonthKey}` as any,
    )} ${translate(`${TranslationNamespaces.HOME}:until`)} ${endDay} ${translate(
      `${TranslationNamespaces.HOME}:${endMonthKey}` as any,
    )}`;
  }

  const startMonthShort = translate(
    `${TranslationNamespaces.HOME}:${startMonthKey}` as any,
  );
  const endMonthShort = translate(
    `${TranslationNamespaces.HOME}:${endMonthKey}` as any,
  );
  const untilText = translate(`${TranslationNamespaces.HOME}:until`);

  return `${startDay}th ${startMonthShort} ${untilText} ${endDay}th ${endMonthShort}`;
};

const OffersSection: React.FC<OffersSectionProps> = ({
  offers = [
    {
      id: '2',
      title: '20%',
      description: `${translate(
        `${TranslationNamespaces.HOME}:interestOnLoansStartingFrom`,
      )}\n${formatDateRange(20, 'september', 20, 'october')}`,
    },
    {
      id: '1',
      title: `7 ${translate(`${TranslationNamespaces.HOME}:days`)}`,
      description: `${translate(
        `${TranslationNamespaces.HOME}:applicationForInstallments`,
      )}\n${formatDateRange(20, 'september', 20, 'october')}`,
    },

    {
      id: '3',
      title: '30%',
      description: `${translate(
        `${TranslationNamespaces.HOME}:interestOnLoansStartingFrom`,
      )}\n${formatDateRange(20, 'september', 20, 'october')}`,
    },
  ],
}) => {
  const navigation = useNavigation<NavigationProp>();

  const handleViewAllPress = () => {
    navigation.navigate('offers');
  };

  const handleOfferPress = (offer: any) => {
    navigation.navigate('offerDetails', { offer });
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
            <TouchableOpacity onPress={handleOfferPress}>
              <View style={[styles.offerCard, cardStyle]}>
                {/* Frame Image */}
                <Image
                  source={isOdd ? AppImages.oddFrame : AppImages.evenFrame}
                  style={[
                    isOdd ? styles.oddFrame : styles.evenFrame,
                    isRTL && { transform: [{ scaleX: -1 }] },
                  ]}
                  resizeMode="contain"
                />

                <Text style={styles.offerTitle}>{offer.title}</Text>
                <Text style={styles.offerDescription}>{offer.description}</Text>
              </View>
            </TouchableOpacity>
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
