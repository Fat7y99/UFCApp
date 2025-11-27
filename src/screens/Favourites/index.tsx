import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  I18nManager,
} from 'react-native';
import Toast from 'react-native-toast-message';

import { useAppSelector } from '@src/store';
import { Screen } from '@modules/components';
import {
  useFavouriteApi,
  useUnfavouriteApi,
  useGetFavouriteListApi,
} from '@modules/core';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
import { AppImages, FavIcon, UnFavIcon } from 'modules/assets/src';

const isRTL = I18nManager.isRTL;

interface ServiceType {
  id: number;
  title: string;
  subtitle?: string;
  category: 'SME' | 'REAL_ESTATE' | 'PERSONAL';
}

const Favourites: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user } = useAppSelector(state => state.user);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(
    null,
  );

  const goSignUpScreen = () => {
    navigation.navigate('signup');
  };

  // Track favourites per service ID
  const [favouriteServiceIds, setFavouriteServiceIds] = useState<Set<number>>(
    new Set(),
  );

  // Load favourite list
  const { data: favouriteList } = useGetFavouriteListApi(
    {
      body: {
        pageNumber: '1',
        pageSize: '100',
      },
    },
    {
      enabled: !!user, // Only fetch if user is logged in
    },
  );

  // Update favourite service IDs when list loads
  useEffect(() => {
    if (favouriteList?.list) {
      const favouriteIds = new Set<number>();
      favouriteList.list.forEach(item => {
        if (item.service?.id) {
          favouriteIds.add(item.service.id);
        }
      });
      setFavouriteServiceIds(favouriteIds);
    }
  }, [favouriteList]);

  // Favourite mutation
  const { mutate: favourite, isPending: isFavouriting } = useFavouriteApi({
    onSuccess: (_, variables) => {
      setFavouriteServiceIds(prev => new Set(prev).add(variables.pathVar!));
      Toast.show({
        type: 'success',
        text1: translate(
          `${TranslationNamespaces.COMMON}:serviceFavouritedSuccessfully`,
        ),
      });
    },
    onError: error => {
      Toast.show({
        type: 'fail',
        text1:
          error.errorMessage ??
          translate(`${TranslationNamespaces.COMMON}:errorWhileAction`, {
            action: 'favouriting',
          }),
      });
    },
  });

  // Unfavourite mutation
  const { mutate: unfavourite, isPending: isUnfavouriting } = useUnfavouriteApi(
    {
      onSuccess: (_, variables) => {
        setFavouriteServiceIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(variables.pathVar!);
          return newSet;
        });
        Toast.show({
          type: 'success',
          text1: translate(
            `${TranslationNamespaces.COMMON}:serviceUnfavouritedSuccessfully`,
          ),
        });
      },
      onError: error => {
        Toast.show({
          type: 'fail',
          text1:
            error.errorMessage ??
            translate(`${TranslationNamespaces.COMMON}:errorWhileAction`, {
              action: 'unfavouriting',
            }),
        });
      },
    },
  );

  // Handle favourite/unfavourite
  const handleFavouriteToggle = (serviceId: number) => {
    if (!user) {
      Toast.show({
        type: 'fail',
        text1: translate(`${TranslationNamespaces.COMMON}:unauthorized`),
      });
      return;
    }

    const isFavourite = favouriteServiceIds.has(serviceId);
    if (isFavourite) {
      unfavourite({ pathVar: serviceId });
    } else {
      favourite({ pathVar: serviceId });
    }
  };

  // Handle navigation based on service category
  const handleNext = () => {
    if (!selectedService) return;

    if (!user) {
      goSignUpScreen();
      return;
    }

    if (selectedService.category === 'SME') {
      navigation.navigate('Home', {
        screen: 'smeStep1',
        params: {
          serviceId: selectedService.id,
          title: selectedService.title,
        },
      });
    } else if (selectedService.category === 'REAL_ESTATE') {
      navigation.navigate('Home', {
        screen: 'realEstateStep1',
        params: {
          serviceId: selectedService.id,
          title: selectedService.title,
        },
      });
    } else if (selectedService.category === 'PERSONAL') {
      navigation.navigate('Home', {
        screen: 'personalStep1',
        params: {
          serviceId: selectedService.id,
          title: selectedService.title,
        },
      });
    }
  };

  // All services combined
  const allServices: ServiceType[] = useMemo(
    () => [
      // SME Services (1-6)
      {
        id: 1,
        title: translate(`${TranslationNamespaces.FINANCING}:invoice`),
        category: 'SME',
      },
      {
        id: 2,
        title: translate(`${TranslationNamespaces.FINANCING}:project`),
        category: 'SME',
      },
      {
        id: 3,
        title: translate(`${TranslationNamespaces.FINANCING}:pos`),
        category: 'SME',
      },
      {
        id: 4,
        title: translate(`${TranslationNamespaces.FINANCING}:bankGuarantee`),
        category: 'SME',
      },
      {
        id: 5,
        title: translate(`${TranslationNamespaces.FINANCING}:workingCapital`),
        category: 'SME',
      },
      {
        id: 6,
        title: translate(
          `${TranslationNamespaces.FINANCING}:smeSecuredByProperty`,
        ),
        category: 'SME',
      },
      // Real Estate Services (7-11)
      {
        id: 7,
        title: translate(`${TranslationNamespaces.FINANCING}:purchase`),
        category: 'REAL_ESTATE',
      },
      {
        id: 8,
        title: translate(`${TranslationNamespaces.FINANCING}:mortgage`),
        category: 'REAL_ESTATE',
      },
      {
        id: 9,
        title: translate(`${TranslationNamespaces.FINANCING}:refinance`),
        category: 'REAL_ESTATE',
      },
      {
        id: 10,
        title: translate(`${TranslationNamespaces.FINANCING}:selfBuild`),
        category: 'REAL_ESTATE',
      },
      {
        id: 11,
        title: translate(`${TranslationNamespaces.FINANCING}:wealthFinancing`),
        subtitle: translate(
          `${TranslationNamespaces.FINANCING}:commercialBuildings`,
        ),
        category: 'REAL_ESTATE',
      },
      {
        id: 12,
        title: translate(
          `${TranslationNamespaces.FINANCING}:personalFinancing`,
        ),
        category: 'PERSONAL',
      },
    ],
    [],
  );

  // Filter services to show only favourites
  const favouriteServices = useMemo(
    () => allServices.filter(service => favouriteServiceIds.has(service.id)),
    [allServices, favouriteServiceIds],
  );

  // Clear selected service if it's no longer a favourite
  useEffect(() => {
    if (selectedService && !favouriteServiceIds.has(selectedService.id)) {
      setSelectedService(null);
    }
  }, [favouriteServiceIds, selectedService]);

  return (
    <Screen style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={AppImages.leftArrow}
            style={[styles.backIcon, isRTL && { transform: [{ scaleX: -1 }] }]}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {translate(`${TranslationNamespaces.HOME}:favorites`)}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Favourite Services */}
        <View style={styles.buttonsContainer}>
          {favouriteServices.length > 0 ? (
            favouriteServices.map((service: ServiceType) => (
              <TouchableOpacity
                key={service.id}
                style={[
                  styles.serviceButton,
                  service.id === 11 && styles.fullWidthButton,
                  selectedService?.id === service.id && styles.activeButton,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                ]}
                onPress={() => {
                  setSelectedService(service);
                }}
              >
                <View style={styles.buttonContent}>
                  <Text
                    style={[
                      styles.serviceButtonText,
                      selectedService?.id === service.id &&
                        styles.activeButtonText,
                    ]}
                  >
                    {service.title}
                  </Text>
                  {service.subtitle && (
                    <Text
                      style={[
                        styles.serviceButtonSubtext,
                        selectedService?.id === service.id &&
                          styles.activeButtonText,
                      ]}
                    >
                      {service.subtitle}
                    </Text>
                  )}
                </View>
                {/* Favourite/Unfavourite icon */}
                <TouchableOpacity
                  style={{ paddingStart: ResponsiveDimensions.vs(10) }}
                  onPress={() => handleFavouriteToggle(service.id)}
                  disabled={isFavouriting || isUnfavouriting}
                >
                  {favouriteServiceIds.has(service.id) ? (
                    <FavIcon />
                  ) : (
                    <UnFavIcon />
                  )}
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                {translate(`${TranslationNamespaces.COMMON}:noDataAvailable`, {
                  data: 'favorites',
                })}
              </Text>
            </View>
          )}
        </View>

        {/* Next Button */}
        {selectedService && (
          <TouchableOpacity
            style={[
              styles.nextButton,
              !selectedService && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={!selectedService}
          >
            <Text style={styles.nextButtonText}>
              {user
                ? translate(`${TranslationNamespaces.FINANCING}:next`)
                : translate(`${TranslationNamespaces.HOME}:signUpToApply`)}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  activeButtonText: {
    color: AppColors.themeLight.pressedButtonColor,
  },
  activeButton: {
    backgroundColor: AppColors.themeLight.primaryButtonColor,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ResponsiveDimensions.vs(16),
    backgroundColor: AppColors.themeLight.primary_1,
    paddingTop: ResponsiveDimensions.vs(50),
    paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingBottom: ResponsiveDimensions.vs(20),
    borderBottomEndRadius: ResponsiveDimensions.vs(12),
    borderBottomStartRadius: ResponsiveDimensions.vs(12),
  },
  backButton: {
    padding: ResponsiveDimensions.vs(8),
  },
  backIcon: {
    width: ResponsiveDimensions.vs(16),
    height: ResponsiveDimensions.vs(16),
    tintColor: 'white',
  },
  headerTitle: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(20),
    fontWeight: 'bold',
  },
  headerSpacer: {
    width: ResponsiveDimensions.vs(40),
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: ResponsiveDimensions.vs(20),
    paddingBottom: ResponsiveDimensions.vs(100),
  },
  buttonsContainer: {
    gap: ResponsiveDimensions.vs(16),
    marginBottom: ResponsiveDimensions.vs(40),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceButton: {
    backgroundColor: AppColors.themeLight.primary_1,
    borderRadius: ResponsiveDimensions.vs(12),
    paddingVertical: ResponsiveDimensions.vs(16),
    paddingHorizontal: ResponsiveDimensions.vs(20),
    alignItems: 'center',
    width: '48%',
  },
  buttonContent: {
    flex: 1,
    alignItems: 'center',
  },
  fullWidthButton: {
    width: '100%',
  },
  serviceButtonText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(16),
    fontWeight: '600',
  },
  serviceButtonSubtext: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(12),
    fontWeight: '400',
    marginTop: ResponsiveDimensions.vs(4),
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    borderRadius: ResponsiveDimensions.vs(12),
    paddingVertical: ResponsiveDimensions.vs(18),
    alignItems: 'center',
    marginTop: ResponsiveDimensions.vs(20),
  },
  nextButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  nextButtonText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: 'bold',
  },
  noResultsContainer: {
    width: '100%',
    paddingVertical: ResponsiveDimensions.vs(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    color: '#666',
    fontSize: ResponsiveDimensions.vs(16),
    textAlign: 'center',
  },
});

export default Favourites;
