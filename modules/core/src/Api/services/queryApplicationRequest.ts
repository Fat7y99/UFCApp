import type { ApiRequest } from '@modules/core';
import { httpClient } from '@modules/core';
import type {
  PersonalApplicationRequestBody,
  ApplicationResponse,
  RealEstateApplicationRequestBody,
  SmeApplicationRequestBody,
} from './queryApplicationRequest.types';
const queryApplicationRequest = {
  // TODO: Change params, endpoint, method, and response mapping based on API requirements.
  addPersonal: (
    request: ApiRequest<PersonalApplicationRequestBody>,
  ): Promise<ApplicationResponse> =>
    httpClient
      .post<ApplicationResponse>(
        '/api/application-request/add/personal',
        request.body,
      )
      .then(response => response.data),
  // TODO: Change params, endpoint, method, and response mapping based on API requirements.
  addRealEstate: (
    request: ApiRequest<RealEstateApplicationRequestBody>,
  ): Promise<ApplicationResponse> =>
    httpClient
      .post<ApplicationResponse>(
        '/api/application-request/add/realState',
        request.body,
      )
      .then(response => response.data),
  // TODO: Change params, endpoint, method, and response mapping based on API requirements.
  addSme: (
    request: ApiRequest<SmeApplicationRequestBody>,
  ): Promise<ApplicationResponse> =>
    httpClient
      .post<ApplicationResponse>(
        '/api/application-request/add/sme',
        request.body,
      )
      .then(response => response.data),
};

export default queryApplicationRequest;
