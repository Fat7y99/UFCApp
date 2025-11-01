import { useInfiniteQuery } from '@tanstack/react-query';
import { queryNotifications } from '@modules/core';
import type {
  NotificationListV2Response,
  ServerError,
  ApiRequest,
  NotificationListV2RequestBody,
} from '@modules/core';
import type {
  InfiniteData,
  UseInfiniteQueryOptions,
  QueryKey,
} from '@tanstack/react-query';

const useGetNotificationListV2Api = (
  request: ApiRequest<NotificationListV2RequestBody>,
  options?: Omit<
    UseInfiniteQueryOptions<
      NotificationListV2Response,
      ServerError,
      InfiniteData<
        NotificationListV2Response,
        ApiRequest<NotificationListV2RequestBody>
      >,
      QueryKey,
      ApiRequest<NotificationListV2RequestBody>
    >,
    'queryFn' | 'queryKey' | 'initialPageParam' | 'getNextPageParam'
  >,
) =>
  useInfiniteQuery<
    NotificationListV2Response,
    ServerError,
    InfiniteData<
      NotificationListV2Response,
      ApiRequest<NotificationListV2RequestBody>
    >,
    QueryKey,
    ApiRequest<NotificationListV2RequestBody>
  >({
    queryFn: ({ pageParam }) =>
      queryNotifications.getNotificationListV2(pageParam || request),
    queryKey: [
      'notifications',
      'list-v2',
      request.body?.readed,
      request.body?.pagingRequest,
    ],
    initialPageParam: {
      body: {
        ...request.body,
        pagingRequest: {
          pageNumber: 1,
          pageSize: 50,
          sortBy: 'username',
          sortType: 'ASC',
          ...request.body?.pagingRequest,
        },
      },
    } as ApiRequest<NotificationListV2RequestBody>,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      const currentPage = lastPage.paging?.currentPage || 1;
      const totalPages = lastPage.paging?.totalPages || 1;

      if (currentPage >= totalPages) {
        return undefined;
      }

      return {
        body: {
          ...lastPageParam.body,
          pagingRequest: {
            ...lastPageParam.body?.pagingRequest,
            pageNumber: currentPage + 1,
          },
        },
      } as ApiRequest<NotificationListV2RequestBody>;
    },
    ...(options ?? {}),
  });

export default useGetNotificationListV2Api;
