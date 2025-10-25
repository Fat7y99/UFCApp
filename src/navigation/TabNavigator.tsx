import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Text } from 'react-native';
import { Home, Settings } from '@src/screens';
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
        tabBarIcon: ({}) => <Text style={{ fontSize: 20 }}>⚙️</Text>,
        tabBarLabel: '',
      }}
    />
    <Tab.Screen
      name="Search"
      component={Home} // Using Home as placeholder for now
      options={{
        tabBarIcon: ({}) => <Text style={{ fontSize: 20 }}>🔍</Text>,
        tabBarLabel: '',
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={Home} // Using Home as placeholder for now
      options={{
        tabBarIcon: ({}) => <Text style={{ fontSize: 20 }}>🤍</Text>,
        tabBarLabel: '',
      }}
    />
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({}) => <Text style={{ fontSize: 20 }}>🏠</Text>,
        tabBarLabel: translate(`${TranslationNamespaces.HOME}:home`),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
