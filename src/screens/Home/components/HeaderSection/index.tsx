import React from 'react';
import { View, TextInput, Image } from 'react-native';
import { useAppSelector } from '@src/store';
import { NotificationButton } from '@modules/components';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { styles } from './styles';
import { AppImages } from 'modules/assets/src';

const HeaderSection: React.FC = () => {
  const { user } = useAppSelector(state => state.user);

  return (
    <View style={styles.container}>
      {/* Login Button and Search Bar */}
      <View style={styles.headerContent}>
        <View style={styles.searchContainer}>
          <Image source={AppImages.searchIcon} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={translate(`${TranslationNamespaces.HOME}:search`)}
            placeholderTextColor="#666"
          />
        </View>
        {user ? (
          <View>
            <NotificationButton />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default HeaderSection;
