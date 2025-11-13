import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  I18nManager,
} from 'react-native';
import Toast from 'react-native-toast-message';

import type { RootStackParamList } from '@src/navigation';
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
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  AppImages,
  FavIcon,
  SMEStep1Logo,
  UnFavIcon,
} from 'modules/assets/src';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FinancingType {
  id: number;
  title: string;
}
const isRTL = I18nManager.isRTL;

const SMEFinancing: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedService, setSelectedService] = useState<FinancingType>({
    id: 1,
    title: translate(`${TranslationNamespaces.FINANCING}:invoice`),
  });
  const { user } = useAppSelector(state => state.user);
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
  const services: FinancingType[] = [
    {
      id: 1,
      title: translate(`${TranslationNamespaces.FINANCING}:invoice`),
    },
    {
      id: 2,
      title: translate(`${TranslationNamespaces.FINANCING}:project`),
    },
    {
      id: 3,
      title: translate(`${TranslationNamespaces.FINANCING}:pos`),
    },
    {
      id: 4,
      title: translate(`${TranslationNamespaces.FINANCING}:bankGuarantee`),
    },
    {
      id: 5,
      title: translate(`${TranslationNamespaces.FINANCING}:workingCapital`),
    },
    {
      id: 6,
      title: translate(
        `${TranslationNamespaces.FINANCING}:smeSecuredByProperty`,
      ),
    },
  ];
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
          {translate(`${TranslationNamespaces.FINANCING}:smeFinancing`)}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Icon */}
        <View style={styles.iconContainer}>
          <SMEStep1Logo />
        </View>

        {/* Select Financing Type Label */}
        <Text style={styles.sectionLabel}>
          {translate(`${TranslationNamespaces.FINANCING}:selectFinancingType`)}
        </Text>

        {/* Financing Type Buttons */}
        <View style={styles.buttonsContainer}>
          {services.map((type: FinancingType) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.financingButton,
                selectedService?.id === type.id && styles.activeButton,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                },
              ]}
              onPress={() => {
                setSelectedService(type);
              }}
            >
              <Text
                style={[
                  styles.financingButtonText,
                  selectedService?.id === type.id && styles.activeButtonText,
                ]}
              >
                {type.title}
              </Text>
              {/*add favicon and unfavicon icons*/}
              <TouchableOpacity
                style={{ paddingEnd: ResponsiveDimensions.vs(10) }}
                onPress={() => handleFavouriteToggle(type.id)}
                disabled={isFavouriting || isUnfavouriting}
              >
                {favouriteServiceIds.has(type.id) ? <FavIcon /> : <UnFavIcon />}
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={
            user
              ? () => {
                  navigation.navigate('smeStep1', {
                    serviceId: selectedService?.id,
                    title: selectedService?.title,
                  });
                }
              : goSignUpScreen
          }
        >
          <Text style={styles.nextButtonText}>
            {user
              ? translate(`${TranslationNamespaces.FINANCING}:next`)
              : translate(`${TranslationNamespaces.HOME}:signUpToApply`)}
          </Text>
        </TouchableOpacity>
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
  iconContainer: {
    alignItems: 'center',
    marginBottom: ResponsiveDimensions.vs(40),
    flexDirection: 'row',
    justifyContent: 'center',
    gap: ResponsiveDimensions.vs(20),
  },
  buildingIcon: {
    width: ResponsiveDimensions.vs(80),
    height: ResponsiveDimensions.vs(80),
    backgroundColor: AppColors.themeLight.primary_1,
    borderRadius: ResponsiveDimensions.vs(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buildingWindows: {
    gap: ResponsiveDimensions.vs(4),
  },
  windowRow: {
    flexDirection: 'row',
    gap: ResponsiveDimensions.vs(4),
  },
  window: {
    width: ResponsiveDimensions.vs(12),
    height: ResponsiveDimensions.vs(12),
    backgroundColor: 'white',
    borderRadius: ResponsiveDimensions.vs(6),
  },
  briefcaseIcon: {
    width: ResponsiveDimensions.vs(60),
    height: ResponsiveDimensions.vs(60),
    backgroundColor: '#4CAF50',
    borderRadius: ResponsiveDimensions.vs(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  briefcaseEmoji: {
    fontSize: ResponsiveDimensions.vs(30),
  },
  sectionLabel: {
    color: '#666',
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: '600',
    marginBottom: ResponsiveDimensions.vs(24),
    textAlign: 'left',
  },
  buttonsContainer: {
    gap: ResponsiveDimensions.vs(16),
    marginBottom: ResponsiveDimensions.vs(40),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  financingButton: {
    backgroundColor: AppColors.themeLight.primary_1,
    borderRadius: ResponsiveDimensions.vs(12),
    paddingVertical: ResponsiveDimensions.vs(16),
    paddingStart: ResponsiveDimensions.vs(20),
    alignItems: 'center',
    gap: ResponsiveDimensions.vs(10),
  },
  financingButtonText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(16),
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    borderRadius: ResponsiveDimensions.vs(12),
    paddingVertical: ResponsiveDimensions.vs(18),
    alignItems: 'center',
    marginTop: ResponsiveDimensions.vs(20),
  },
  nextButtonText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: 'bold',
  },
});

export default SMEFinancing;
