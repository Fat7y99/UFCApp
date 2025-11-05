import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  I18nManager,
} from 'react-native';
import type { RootStackParamList } from '@src/navigation';
import { Screen } from '@modules/components';
import { translate, getCurrentLocale } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
import { OfferCard } from './components/OfferCard';
import { styles } from './styles';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppImages } from 'modules/assets/src';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

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

const Offers: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleFilterPress = () => {
    // Handle filter press
    console.log('Filter pressed');
  };

  const dateRange = formatDateRange(20, 'september', 20, 'october');

  const offers = [
    {
      id: '1',
      title: '20%',
      description: `${translate(
        `${TranslationNamespaces.HOME}:interestOnLoansStartingFrom`,
      )}\n${dateRange}`,
      isOdd: true,
    },
    {
      id: '2',
      title: `7 ${translate(`${TranslationNamespaces.HOME}:days`)}`,
      description: `${translate(
        `${TranslationNamespaces.HOME}:applicationForInstallments`,
      )}\n${dateRange}`,
      isOdd: false,
    },
    {
      id: '3',
      title: '20%',
      description: `${translate(
        `${TranslationNamespaces.HOME}:interestOnLoansStartingFrom`,
      )}\n${dateRange}`,
      isOdd: true,
    },
    {
      id: '4',
      title: `7 ${translate(`${TranslationNamespaces.HOME}:days`)}`,
      description: `${translate(
        `${TranslationNamespaces.HOME}:applicationForInstallments`,
      )}\n${dateRange}`,
      isOdd: false,
    },
  ];
  const isRTL = I18nManager.isRTL;
  return (
    <Screen style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={AppColors.themeLight.primary_1}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.navigationBar]}>
          <TouchableOpacity
            style={[
              styles.backButton,
              isRTL && { transform: [{ scaleX: -1 }] },
            ]}
            onPress={handleBackPress}
          >
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
