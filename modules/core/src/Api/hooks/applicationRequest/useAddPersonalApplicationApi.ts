import { useMutation } from '@tanstack/react-query';
import type {
  ApiRequest,
  ApplicationResponse,
  ServerError,
  PersonalApplicationRequestBody,
} from '@modules/core';
import { queryApplicationRequest } from '@modules/core';
import type { UseMutationOptions } from '@tanstack/react-query';

const useAddPersonalApplicationApi = (
  options?: Omit<
    UseMutationOptions<
      ApplicationResponse,
      ServerError,
      ApiRequest<PersonalApplicationRequestBody>
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    ApplicationResponse,
    ServerError,
    ApiRequest<PersonalApplicationRequestBody>
  >({
    mutationFn: request => queryApplicationRequest.addPersonal(request),
    ...(options ?? {}),
  });

export default useAddPersonalApplicationApi;
