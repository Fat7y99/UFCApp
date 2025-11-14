import type { ApiRequest } from '@modules/core';
import { httpClient } from '@modules/core';
import type {
  FavouriteResponse,
  FavouriteListRequestBody,
  FavouriteListResponse,
} from './queryFavourite.types';

const queryFavourite = {
  // Favourite a service
  favourite: (request: ApiRequest<void, number>): Promise<FavouriteResponse> =>
    httpClient
      .get<FavouriteResponse>(`/api/userFavourite/favourite/${request.pathVar}`)
      .then(response => response.data),

  // Unfavourite a service
  unfavourite: (
    request: ApiRequest<void, number>,
  ): Promise<FavouriteResponse> =>
    httpClient
      .get<FavouriteResponse>(
        `/api/userFavourite/unfavourite/${request.pathVar}`,
      )
      .then(response => response.data),

  // Get favourite list with pagination
  getFavouriteList: (
    request: ApiRequest<FavouriteListRequestBody>,
  ): Promise<FavouriteListResponse> =>
    httpClient
      .post<FavouriteListResponse>('/api/userFavourite/list', request.body)
      .then(response => ({
        ...response.data,
        list: response.data?.list?.filter(item => item.favourite),
      })),
};

export default queryFavourite;
