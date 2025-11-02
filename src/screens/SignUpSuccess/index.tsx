import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { CommonActions, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import type { RootStackParamList } from '@src/navigation';
import SuccessIcon from '@src/screens/Success/components/SuccessIcon';
import { LogoIcon, AppImages } from '@modules/assets';
import { Screen } from '@modules/components';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default React.memo(() => {
  const navigation = useNavigation<NavigationProp>();

  const handleSignInPress = () => {
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: 'login' }] }),
    );
  };

  return (
    <Screen style={styles.container}>
      <ImageBackground
        source={AppImages.signupBg}
        style={styles.backgroundImage}
        resizeMode="stretch"
      >
        <View style={styles.contentContainer}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Logo and App Name */}
            <View style={styles.headerContainer}>
              <LogoIcon />
            </View>

            {/* Success Icon */}
            <View style={styles.iconContainer}>
              <SuccessIcon />
            </View>

            {/* Success Message */}
            <Text style={[styles.successMessage]}>
              {translate(
                `${TranslationNamespaces.SIGNUP}:registeredSuccessfully`,
              )}
            </Text>

            {/* Sign In Button */}
            <TouchableOpacity
              style={styles.signInButton}
              onPress={handleSignInPress}
            >
              <Text style={styles.signInButtonText}>
                {translate(`${TranslationNamespaces.LOGIN}:signin`) ||
                  'SIGN IN'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </Screen>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.themeLight.primary_1,
  },
  backgroundImage: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: ResponsiveDimensions.percentHeight(10),
    marginBottom: ResponsiveDimensions.percentHeight(6),
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: ResponsiveDimensions.vs(20),
    paddingBottom: ResponsiveDimensions.vs(20),
    // alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: ResponsiveDimensions.vs(40),
  },
  iconContainer: {
    marginBottom: ResponsiveDimensions.vs(40),
    alignItems: 'center',
  },
  successMessage: {
    fontFamily: 'Inter-Bold',
    fontSize: ResponsiveDimensions.vs(20),
    textAlign: 'center',
    marginBottom: ResponsiveDimensions.vs(40),
    color: 'white',
  },
  signInButton: {
    backgroundColor: AppColors.themeLight.primaryButtonColor,
    paddingVertical: ResponsiveDimensions.vs(16),
    paddingHorizontal: ResponsiveDimensions.vs(32),
    borderRadius: ResponsiveDimensions.vs(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: ResponsiveDimensions.vs(36),
  },
  signInButtonText: {
    color: AppColors.themeLight.primary_1,
    fontSize: ResponsiveDimensions.vs(18),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
