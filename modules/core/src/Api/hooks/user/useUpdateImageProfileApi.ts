import { useQueryClient, useMutation } from '@tanstack/react-query';
import { queryUser } from '@modules/core';
import type { ServerError, ApiRequest } from '@modules/core';
import type { UseMutationOptions } from '@tanstack/react-query';

const useUpdateImageProfileApi = (
  options?: Omit<
    UseMutationOptions<void, ServerError, ApiRequest<FormData>>,
    'mutationFn'
  >,
) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options ?? {};

  return useMutation<void, ServerError, ApiRequest<FormData>>({
    mutationFn: request => queryUser.updateImageProfile(request),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...restOptions,
  });
};

export default useUpdateImageProfileApi;
