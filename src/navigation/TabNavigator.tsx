import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Image, Text, View } from 'react-native';
import type { RootStackParamList } from '@src/navigation';
import {
  Home,
  Settings,
  Notifications,
  NotificationDetails,
  SMEFinancing,
  SMEStep1,
  SMEStep2,
  RealEstateFinancing,
  RealEstateStep1,
  RealEstateStep2,
  RealEstateStep3,
  PersonalStep1,
  PersonalStep2,
  PersonalStep3,
  Offers,
  OfferDetails,
  ApplyToOffer,
  Success,
  Help,
  FAQs,
  FAQDetails,
  ContactUs,
  ChangePassword,
  EditProfile,
  PrivacyPolicy,
  TermsAndConditions,
} from '@src/screens';
import Favourites from '@src/screens/Favourites';
import Search from '@src/screens/Search';
import SignUpSuccess from '@src/screens/SignUpSuccess';
import {
  AppImages,
  OutlinedFavIcon,
  OutlinedHomeIcon,
  OutlinedSettingsIcon,
  OutlinedSearchIcon,
} from '@modules/assets';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
import type { ImageSourcePropType } from 'react-native';

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
  Settings: undefined;
};

interface TabItemProps {
  focused: boolean;
  label: string;
  outlinedIcon: React.ComponentType<{ fill?: string; stroke?: string }>;
  filledIcon?: ImageSourcePropType;
  filledIconSize?: number;
  filledIconComponent?: React.ComponentType<{ fill?: string; stroke?: string }>;
}

const TabItem: React.FC<TabItemProps> = ({
  focused,
  label,
  outlinedIcon: OutlinedIcon,
  filledIcon,
  filledIconSize = 24,
  filledIconComponent: FilledIconComponent,
}) => {
  if (focused) {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: AppColors.themeLight.pressedButtonColor,
          width: ResponsiveDimensions.vs(100),
          height: ResponsiveDimensions.vs(45),
          borderRadius: ResponsiveDimensions.vs(20),
          alignItems: 'center',
          justifyContent: 'center',
          gap: ResponsiveDimensions.vs(8),
          paddingHorizontal: ResponsiveDimensions.vs(16),
        }}
      >
        {filledIcon ? (
          <Image
            source={filledIcon}
            style={{
              width: ResponsiveDimensions.vs(filledIconSize),
              height: ResponsiveDimensions.vs(filledIconSize),
            }}
            resizeMode="stretch"
          />
        ) : FilledIconComponent ? (
          <FilledIconComponent
            stroke={AppColors.themeLight.pressedButtonColor}
            fill="white"
          />
        ) : (
          <OutlinedIcon
            stroke={AppColors.themeLight.pressedButtonColor}
            fill="white"
          />
        )}
        <Text
          style={{
            fontSize: ResponsiveDimensions.vs(12),
            fontWeight: '400',
            color: 'white',
            fontFamily: 'Poppins',
          }}
        >
          {label}
        </Text>
      </View>
    );
  }

  return <OutlinedIcon fill="none" />;
};

// Create a Stack Navigator for all main screens
const mainStack = createNativeStackNavigator<RootStackParamList>();

const MainStackNavigator: React.FC = () => (
  <mainStack.Navigator screenOptions={{ headerShown: false }}>
    <mainStack.Screen name="home" component={Home} />
    <mainStack.Screen name="settings" component={Settings} />
    <mainStack.Screen name="notifications" component={Notifications} />
    <mainStack.Screen
      name="notificationDetails"
      component={NotificationDetails}
    />
    <mainStack.Screen name="help" component={Help} />
    <mainStack.Screen name="faqs" component={FAQs} />
    <mainStack.Screen name="faqDetails" component={FAQDetails} />
    <mainStack.Screen name="contactUs" component={ContactUs} />
    <mainStack.Screen name="changePassword" component={ChangePassword} />
    <mainStack.Screen name="editProfile" component={EditProfile} />
    <mainStack.Screen name="privacyPolicy" component={PrivacyPolicy} />
    <mainStack.Screen
      name="termsAndConditions"
      component={TermsAndConditions}
    />
    <mainStack.Screen name="smeFinancing" component={SMEFinancing} />
    <mainStack.Screen name="smeStep1" component={SMEStep1} />
    <mainStack.Screen name="smeStep2" component={SMEStep2} />
    <mainStack.Screen
      name="realEstateFinancing"
      component={RealEstateFinancing}
    />
    <mainStack.Screen name="realEstateStep1" component={RealEstateStep1} />
    <mainStack.Screen name="realEstateStep2" component={RealEstateStep2} />
    <mainStack.Screen name="realEstateStep3" component={RealEstateStep3} />
    <mainStack.Screen name="personalStep1" component={PersonalStep1} />
    <mainStack.Screen name="personalStep2" component={PersonalStep2} />
    <mainStack.Screen name="personalStep3" component={PersonalStep3} />
    <mainStack.Screen name="offers" component={Offers} />
    <mainStack.Screen name="offerDetails" component={OfferDetails} />
    <mainStack.Screen name="applyToOffer" component={ApplyToOffer} />
    <mainStack.Screen name="success" component={Success} />
    <mainStack.Screen name="signUpSuccess" component={SignUpSuccess} />
  </mainStack.Navigator>
);

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingBottom: 8,
        paddingTop: 8,
        height: ResponsiveDimensions.vs(90),
      },
      tabBarActiveTintColor: AppColors.themeLight.primary_1,
      tabBarInactiveTintColor: '#666',
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={MainStackNavigator}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabItem
            focused={focused}
            label={translate(`${TranslationNamespaces.HOME}:home`)}
            outlinedIcon={OutlinedHomeIcon}
            filledIcon={AppImages.filledHomeIconPng}
            filledIconSize={22}
          />
        ),
        tabBarLabel: '',
      }}
    />

    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabItem
            focused={focused}
            label={translate(`${TranslationNamespaces.HOME}:search`)}
            outlinedIcon={OutlinedSearchIcon}
          />
        ),
        tabBarLabel: '',
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={Favourites}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabItem
            focused={focused}
            label={translate(`${TranslationNamespaces.HOME}:favorites` as any)}
            outlinedIcon={OutlinedFavIcon}
          />
        ),
        tabBarLabel: '',
      }}
    />
    <Tab.Screen
      name="Settings"
      component={MainStackNavigator}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabItem
            focused={focused}
            label={translate(`${TranslationNamespaces.SETTINGS}:title`)}
            outlinedIcon={OutlinedSettingsIcon}
            filledIcon={AppImages.filledSettingsIconPng}
            filledIconSize={24}
          />
        ),
        tabBarLabel: '',
      }}
      listeners={({ navigation }) => ({
        tabPress: e => {
          // Prevent default navigation and navigate to settings screen in the stack
          const state = navigation.getState();
          const routes = state.routes;
          const settingsTabIndex = routes.findIndex(r => r.name === 'Settings');
          if (settingsTabIndex !== -1) {
            const settingsTabState = routes[settingsTabIndex].state;
            if (settingsTabState) {
              const currentRoute =
                settingsTabState.routes[settingsTabState.index || 0];
              if (currentRoute?.name !== 'settings') {
                e.preventDefault();
                (navigation as any).navigate('Settings', {
                  screen: 'settings',
                });
              }
            } else {
              e.preventDefault();
              (navigation as any).navigate('Settings', { screen: 'settings' });
            }
          }
        },
      })}
    />
  </Tab.Navigator>
);

export default TabNavigator;
