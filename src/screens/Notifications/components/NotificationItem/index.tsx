import { Text } from '@eslam-elmeniawy/react-native-common-components';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { I18nManager, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import type { RootStackParamList } from '@src/navigation';
import { toArabicDigits } from '@src/utils/InputFormatting';
import { LoanLogo, AccountLogo, AlertLogo } from '@modules/assets';
import { useMarkNotificationReadApi, type ApiRequest } from '@modules/core';
import { TranslationNamespaces } from '@modules/localization';
import { processNotification } from '@modules/utils';
import styles from './styles';
import type { NotificationItemProps } from './types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default React.memo((props: NotificationItemProps) => {
  // #region Logger
  const getLogMessage = (message: string) =>
    `## Notifications::NotificationItem:: ${message}`;
  // #endregion

  const { item: notification } = props;
  const navigation = useNavigation<NavigationProp>();
  const markAsReadMutation = useMarkNotificationReadApi();
  const { t: translate } = useTranslation([TranslationNamespaces.COMMON]);

  const onNotificationPress = () => {
    console.info(getLogMessage('onNotificationPress'), notification);
    processNotification(notification, true);

    // Mark notification as read if it's unread
    if (!notification.isRead && notification.originalItem?.id) {
      const request: ApiRequest<any, number> = {
        pathVar: notification.originalItem.id,
      };
      markAsReadMutation.mutate(request);
    }

    navigation.navigate('notificationDetails', { notification });
  };

  const getNotificationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'loan':
        return <LoanLogo />;
      case 'account':
        return <AccountLogo />;
      case 'alert':
        return <AlertLogo />;
      default:
        return <LoanLogo />;
    }
  };
  const isRtl = I18nManager.isRTL;
  const formatDate = (date: string) => {
    console.log('date', date);
    const notificationDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (notificationDate.toDateString() === today.toDateString()) {
      return translate(`${TranslationNamespaces.COMMON}:today`);
    } else if (notificationDate.toDateString() === yesterday.toDateString()) {
      return translate(`${TranslationNamespaces.COMMON}:yesterday`);
    } else {
      // Use current language locale for date formatting

      return isRtl
        ? `${toArabicDigits(notificationDate.getDate())}/${toArabicDigits(notificationDate.getMonth())} `
        : `${notificationDate.getMonth()}/${notificationDate.getDate()} `;
    }
  };

  return (
    <TouchableRipple onPress={onNotificationPress}>
      <View style={styles.notificationItem}>
        <View style={styles.iconContainer}>
          {getNotificationIcon((notification as any).type || 'loan')}
        </View>
        <View style={styles.notificationItemContent}>
          <Text
            variant="titleSmall"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.notificationTitle}
          >
            {notification.title}
          </Text>
          <Text
            variant="bodySmall"
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.notificationMessage}
          >
            {notification.message}
          </Text>
        </View>
        <Text style={styles.notificationDate}>
          {formatDate((notification as any).createdAt ?? '')}
        </Text>
      </View>
    </TouchableRipple>
  );
});
