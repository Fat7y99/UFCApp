import type {
  ApiRequest,
  ForgetPasswordBody,
  LoginBody,
  LoginResponse,
  LogoutResponse,
  SendOTPBody,
  SendOTPResponse,
  SignupBody,
  SignupResponse,
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
      .post<LoginResponse>('/oauth2/token', params.toString())
      .then(response => response.data);
  },
  // TODO: Change params, endpoint, method, and response mapping based on API requirements.
  signup: (request: ApiRequest<SignupBody>): Promise<SignupResponse> =>
    httpClient
      .post<SignupResponse>('/api/user/addEndUser', request.body)
      .then(response => response.data),
  // Send OTP for a new user
  sendOTP: (request: ApiRequest<SendOTPBody>): Promise<SendOTPResponse> =>
    httpClient
      .post<SendOTPResponse>('/api/user/addEndUser/sendOTP', request.body)
      .then(response => response.data),
  // Send OTP for forget password
  sendForgetPasswordOTP: (
    request: ApiRequest<SendOTPBody>,
  ): Promise<SendOTPResponse> =>
    httpClient
      .post<SendOTPResponse>('/api/user/forgetPassword/sendOTP', request.body)
      .then(response => response.data),
  // Reset password using OTP for forgot password
  forgetPassword: (request: ApiRequest<ForgetPasswordBody>): Promise<void> =>
    httpClient
      .post('/api/user/forgetPassword', request.body)
      .then(() => undefined),
  // TODO: Change params, endpoint, method, and response mapping based on API requirements.
  logout: () =>
    httpClient.post<LogoutResponse>('/logout').then(response => response.data),
};

export default queryAuth;
