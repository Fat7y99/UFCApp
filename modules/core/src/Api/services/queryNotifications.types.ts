import type { BaseUser } from '@modules/core';

// TODO: Construct update FCM token body based on API.
export interface UpdateFcmTokenBody {
  fcmToken: string;
  deviceId: string;
}

// Paging request for notification list v2
export interface PagingRequest {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortType?: 'ASC' | 'DESC';
}

// Request body for notification list v2
export interface NotificationListV2RequestBody {
  pagingRequest?: PagingRequest;
  readed?: boolean;
}

// User device information
export interface UserDevice {
  appVersion?: string;
  appVersionCode?: number;
  board?: string;
  brand?: string;
  buildId?: string;
  buildRelease?: string;
  creationDate?: string;
  [key: string]: any;
}

// Extended User with imageUrl for notification response
export interface NotificationUser extends BaseUser {
  imageUrl?: string;
}

// Notification detail object
export interface NotificationDetail {
  body?: string;
  bodyEn?: string;
  createdUser?: NotificationUser;
  creationDate?: string;
  id?: number;
  sendToAll?: boolean;
  title?: string;
  titleEn?: string;
  toUser?: NotificationUser;
}

// Notification item in list v2
export interface NotificationItemV2 {
  checked?: boolean;
  firebaseSent?: boolean;
  id?: number;
  notification?: NotificationDetail;
  user?: NotificationUser;
  userDevice?: UserDevice;
}

// Response for notification list v2
export interface NotificationListV2Response {
  list?: NotificationItemV2[];
  paging?: {
    currentPage?: number;
    pageSize?: number;
    totalPages?: number;
  };
}
