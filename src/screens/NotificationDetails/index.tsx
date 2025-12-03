import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  I18nManager,
} from 'react-native';
import type { RootStackScreenProps } from '@src/navigation';
import { toArabicDigits } from '@src/utils/InputFormatting';
import { LoanLogo, AccountLogo, AlertLogo, AppImages } from '@modules/assets';
import { Screen } from '@modules/components';
import { TranslationNamespaces } from '@modules/localization';
import { AppColors } from '@modules/theme';
import styles from './styles';
const isRTL = I18nManager.isRTL;
export default React.memo(
  (props: RootStackScreenProps<'notificationDetails'>) => {
    const { route } = props;
    const navigation = useNavigation();
    const { notification } = route.params;
    const { t: translate } = useTranslation([
      TranslationNamespaces.COMMON,
      TranslationNamespaces.NOTIFICATIONS,
    ]);

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
    const formatDate = (date: string) => {
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
        return isRTL
          ? `${toArabicDigits(notificationDate.getDate())}/${toArabicDigits(notificationDate.getMonth())} `
          : `${notificationDate.getMonth()}/${notificationDate.getDate()} `;
      }
    };

    return (
      <Screen
        style={styles.container}
        showNavigationBar={false}
        statusBarColor={AppColors.themeLight.primary_1}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Image
              source={AppImages.leftArrow}
              style={[
                styles.backIcon,
                isRTL && { transform: [{ scaleX: -1 }] },
              ]}
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, isRTL && styles.headerTitleRTL]}>
            {translate(`${TranslationNamespaces.NOTIFICATIONS}:notifications`)}
          </Text>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentCard}>
            {/* Notification Header */}
            <View style={styles.notificationHeader}>
              <View style={styles.iconContainer}>
                {getNotificationIcon((notification as any).type || 'loan')}
              </View>
              <View style={styles.notificationInfo}>
                <Text style={styles.notificationTitle}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationDate}>
                  {formatDate((notification as any).createdAt)}
                </Text>
              </View>
            </View>

            {/* Notification Content */}
            <View style={styles.notificationContent}>
              <Text style={styles.notificationMessage}>
                {notification.message}
              </Text>
            </View>
          </View>
        </ScrollView>
      </Screen>
    );
  },
);
