import type {
  ApiRequest,
  LoginBody,
  LoginResponse,
  LogoutResponse,
} from '@modules/core';
import { httpClient } from '@modules/core';

const queryAuth = {
  // TODO: Change params, endpoint, method, and response mapping based on API requirements.
  login: (request: ApiRequest<LoginBody>): Promise<LoginResponse> => {
    const params = new URLSearchParams();
    if (request.body?.username)
      params.append('username', request.body.username);
    if (request.body?.password)
      params.append('password', request.body.password);
    params.append('grant_type', 'password');

    return httpClient
      .post<LoginResponse>('/oauth2/token', params)
      .then(response => response.data);
  },
  // TODO: Change params, endpoint, method, and response mapping based on API requirements.
  logout: () =>
    httpClient.post<LogoutResponse>('/logout').then(response => response.data),
};

export default queryAuth;
