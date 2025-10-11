import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';

const HeaderSection: React.FC = () => (
  <View style={styles.container}>
    {/* Login Button and Search Bar */}
    <View style={styles.headerContent}>
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
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

const styles = StyleSheet.create({
  container: {
    height: ResponsiveDimensions.vs(160),
    backgroundColor: AppColors.themeLight.primary_1,
    paddingTop: ResponsiveDimensions.vs(50),
    paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingBottom: ResponsiveDimensions.vs(20),
    borderBottomEndRadius: ResponsiveDimensions.vs(12),
    borderBottomStartRadius: ResponsiveDimensions.vs(12),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
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
    gap: ResponsiveDimensions.vs(16),
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: ResponsiveDimensions.vs(32),
    paddingHorizontal: ResponsiveDimensions.vs(34),
    paddingVertical: ResponsiveDimensions.vs(12),
  },
  loginText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(16),
    fontWeight: 'bold',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: ResponsiveDimensions.vs(32),
    paddingHorizontal: ResponsiveDimensions.vs(16),
    paddingVertical: ResponsiveDimensions.vs(12),
  },
  searchIcon: {
    marginRight: ResponsiveDimensions.vs(12),
    fontSize: ResponsiveDimensions.vs(18),
  },
  searchInput: {
    flex: 1,
    fontSize: ResponsiveDimensions.vs(16),
    color: '#333',
  },
});

export default HeaderSection;
