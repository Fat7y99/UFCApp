import { useQuery } from '@tanstack/react-query';
import { queryMedia } from '@modules/core';
import type {
  ServerError,
  ApiRequest,
  GetMediaParams,
  GetMediaResponse,
} from '@modules/core';
import type { UseQueryOptions } from '@tanstack/react-query';

const useGetMediaApi = (
  request: ApiRequest<void, GetMediaParams>,
  options?: Omit<
    UseQueryOptions<GetMediaResponse, ServerError>,
    'queryFn' | 'queryKey'
  >,
) =>
  useQuery<GetMediaResponse, ServerError>({
    queryFn: () => queryMedia.getMedia(request),
    queryKey: ['media', request.params?.path, request],
    enabled: Boolean(request.params?.path), // Only run if path is provided
    ...(options ?? {}),
  });

export default useGetMediaApi;
