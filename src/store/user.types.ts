import type { User } from '@modules/core';

export interface UserState {
  user?: User;
  unreadNotificationsCount?: number;
  apiToken?: string;
  refreshToken?: string;
  isLoggedIn: boolean;
}
