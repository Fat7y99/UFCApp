import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryFavourite } from '@modules/core';
import type { FavouriteResponse, ServerError, ApiRequest } from '@modules/core';
import type { UseMutationOptions } from '@tanstack/react-query';

const useFavouriteApi = (
  options?: Omit<
    UseMutationOptions<
      FavouriteResponse,
      ServerError,
      ApiRequest<void, number>
    >,
    'mutationFn'
  >,
) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options ?? {};

  return useMutation<FavouriteResponse, ServerError, ApiRequest<void, number>>({
    mutationFn: request => queryFavourite.favourite(request),
    onSuccess: (data, variables, context) => {
      // Invalidate favourite list to refresh it
      queryClient.invalidateQueries({ queryKey: ['favourites', 'list'] });
      onSuccess?.(data, variables, context, undefined);
    },
    ...restOptions,
  });
};

export default useFavouriteApi;
