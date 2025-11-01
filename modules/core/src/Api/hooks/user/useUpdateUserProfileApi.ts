import { useQueryClient, useMutation } from '@tanstack/react-query';

import { queryUser } from '@modules/core';
import type {
  User,
  ServerError,
  ApiRequest,
  UpdateProfileBody,
} from '@modules/core';
import type { UseMutationOptions } from '@tanstack/react-query';

const useUpdateUserProfileApi = (
  options?: Omit<
    UseMutationOptions<User, ServerError, ApiRequest<UpdateProfileBody>>,
    'mutationFn'
  >,
) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options ?? {};

  return useMutation<User, ServerError, ApiRequest<UpdateProfileBody>>({
    mutationFn: request => queryUser.updateProfile(request),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...restOptions,
  });
};

const useUpdateProfileApi = (
  options?: Omit<
    UseMutationOptions<User, ServerError, ApiRequest<UpdateProfileBody>>,
    'mutationFn'
  >,
) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options ?? {};

  return useMutation<User, ServerError, ApiRequest<UpdateProfileBody>>({
    mutationFn: request => queryUser.updateProfile(request),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...restOptions,
  });
};

export { useUpdateProfileApi };
export default useUpdateUserProfileApi;
