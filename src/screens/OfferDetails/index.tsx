import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import type { RootStackScreenProps } from '@src/navigation';
import { AppImages } from '@modules/assets';
import { Screen } from '@modules/components';
import { AppColors } from '@modules/theme';
import styles from './styles';

export default React.memo((props: RootStackScreenProps<'offerDetails'>) => {
  const { route } = props;
  const navigation = useNavigation();
  const { offer } = route.params;

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
          <Image source={AppImages.leftArrow} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{offer.title} Rate</Text>
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
                  offer.isOdd ? AppImages.bgOddFrame : AppImages.bgEvenFrame
                }
              />
            </View>
            <Text style={styles.offerTitle}>{offer.title}</Text>
            <Text style={styles.offerDescription}>{offer.description}</Text>
          </View>
        </View>

        {/* Offer Details Section */}
        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>Offer Details</Text>
          <Text style={styles.detailsText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>

        {/* Get Offer Button */}
        <TouchableOpacity
          style={styles.getOfferButton}
          onPress={handleGetOfferPress}
        >
          <Text style={styles.getOfferButtonText}>GET OFFER NOW</Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
});
