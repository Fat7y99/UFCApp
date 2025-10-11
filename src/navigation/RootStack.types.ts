import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  splash: undefined;
  networkLogs: undefined;
  login: undefined;
  home: undefined;
  notifications: undefined;
  landing: undefined;
  signup: undefined;
  forgotPassword: undefined;
  otpVerification: undefined;
  help: undefined;
  contactUs: undefined;
  changePassword: undefined;
  editProfile: undefined;
};

type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type { RootStackParamList, RootStackScreenProps };
