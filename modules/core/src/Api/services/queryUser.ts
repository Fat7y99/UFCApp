import type { User, ApiRequest } from '@modules/core';
import { httpClient } from '@modules/core';
import type { UpdateProfileBody } from './queryUser.types';

const queryUser = {
  // TODO: Change params, endpoint, method, and response mapping based on API requirements.
  getUserDetails: () =>
    httpClient.get<User>('/user').then(response => response.data),
  // Get current user details
  getCurrentUser: async (): Promise<User & { imageUrl?: string }> => {
    const userResponse = await httpClient.get<User>('/api/user/me');
    const user = userResponse.data;

    // Check if user has an image path field (could be imagePath, image, profileImage, etc.)
    let imageUrl = (user as any).imageUrl
      ? `http://34.166.196.89:8080/api/media?path=${(user as any).imageUrl}`
      : '';

    return {
      ...user,
      imageUrl,
    };
  },
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
