import * as React from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Screen, ScrollContainer } from '@modules/components';
import { AppImages } from '@modules/assets';
import { LogoIcon } from '@modules/assets';
import styles from './styles';
import { AppColors, useAppTheme } from 'modules/theme/src';
import {
  Button,
  ResponsiveDimensions,
} from '@eslam-elmeniawy/react-native-common-components';
import { TranslationNamespaces } from 'modules/localization/src/enums';
import { translate } from '@modules/localization';
export default React.memo(() => {
  const theme = useAppTheme();
  const [isPressed1, setIsPressed1] = React.useState(false);
  const [isPressed2, setIsPressed2] = React.useState(false);

  const buttonColor1 = React.useMemo(
    () =>
      isPressed1
        ? AppColors.themeLight.pressedButtonColor
        : AppColors.themeLight.primaryButtonColor,
    [isPressed1],
  );
  const buttonTextColor1 = React.useMemo(
    () =>
      isPressed1
        ? AppColors.themeLight.onPrimary
        : AppColors.themeLight.primary_1,
    [isPressed1],
  );

  const buttonColor2 = React.useMemo(
    () =>
      isPressed2
        ? AppColors.themeLight.pressedButtonColor
        : AppColors.themeLight.primaryButtonColor,
    [isPressed2],
  );
  const buttonTextColor2 = React.useMemo(
    () =>
      isPressed2
        ? AppColors.themeLight.onPrimary
        : AppColors.themeLight.primary_1,
    [isPressed2],
  );
  return (
    <Screen style={{ backgroundColor: AppColors.themeLight.primary_1 }}>
      <ImageBackground
        // style={styles.scrollView}
        source={AppImages.landingBg}
        style={styles.scrollViewContent}
        resizeMode="stretch"
      >
        <View
          style={{
            alignItems: 'center',
            marginTop: ResponsiveDimensions.percentHeight(30),
          }}
        >
          <LogoIcon />
          <Text style={styles.landingNoteText}>
            {translate(`${TranslationNamespaces.LANDING}:landingNote`)}
          </Text>

          <View
            style={{
              marginTop: ResponsiveDimensions.vs(32),
              gap: ResponsiveDimensions.vs(32),
              width: '60%',
            }}
          >
            <Pressable
              style={StyleSheet.compose(
                {
                  backgroundColor: buttonColor1,
                },
                styles.btn,
              )}
              onPressIn={() => {
                setIsPressed1(true);
                console.log('Button pressed - color changed');
              }}
              onPressOut={() => {
                setIsPressed1(false);
                console.log('Button released - color reset');
              }}
              onPress={() => {
                console.log('Button clicked');
              }}
            >
              <Text
                style={{
                  color: buttonTextColor1,
                  textAlign: 'center',
                }}
              >
                {translate('restartApp')}
              </Text>
            </Pressable>
            <Pressable
              style={StyleSheet.compose(
                {
                  backgroundColor: buttonColor2,
                },
                styles.btn,
              )}
              onPressIn={() => {
                setIsPressed2(true);
                console.log('Button pressed - color changed');
              }}
              onPressOut={() => {
                setIsPressed2(false);
                console.log('Button released - color reset');
              }}
              onPress={() => {
                console.log('Button clicked');
              }}
            >
              <Text
                style={{
                  color: buttonTextColor2,
                  textAlign: 'center',
                }}
              >
                {translate('restartApp')}
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </Screen>
  );
});
