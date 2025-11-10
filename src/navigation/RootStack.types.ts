import type { SuccessType } from '@src/screens/Success/types';
import type { Notification } from '@modules/core';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  splash: undefined;
  networkLogs: undefined;
  login: undefined;
  home: undefined;
  notifications: undefined;
  notificationDetails: { notification: Notification };
  landing: undefined;
  signup: undefined;
  forgotPassword: undefined;
  otpVerification: {
    resendOtpHandler?: () => void;
    phone?: string;
    isForgetPassword?: boolean;
    signupData?: {
      email?: string;
      name?: string;
      idNumber?: string;
      phone?: string;
      password?: string;
      username?: string;
    };
  };
  resetPassword: {
    phone?: string;
    otp?: string;
  };
  resetPasswordSuccess: undefined;
  help: undefined;
  faqs: undefined;
  faqDetails: { faq: { id: string; question: string; answer: string } };
  contactUs: undefined;
  changePassword: undefined;
  editProfile: undefined;
  settings: undefined;
  privacyPolicy: undefined;
  termsAndConditions: undefined;
  smeFinancing: undefined;
  smeStep1: { serviceId: number; title?: string };
  smeStep2: {
    serviceId: number;
    title?: string;
    customerLiability?: {
      bankName?: string;
      currency?: string;
      liabilityType?: string;
      monthlyInstallment?: number;
      remainingBalance?: number;
    };
  };
  realEstateFinancing: undefined;
  realEstateStep1: { serviceId: number; title?: string };
  realEstateStep2: {
    serviceId: number;
    title?: string;
    customerBaseInfo?: {
      name?: string;
      phone?: string;
      birthDate?: string;
      employer?: string;
      jobTitle?: string;
    };
  };
  realEstateStep3: {
    serviceId: number;
    title?: string;
    customerBaseInfo?: {
      name?: string;
      phone?: string;
      birthDate?: string;
      employer?: string;
      jobTitle?: string;
    };
    customerLiability?: {
      bankName?: string;
      currency?: string;
      liabilityType?: string;
      monthlyInstallment?: number;
      remainingBalance?: number;
    };
  };
  personalStep1: { serviceId?: number; title?: string };
  personalStep2: {
    serviceId: number;
    title?: string;
    customerBaseInfo?: {
      name?: string;
      phone?: string;
      birthDate?: string;
      employer?: string;
      jobTitle?: string;
      serviceStartDate?: string;
    };
  };
  personalStep3: {
    serviceId: number;
    title?: string;
    customerBaseInfo?: {
      name?: string;
      phone?: string;
      birthDate?: string;
      employer?: string;
      jobTitle?: string;
      serviceStartDate?: string;
    };
    customerLiability?: {
      bankName?: string;
      currency?: string;
      liabilityType?: string;
      monthlyInstallment?: number;
      remainingBalance?: number;
    };
  };
  offers: undefined;
  offerDetails: {
    offer: { id: string; title: string; description: string; isOdd: boolean };
  };
  applyToOffer: {
    offer: { id: string; title: string; description: string; isOdd: boolean };
  };
  success: {
    type: SuccessType;
  };
  signUpSuccess: undefined;
};

type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type { RootStackParamList, RootStackScreenProps };
