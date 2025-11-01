import type { User, ApiRequest } from '@modules/core';
import { httpClient } from '@modules/core';
import type { UpdateProfileBody } from './queryUser.types';

const queryUser = {
  // TODO: Change params, endpoint, method, and response mapping based on API requirements.
  getUserDetails: () =>
    httpClient.get<User>('/user').then(response => response.data),
  // Get current user details
  getCurrentUser: () =>
    httpClient.get<User>('/api/user/me').then(response => response.data),
  // TODO: Change params, endpoint, method, and response mapping based on API requirements.
  updateUserProfile: (request: ApiRequest<FormData, number>) =>
    httpClient
      .putForm<User>(`/user/${request.pathVar}`, request.body)
      .then(response => response.data),
  // Update profile with address, birthDate, gender, preferredLanguage
  updateProfile: (request: ApiRequest<UpdateProfileBody>) =>
    httpClient
      .put<User>('/api/user/updateProfile', request.body)
      .then(response => response.data),
  // Update profile image
  updateImageProfile: (request: ApiRequest<FormData>): Promise<void> =>
    // FormData will be automatically handled by axios with correct Content-Type
    httpClient
      .post('/api/user/updateImageProfile', request.body)
      .then(() => undefined),
};

export default queryUser;
