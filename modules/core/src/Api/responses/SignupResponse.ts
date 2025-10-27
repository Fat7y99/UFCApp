import type { User } from '@modules/core';

// TODO: Construct signup response based on API.
interface SignupResponse {
  user?: User;
  message?: string;
}

export default SignupResponse;
