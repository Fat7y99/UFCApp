import type {
  ApiRequest,
  PagingResponse,
  Notification,
  NotificationsResponse,
  UpdateFcmTokenBody,
  UpdateFcmTokenResponse,
  MarkNotificationReadResponse,
  UnreadNotificationsCountResponse,
  NotificationListV2RequestBody,
  NotificationListV2Response,
} from '@modules/core';
import { httpClient } from '@modules/core';

const queryNotifications = {
  // TODO: Change params, endpoint, method, and response mapping based on API requirements.
  getNotifications: (
    request: ApiRequest,
  ): Promise<PagingResponse<Notification>> =>
    httpClient
      .get<NotificationsResponse>('/notifications', { params: request.params })
      .then(response => ({
        currentPage: response.data.meta?.currentPage,
        lastPage: response.data.meta?.totalPages,
        data: response.data.data?.map(notification => ({
          ...notification,
          key: `notification_${notification.id ?? 0}`,
        })),
      })),
  // TODO: Change params, endpoint, method, and response mapping based on API requirements.
  updateFcmToken: (request: ApiRequest<UpdateFcmTokenBody>) =>
    httpClient
      .post<UpdateFcmTokenResponse>('/update-fcm-token', request.body)
      .then(response => response.data),
  // TODO: Change params, endpoint, method, and response mapping based on API requirements.
  markNotificationRead: (request: ApiRequest<any, string | number>) =>
    httpClient
      .post<MarkNotificationReadResponse>(
        `/mark-notification-read/${request.pathVar}`,
      )
      .then(response => response.data),
  // Get unread notifications count
  getUnreadNotificationsCount: (): Promise<UnreadNotificationsCountResponse> =>
    httpClient
      .get<UnreadNotificationsCountResponse>(
        '/api/user/notification/countUnRead',
      )
      .then(response => response.data),
  // Search user notifications (v2)
  getNotificationListV2: (
    request: ApiRequest<NotificationListV2RequestBody>,
  ): Promise<NotificationListV2Response> =>
    httpClient
      .post<NotificationListV2Response>(
        '/api/user/notification/list/v2',
        request.body,
      )
      .then(response => response.data),
};

export default queryNotifications;
