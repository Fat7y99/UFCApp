import { useMutation } from '@tanstack/react-query';

import { queryAuth } from '@modules/core';
import type {
  SignupResponse,
  ServerError,
  ApiRequest,
  SignupBody,
} from '@modules/core';
import type { UseMutationOptions } from '@tanstack/react-query';

const useSignupApi = (
  options?: Omit<
    UseMutationOptions<SignupResponse, ServerError, ApiRequest<SignupBody>>,
    'mutationFn'
  >,
) =>
  useMutation<SignupResponse, ServerError, ApiRequest<SignupBody>>({
    mutationFn: request => queryAuth.signup(request),
    ...(options ?? {}),
  });

export default useSignupApi;
