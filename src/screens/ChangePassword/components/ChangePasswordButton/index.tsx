import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import { useChangePasswordContext } from '@src/screens/ChangePassword/context/ChangePasswordContext';
import { SuccessType } from '@src/screens/Success/types';
import { useChangePasswordApi } from '@modules/core';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { styles } from './styles';

const ChangePasswordButton: React.FC = () => {
  const navigation = useNavigation<any>();
  const { currentPassword, newPassword, confirmPassword } =
    useChangePasswordContext();
  const { mutate: changePassword, isPending } = useChangePasswordApi({
    onSuccess: () => {
      navigation.navigate('success', { type: SuccessType.PASSWORD_CHANGED });
    },
    onError: error => {
      Toast.show({
        type: 'fail',
        text1:
          error.errorMessage ||
          translate(`${TranslationNamespaces.CHANGE_PASSWORD}:errorMessage`),
      });
    },
  });

  const handleChangePasswordPress = () => {
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      Toast.show({
        type: 'fail',
        text1: translate(
          `${TranslationNamespaces.CHANGE_PASSWORD}:fillAllFields`,
        ),
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Toast.show({
        type: 'fail',
        text1: translate(
          `${TranslationNamespaces.CHANGE_PASSWORD}:passwordsDoNotMatch`,
        ),
      });
      return;
    }
    if (newPassword === currentPassword) {
      Toast.show({
        type: 'fail',
        text1: translate(
          `${TranslationNamespaces.CHANGE_PASSWORD}:newPasswordCannotBeSameAsCurrentPassword`,
        ),
      });
      return;
    }
    // Call API
    changePassword({
      body: {
        password: currentPassword,
        newPassword: newPassword,
      },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.changePasswordButton,
          isPending && styles.changePasswordButtonDisabled,
        ]}
        onPress={handleChangePasswordPress}
        disabled={isPending}
      >
        {isPending ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.changePasswordButtonText}>
            {translate(`${TranslationNamespaces.CHANGE_PASSWORD}:changeButton`)}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordButton;
