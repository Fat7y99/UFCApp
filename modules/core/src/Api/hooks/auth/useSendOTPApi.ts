import { useMutation } from '@tanstack/react-query';

import { queryAuth } from '@modules/core';
import type {
  SendOTPResponse,
  ServerError,
  ApiRequest,
  SendOTPBody,
} from '@modules/core';
import type { UseMutationOptions } from '@tanstack/react-query';

const useSendOTPApi = (
  options?: Omit<
    UseMutationOptions<SendOTPResponse, ServerError, ApiRequest<SendOTPBody>>,
    'mutationFn'
  >,
) =>
  useMutation<SendOTPResponse, ServerError, ApiRequest<SendOTPBody>>({
    mutationFn: request => queryAuth.sendOTP(request),
    ...(options ?? {}),
  });

export default useSendOTPApi;
