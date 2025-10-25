import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { styles } from './styles';
import { AppImages } from 'modules/assets/src';

const HeaderSection: React.FC = () => (
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
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>
          {translate(`${TranslationNamespaces.LOGIN}:signin`)}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default HeaderSection;
