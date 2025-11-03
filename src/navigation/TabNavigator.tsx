import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Image } from 'react-native';
import { Home, Settings } from '@src/screens';
import { AppImages } from '@modules/assets';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
  Settings: undefined;
};

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
        height: 60,
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
      name="Settings"
      component={Settings}
      options={{
        tabBarIcon: ({ color }) => (
          <Image
            source={AppImages.outlinedSettingsIcon}
            style={{ width: 24, height: 24, tintColor: color }}
          />
        ),
        tabBarLabel: '',
      }}
    />
    <Tab.Screen
      name="Search"
      component={Home} // Using Home as placeholder for now
      options={{
        tabBarIcon: ({ color }) => (
          <Image
            source={AppImages.outlinedSearchIcon}
            style={{ width: 24, height: 24, tintColor: color }}
          />
        ),
        tabBarLabel: '',
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={Home} // Using Home as placeholder for now
      options={{
        tabBarIcon: ({ color }) => (
          <Image
            source={AppImages.outlinedFavIcon}
            style={{ width: 24, height: 24, tintColor: color }}
          />
        ),
        tabBarLabel: '',
      }}
    />
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ color }) => (
          <Image
            source={AppImages.outlinedHomeIcon}
            style={{ width: 24, height: 24, tintColor: color }}
          />
        ),
        tabBarLabel: translate(`${TranslationNamespaces.HOME}:home`),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
