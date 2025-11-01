export enum SuccessType {
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',
  PASSWORD_RESET = 'PASSWORD_RESET',
  SIGNUP = 'SIGNUP',
  MESSAGE_SENT = 'MESSAGE_SENT',
  OFFER_APPLIED = 'OFFER_APPLIED',
  PROFILE_UPDATED = 'PROFILE_UPDATED',
}

export interface SuccessScreenConfig {
  title: string;
  message: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
}
