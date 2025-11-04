import { FlatList } from '@eslam-elmeniawy/react-native-common-components';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator } from 'react-native-paper';
import {
  NotificationItem,
  NotificationsListSeparator,
} from '@src/screens/Notifications/components';
import { useAppDispatch, setUnreadCount } from '@src/store';
import { ListEmptyComponent, ListLoadingMore } from '@modules/components';
import {
  useGetNotificationListV2Api,
  type ApiRequest,
  type NotificationItemV2,
  type NotificationListV2RequestBody,
} from '@modules/core';
import { TranslationNamespaces } from '@modules/localization';
import styles from './styles';

// Transform NotificationItemV2 to the format expected by NotificationItem component
const transformNotificationItem = (
  item: NotificationItemV2,
  language: string = 'en',
) => {
  const notification = item.notification;
  const isEnglish = language.toLowerCase().startsWith('en');

  return {
    key: `notification_${item.id ?? ''}`,
    id: item.id?.toString() || '',
    title: isEnglish
      ? notification?.titleEn || notification?.title || ''
      : notification?.title || notification?.titleEn || '',
    message: isEnglish
      ? notification?.bodyEn || notification?.body || ''
      : notification?.body || notification?.bodyEn || '',
    type: 'loan', // Default type, can be extracted from notification if available
    createdAt: notification?.creationDate || new Date().toISOString(),
    isRead: item.checked || false,
    // Keep original item for navigation if needed
    originalItem: item,
  };
};

export default React.memo(() => {
  const { t: translate, i18n } = useTranslation(
    TranslationNamespaces.NOTIFICATIONS,
  );
  const dispatch = useAppDispatch();

  // Create API request for fetching all notifications (both read and unread)
  const request: ApiRequest<NotificationListV2RequestBody> = React.useMemo(
    () => ({
      body: {
        pagingRequest: {
          pageNumber: 1,
          pageSize: 50,
        },
        // Don't filter by read status - get all notifications
        // readed: undefined means get all
      },
    }),
    [],
  );

  const {
    data: allPages,
    isLoading,
    isFetching,
    isFetchingNextPage,
    refetch,
    fetchNextPage,
    error,
    isError: isLoadingError,
  } = useGetNotificationListV2Api(request);

  // Transform and flatten the notification data
  const notificationsList = React.useMemo(() => {
    if (!allPages?.pages) return [];

    const allItems = allPages.pages
      .map(page => page.list || [])
      .flat()
      .filter(item => item.notification); // Filter out items without notification details

    return allItems.map(item => transformNotificationItem(item, i18n.language));
  }, [allPages, i18n.language]);

  // Update Redux store with unread count
  React.useEffect(() => {
    const unreadCount = notificationsList.filter(n => !n.isRead).length;
    dispatch(setUnreadCount(unreadCount));
  }, [notificationsList, dispatch]);

  return isLoading ? (
    <ActivityIndicator size="large" style={styles.loadingIndicator} />
  ) : (
    <>
      <FlatList
        data={notificationsList}
        renderItem={info => <NotificationItem {...info} />}
        ListEmptyComponent={
          <ListEmptyComponent
            data={translate('notifications')}
            error={error}
            isLoadingError={isLoadingError}
          />
        }
        onRefresh={() => refetch()}
        refreshing={isFetching && !isFetchingNextPage}
        onEndReached={() => {
          if (!isFetchingNextPage && fetchNextPage) {
            fetchNextPage();
          }
        }}
        contentContainerStyle={
          !notificationsList?.length ? styles.emptyList : undefined
        }
        ItemSeparatorComponent={NotificationsListSeparator}
      />
      <ListLoadingMore isFetchingNextPage={isFetchingNextPage} />
    </>
  );
});
