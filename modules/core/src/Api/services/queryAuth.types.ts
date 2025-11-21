export interface LoginBody {
  username?: string;
  password?: string;
  grant_type?: string;
}
export interface RefreshTokenBody {
  refresh_token?: string;
  grant_type?: string;
}
export interface SignupBody {
  email?: string;
  name?: string;
  idNumber?: string;
  phone?: string;
  otp?: string;
  password?: string;
  username?: string;
}

export interface SendOTPBody {
  phone: string;
  username?: string;
  email?: string;
}

export interface ForgetPasswordBody {
  otp: string;
  password: string;
  phone: string;
}

export interface ChangePasswordBody {
  password: string;
  newPassword: string;
}
