import { useMutation } from '@tanstack/react-query';
import type {
  ApiRequest,
  ApplicationResponse,
  ServerError,
  RealEstateApplicationRequestBody,
} from '@modules/core';
import { queryApplicationRequest } from '@modules/core';
import type { UseMutationOptions } from '@tanstack/react-query';

const useAddRealEstateApplicationApi = (
  options?: Omit<
    UseMutationOptions<
      ApplicationResponse,
      ServerError,
      ApiRequest<RealEstateApplicationRequestBody>
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    ApplicationResponse,
    ServerError,
    ApiRequest<RealEstateApplicationRequestBody>
  >({
    mutationFn: request => queryApplicationRequest.addRealEstate(request),
    ...(options ?? {}),
  });

export default useAddRealEstateApplicationApi;
