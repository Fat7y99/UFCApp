import { useMutation } from '@tanstack/react-query';

import { queryAuth } from '@modules/core';
import type {
  ServerError,
  ApiRequest,
  ForgetPasswordBody,
} from '@modules/core';
import type { UseMutationOptions } from '@tanstack/react-query';

const useForgetPasswordApi = (
  options?: Omit<
    UseMutationOptions<void, ServerError, ApiRequest<ForgetPasswordBody>>,
    'mutationFn'
  >,
) =>
  useMutation<void, ServerError, ApiRequest<ForgetPasswordBody>>({
    mutationFn: request => queryAuth.forgetPassword(request),
    ...(options ?? {}),
  });

export default useForgetPasswordApi;
