import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import * as React from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { AppImages, LogoIcon } from '@modules/assets';
import { Screen } from '@modules/components';
import { translate } from '@modules/localization';
import styles from './styles';
import { TranslationNamespaces } from 'modules/localization/src/enums';
import { AppColors } from 'modules/theme/src';
export default React.memo(() => {
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
          <View style={{ marginVertical: ResponsiveDimensions.vs(48) }}>
            <LogoIcon />
          </View>
          <View
            style={
              {
                // paddingTop: ResponsiveDimensions.vs(28),
              }
            }
          >
            <Text style={styles.landingNoteText}>
              {translate(`${TranslationNamespaces.LANDING}:landingNote`)}
            </Text>
          </View>

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
              <Text style={[styles.btnText, { color: buttonTextColor1 }]}>
                {translate(`${TranslationNamespaces.LANDING}:english`)}
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
                style={[
                  styles.btnText,
                  {
                    color: buttonTextColor2,
                  },
                ]}
              >
                {translate(`${TranslationNamespaces.LANDING}:arabic`)}
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </Screen>
  );
});
