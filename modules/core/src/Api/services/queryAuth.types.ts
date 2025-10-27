export interface LoginBody {
  username?: string;
  password?: string;
  grant_type?: string;
}

export interface SignupBody {
  email?: string;
  name?: string;
  idNumber?: string;
  phone?: string;
  password?: string;
  username?: string;
}
