import { useQuery } from '@tanstack/react-query';
import { queryFavourite } from '@modules/core';
import type {
  FavouriteListResponse,
  FavouriteListRequestBody,
  ServerError,
  ApiRequest,
} from '@modules/core';
import type { UseQueryOptions } from '@tanstack/react-query';

const useGetFavouriteListApi = (
  request: ApiRequest<FavouriteListRequestBody>,
  options?: Omit<
    UseQueryOptions<FavouriteListResponse, ServerError>,
    'queryFn' | 'queryKey'
  >,
) =>
  useQuery<FavouriteListResponse, ServerError>({
    queryFn: () => queryFavourite.getFavouriteList(request),
    queryKey: ['favourites', 'list', request.body?.pageNumber, request.body?.pageSize],
    ...(options ?? {}),
  });

export default useGetFavouriteListApi;

