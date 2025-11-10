import type { User, ApiRequest } from '@modules/core';
import { httpClient, queryMedia } from '@modules/core';
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
    let imageUrl = (user as any).imageUrl;

    if (imageUrl) {
      try {
        // Get media URL from path
        const mediaResponse = await queryMedia.getMedia({
          params: {
            path: imageUrl,
            // Optionally add thumb and width parameters if needed
            // thumb: 'true',
            // width: 200,
          },
        });

        // Media API returns an array, take the first element as the URL
        if (Array.isArray(mediaResponse) && mediaResponse.length > 0) {
          imageUrl = mediaResponse[0];
        }
      } catch (error) {
        // If media API fails, log but don't block user data
        console.warn('Failed to get media URL:', error);
      }
    }

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
