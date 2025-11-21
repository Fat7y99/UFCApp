import { useMutation } from '@tanstack/react-query';

import { queryAuth } from '@modules/core';
import type {
  ServerError,
  ApiRequest,
  ChangePasswordBody,
} from '@modules/core';
import type { UseMutationOptions } from '@tanstack/react-query';

const useChangePasswordApi = (
  options?: Omit<
    UseMutationOptions<void, ServerError, ApiRequest<ChangePasswordBody>>,
    'mutationFn'
  >,
) =>
  useMutation<void, ServerError, ApiRequest<ChangePasswordBody>>({
    mutationFn: request => queryAuth.changePassword(request),
    ...(options ?? {}),
  });

export default useChangePasswordApi;

