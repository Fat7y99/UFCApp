import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { Home, Settings } from '@src/screens';
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
      name="Settings"
      component={Settings}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabItem
            focused={focused}
            label="Settings"
            outlinedIcon={OutlinedSettingsIcon}
            filledIcon={AppImages.filledSettingsIconPng}
            filledIconSize={24}
          />
        ),
        tabBarLabel: '',
      }}
    />
    <Tab.Screen
      name="Search"
      component={Home} // Using Home as placeholder for now
      options={{
        tabBarIcon: ({ focused }) => (
          <TabItem
            focused={focused}
            label="Search"
            outlinedIcon={OutlinedSearchIcon}
          />
        ),
        tabBarLabel: '',
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={Home} // Using Home as placeholder for now
      options={{
        tabBarIcon: ({ focused }) => (
          <TabItem
            focused={focused}
            label="Favorites"
            outlinedIcon={OutlinedFavIcon}
          />
        ),
        tabBarLabel: '',
      }}
    />
    <Tab.Screen
      name="Home"
      component={Home}
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
  </Tab.Navigator>
);

export default TabNavigator;
