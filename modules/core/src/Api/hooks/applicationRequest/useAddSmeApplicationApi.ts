import { useMutation } from '@tanstack/react-query';
import type {
  ApiRequest,
  ApplicationResponse,
  ServerError,
  SmeApplicationRequestBody,
} from '@modules/core';
import { queryApplicationRequest } from '@modules/core';
import type { UseMutationOptions } from '@tanstack/react-query';

const useAddSmeApplicationApi = (
  options?: Omit<
    UseMutationOptions<
      ApplicationResponse,
      ServerError,
      ApiRequest<SmeApplicationRequestBody>
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    ApplicationResponse,
    ServerError,
    ApiRequest<SmeApplicationRequestBody>
  >({
    mutationFn: request => queryApplicationRequest.addSme(request),
    ...(options ?? {}),
  });

export default useAddSmeApplicationApi;
