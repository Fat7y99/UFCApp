import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import type { RootStackParamList } from '@src/navigation';
import { NotificationButton } from '@modules/components';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
import { styles } from './styles';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppImages } from 'modules/assets/src';

const HelpHeader: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={AppColors.themeLight.primary_1}
      />

      {/* Header Content */}
      <View style={styles.headerContent}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Image source={AppImages.leftArrow} />
        </TouchableOpacity>

        <Text style={styles.title}>
          {translate(`${TranslationNamespaces.HELP}:title`)}
        </Text>

        <NotificationButton />
      </View>
    </View>
  );
};

export default HelpHeader;
