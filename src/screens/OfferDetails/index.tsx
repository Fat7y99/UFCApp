import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  I18nManager,
} from 'react-native';
import type { RootStackScreenProps } from '@src/navigation';
import { AppImages } from '@modules/assets';
import { Screen } from '@modules/components';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
import styles from './styles';

export default React.memo((props: RootStackScreenProps<'offerDetails'>) => {
  const { route } = props;
  const navigation = useNavigation();
  const { offer } = route.params;
  const isRTL = !I18nManager.isRTL;

  const handleGetOfferPress = () => {
    navigation.navigate('applyToOffer', { offer });
  };

  return (
    <Screen
      style={styles.container}
      showNavigationBar={false}
      statusBarColor={AppColors.themeLight.primary_1}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={AppImages.leftArrow}
            style={[
              styles.backIcon,
              { transform: !isRTL ? [{ scaleX: -1 }] : undefined },
            ]}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {offer.title} {translate(`${TranslationNamespaces.HOME}:rate`)}
        </Text>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Offer Card */}
        <View style={styles.offerCardContainer}>
          <View
            style={[
              styles.offerCard,
              offer.isOdd ? styles.offerCardOdd : styles.offerCardEven,
            ]}
          >
            <View style={styles.bgImageContainer}>
              <Image
                resizeMode="contain"
                source={
                  offer.isOdd || isRTL
                    ? AppImages.bgOddFrame
                    : AppImages.bgEvenFrame
                }
                style={
                  offer.isOdd || isRTL ? styles.bgOddImage : styles.bgEvenImage
                }
              />
            </View>
            <Text style={styles.offerTitle}>{offer.title}</Text>
            <Text style={styles.offerDescription}>{offer.description}</Text>
          </View>
        </View>

        {/* Offer Details Section */}
        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>
            {translate(`${TranslationNamespaces.HOME}:offerDetails`)}
          </Text>
          <Text style={styles.detailsText}>
            {translate(`${TranslationNamespaces.HOME}:offerDetailsDescription`)}
          </Text>
        </View>

        {/* Get Offer Button */}
        <TouchableOpacity
          style={styles.getOfferButton}
          onPress={handleGetOfferPress}
        >
          <Text style={styles.getOfferButtonText}>
            {translate(`${TranslationNamespaces.HOME}:getOfferNow`)}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
});
