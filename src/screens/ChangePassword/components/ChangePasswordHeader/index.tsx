import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '@src/navigation';
import { AppColors } from '@modules/theme';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ChangePasswordHeader: React.FC = () => {
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

      {/* Status Bar Area */}
      <View style={styles.statusBar}>
        <Text style={styles.timeText}>9:09</Text>
        <View style={styles.statusIcons}>
          <Text style={styles.statusIcon}>📶</Text>
          <Text style={styles.statusIcon}>📶</Text>
          <Text style={styles.statusIcon}>🔋</Text>
        </View>
      </View>

      {/* Header Content */}
      <View style={styles.headerContent}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          {translate(`${TranslationNamespaces.CHANGE_PASSWORD}:title`)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.themeLight.primary_1,
    paddingTop: ResponsiveDimensions.vs(50),
    paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingBottom: ResponsiveDimensions.vs(20),
    borderBottomLeftRadius: ResponsiveDimensions.vs(20),
    borderBottomRightRadius: ResponsiveDimensions.vs(20),
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ResponsiveDimensions.vs(20),
  },
  timeText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: 'bold',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: ResponsiveDimensions.vs(8),
  },
  statusIcon: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(16),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: ResponsiveDimensions.vs(8),
    marginRight: ResponsiveDimensions.vs(12),
  },
  backIcon: {
    color: AppColors.themeLight.primaryButtonColor, // Light blue
    fontSize: ResponsiveDimensions.vs(24),
    fontWeight: 'bold',
  },
  title: {
    color: AppColors.themeLight.primaryButtonColor, // Light blue
    fontSize: ResponsiveDimensions.vs(20),
    fontWeight: 'bold',
  },
});

export default ChangePasswordHeader;
