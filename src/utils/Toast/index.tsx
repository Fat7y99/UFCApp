import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import { isEmpty, isUndefined } from 'lodash';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { AppImages } from '@modules/assets';
import * as Colors from './colors';
import type { ToastConfig } from 'react-native-toast-message';

// ---How to import---
// -> import Toast from 'react-native-toast-message';
// -> Sample:
// const showToast = () => {
//   Toast.show({
//       type: 'fail',
//       text1: 'Opps! your password is too weak. Please create a unique password.',
//       topOffset: 29,
//   });
// };
// -> onPress={showToast}

const toastConfig: ToastConfig = {
  fail: ({ text1 }) => {
    if (isUndefined(text1) || isEmpty(text1)) {
      return null;
    }
    return (
      <View style={styles.toastContainerFail}>
        <View style={styles.textContainer}>
          <Text
            style={{
              color: Colors.SYSTEM_3_700,
              fontSize: ResponsiveDimensions.vs(15),
              fontWeight: '700',
              lineHeight: ResponsiveDimensions.vs(21),
            }}
          >
            {text1}
          </Text>
        </View>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={() => Toast.hide()}>
            <Image
              source={AppImages.systemSmallLight}
              style={styles.closeButtonImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  },

  success: ({ text1 }) => {
    if (isUndefined(text1) || isEmpty(text1)) {
      return null;
    }
    return (
      <View style={styles.toastContainerSuccess}>
        <View style={styles.textContainer}>
          <Text
            style={{
              color: Colors.SYSTEM_1_700,
              fontSize: ResponsiveDimensions.vs(15),
              fontWeight: '600',
              lineHeight: ResponsiveDimensions.vs(21),
            }}
          >
            {text1}
          </Text>
        </View>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={() => Toast.hide()}>
            <Image
              source={AppImages.systemSmallLight}
              style={styles.closeButtonImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  },
  info: ({ text1 }) => {
    if (isUndefined(text1) || isEmpty(text1)) {
      return null;
    }
    return (
      <View style={styles.toastContainerInfo}>
        <View style={styles.textContainer}>
          <Text
            style={{
              color: Colors.SYSTEM_4_700,
              fontSize: ResponsiveDimensions.vs(15),
              fontWeight: '600',
              lineHeight: ResponsiveDimensions.vs(21),
            }}
          >
            {text1}
          </Text>
        </View>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={() => Toast.hide()}>
            <Image
              source={AppImages.systemSmallLight}
              style={styles.closeButtonImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  toastContainerFail: {
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 3,
    backgroundColor: Colors.SYSTEM_3_100,
    padding: ResponsiveDimensions.vs(16),
    marginHorizontal: ResponsiveDimensions.vs(24),
  },
  toastContainerSuccess: {
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 3,
    backgroundColor: Colors.SYSTEM_1_100,
    padding: ResponsiveDimensions.vs(16),
    marginHorizontal: ResponsiveDimensions.vs(24),
  },
  toastContainerInfo: {
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 3,
    backgroundColor: Colors.SYSTEM_4_100,
    padding: ResponsiveDimensions.vs(16),
    marginHorizontal: ResponsiveDimensions.vs(24),
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
  },
  closeButtonContainer: {
    marginLeft: ResponsiveDimensions.vs(16),
  },
  closeButtonImage: {
    width: ResponsiveDimensions.vs(20),
    height: ResponsiveDimensions.vs(20),
    resizeMode: 'contain',
  },
});

export default toastConfig;
