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
  otpVerification: undefined;
  help: undefined;
  faqs: undefined;
  faqDetails: { faq: { id: string; question: string; answer: string } };
  contactUs: undefined;
  changePassword: undefined;
  editProfile: undefined;
  smeFinancing: undefined;
  smeStep1: undefined;
  smeStep2: undefined;
  realEstateFinancing: undefined;
  realEstateStep1: undefined;
  realEstateStep2: undefined;
  realEstateStep3: undefined;
  personalStep1: undefined;
  personalStep2: undefined;
  personalStep3: undefined;
  offers: undefined;
  offerDetails: {
    offer: { id: string; title: string; description: string; isOdd: boolean };
  };
  applyToOffer: {
    offer: { id: string; title: string; description: string; isOdd: boolean };
  };
};

type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type { RootStackParamList, RootStackScreenProps };
