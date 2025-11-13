import { useNavigation } from '@react-navigation/native';
import React, { useRef, useEffect } from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import type { RootStackParamList } from '@src/navigation';
import { useAppSelector } from '@src/store';
import { NotificationButton } from '@modules/components';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { styles } from './styles';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppImages } from 'modules/assets/src';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface HeaderSectionProps {
  autoFocus?: boolean;
  showBackButton?: boolean;
  onBackPress?: () => void;
  searchValue?: string;
  onSearchChange?: (text: string) => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  autoFocus = false,
  showBackButton = false,
  onBackPress,
  searchValue,
  onSearchChange,
}) => {
  const { user } = useAppSelector(state => state.user);
  const navigation = useNavigation<NavigationProp>();
  const searchInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus && searchInputRef.current) {
      // Small delay to ensure the screen is fully mounted
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [autoFocus]);

  const handleSearchPress = () => {
    if (!showBackButton) {
      // Only navigate if we're on the home screen
      navigation.navigate('Search');
    }
  };

  return (
    <View style={styles.container}>
      {/* Login Button and Search Bar */}
      <View style={styles.headerContent}>
        {showBackButton && onBackPress && (
          <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
            <Image source={AppImages.leftArrow} style={styles.backIcon} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={handleSearchPress}
          activeOpacity={showBackButton ? 1 : 0.7}
        >
          <Image source={AppImages.searchIcon} style={styles.searchIcon} />
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder={translate(`${TranslationNamespaces.HOME}:search`)}
            placeholderTextColor="#666"
            editable={showBackButton}
            value={searchValue}
            onChangeText={onSearchChange}
            onFocus={showBackButton ? undefined : handleSearchPress}
            onPress={showBackButton ? undefined : handleSearchPress}
          />
        </TouchableOpacity>
        {user && !showBackButton ? (
          <View>
            <NotificationButton />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default HeaderSection;
