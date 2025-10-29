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
// import { useGetNotificationsApi } from '@modules/core';
import { TranslationNamespaces } from '@modules/localization';
// import { useFocusNotifyOnChangeProps } from '@modules/utils';
import styles from './styles';

// Static notifications data from screenshot
const staticNotifications = [
  {
    id: '1',
    title: 'Loan Approval',
    message:
      'Loan Request no. 632479852 is approved. Please check your account for details.',
    type: 'loan',
    createdAt: new Date().toISOString(),
    isRead: false,
  },
  {
    id: '2',
    title: 'Account',
    message:
      'Your account is limited. Please follow the instructions to verify your identity.',
    type: 'account',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    isRead: false,
  },
  {
    id: '3',
    title: 'Alert',
    message:
      'Your application is pending due to missing documents. Please upload the required files.',
    type: 'alert',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    isRead: false,
  },
  {
    id: '4',
    title: 'Account is verified',
    message:
      'Your account is verified. Please contact our support team for any assistance.',
    type: 'account',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    isRead: true,
  },
];

export default React.memo(() => {
  const { t: translate } = useTranslation(TranslationNamespaces.NOTIFICATIONS);
  const dispatch = useAppDispatch();
  // const notifyOnChangeProps = useFocusNotifyOnChangeProps();

  // Commented out real API calls
  // const {
  //   data: allPages,
  //   isLoading,
  //   isFetching,
  //   isFetchingNextPage,
  //   refetch,
  //   fetchNextPage,
  //   error,
  //   isLoadingError,
  // } = useGetNotificationsApi({ notifyOnChangeProps: notifyOnChangeProps?.() });

  // const notificationsList = allPages?.pages
  //   ?.map(page => page.data ?? [])
  //   ?.flat();

  // Using static data instead
  const notificationsList = staticNotifications;
  const isLoading = false;
  const isFetching = false;
  const isFetchingNextPage = false;
  const error = null;
  const isLoadingError = false;

  const refetch = () => {
    // Static data - no refetch needed
    console.log('Refetch called - using static data');
  };

  const fetchNextPage = () => {
    // Static data - no pagination needed
    console.log('Fetch next page called - using static data');
  };

  // Update Redux store with unread count
  React.useEffect(() => {
    const unreadCount = notificationsList.filter(
      n => !(n as any).isRead,
    ).length;
    // Set initial count to 3 for static data
    const count = unreadCount > 0 ? unreadCount : 3;
    dispatch(setUnreadCount(count));
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
        onEndReached={() => fetchNextPage()}
        contentContainerStyle={
          !notificationsList?.length ? styles.emptyList : undefined
        }
        ItemSeparatorComponent={NotificationsListSeparator}
      />
      <ListLoadingMore isFetchingNextPage={isFetchingNextPage} />
    </>
  );
});
