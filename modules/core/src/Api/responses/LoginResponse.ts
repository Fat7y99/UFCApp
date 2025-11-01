// OAuth2 token response structure (matches API response format)
interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  expires_in?: number;
}

export default LoginResponse;
