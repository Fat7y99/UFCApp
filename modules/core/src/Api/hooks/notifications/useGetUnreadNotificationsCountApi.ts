import { useQuery } from '@tanstack/react-query';
import { queryNotifications } from '@modules/core';
import type {
  UnreadNotificationsCountResponse,
  ServerError,
} from '@modules/core';
import type { UseQueryOptions } from '@tanstack/react-query';

const useGetUnreadNotificationsCountApi = (
  options?: Omit<
    UseQueryOptions<UnreadNotificationsCountResponse, ServerError>,
    'queryFn' | 'queryKey'
  >,
) =>
  useQuery<UnreadNotificationsCountResponse, ServerError>({
    queryFn: () => queryNotifications.getUnreadNotificationsCount(),
    queryKey: ['notifications', 'unread-count'],
    ...(options ?? {}),
  });

export default useGetUnreadNotificationsCountApi;
