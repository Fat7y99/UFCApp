import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';

/**
 * Error code to message mapping
 */
export enum ErrorCode {
  UNAUTHORIZED = 1,
  OBJECT_NOT_FOUND = 2,
  PROPERTY_NOT_FOUND = 3,
  PROPERTY_IS_NULL = 4,
  OBJECT_ALREADY_FOUND = 5,
  USERNAME_ALREADY_FOUND = 6,
  PHONE_ALREADY_FOUND = 7,
  EMAIL_ALREADY_FOUND = 8,
  INVALID_INPUT = 9,
  FAILED_TO_SEND_OTP = 10,
  OTP_VERIFICATION_FAILED = 11,
  PHONE_NOT_FOUND = 12,
  INTERNAL_SERVER_ERROR = 13,
  MAX_LIMIT_SEND_OTP = 14,
  VALIDATION_FAILED = 15,
}

/**
 * Error code to translation key mapping
 */
const ERROR_CODE_TO_TRANSLATION_KEY: Record<ErrorCode, string> = {
  [ErrorCode.UNAUTHORIZED]: 'unauthorized',
  [ErrorCode.OBJECT_NOT_FOUND]: 'objectNotFound',
  [ErrorCode.PROPERTY_NOT_FOUND]: 'propertyNotFound',
  [ErrorCode.PROPERTY_IS_NULL]: 'propertyIsNull',
  [ErrorCode.OBJECT_ALREADY_FOUND]: 'objectAlreadyFound',
  [ErrorCode.USERNAME_ALREADY_FOUND]: 'usernameAlreadyFound',
  [ErrorCode.PHONE_ALREADY_FOUND]: 'phoneAlreadyFound',
  [ErrorCode.EMAIL_ALREADY_FOUND]: 'emailAlreadyFound',
  [ErrorCode.INVALID_INPUT]: 'invalidInput',
  [ErrorCode.FAILED_TO_SEND_OTP]: 'failedToSendOTP',
  [ErrorCode.OTP_VERIFICATION_FAILED]: 'otpVerificationFailed',
  [ErrorCode.PHONE_NOT_FOUND]: 'phoneNotFound',
  [ErrorCode.INTERNAL_SERVER_ERROR]: 'internalServerError',
  [ErrorCode.MAX_LIMIT_SEND_OTP]: 'maxLimitSendOTP',
  [ErrorCode.VALIDATION_FAILED]: 'validationFailed',
};

/**
 * Get error message from error code
 *
 * @param errorCode - The error code from the API response
 * @returns The translated error message, or undefined if code is not found
 */
export const getErrorMessageFromCode = (
  errorCode: number | undefined | null,
): string | undefined => {
  if (errorCode === undefined || errorCode === null) {
    return undefined;
  }

  const translationKey = ERROR_CODE_TO_TRANSLATION_KEY[errorCode as ErrorCode];

  if (!translationKey) {
    return undefined;
  }

  return translate(`${TranslationNamespaces.COMMON}:${translationKey}`);
};

/**
 * Process error response and return appropriate error message
 *
 * @param errorData - The error data from API response (can have code, message, error, errors)
 * @param fallbackMessage - Optional fallback message if error code is not found
 * @returns The processed error message
 */
export const processErrorCode = (
  errorData?: {
    code?: number;
    message?: string;
    error?: string;
    errors?: string | { message?: string[] };
  } | null,
  fallbackMessage?: string,
): string => {
  // First, try to get message from error code
  if (errorData?.code !== undefined && errorData?.code !== null) {
    const codeMessage = getErrorMessageFromCode(errorData.code);
    if (codeMessage) {
      return codeMessage;
    }
  }

  // Fallback to message field
  if (errorData?.message) {
    return errorData.message;
  }

  // Fallback to error field
  if (errorData?.error) {
    return errorData.error;
  }

  // Fallback to errors field (string)
  if (typeof errorData?.errors === 'string') {
    return errorData.errors;
  }

  // Fallback to errors.message array
  if (
    errorData?.errors &&
    typeof errorData.errors === 'object' &&
    Array.isArray(errorData.errors.message) &&
    errorData.errors.message.length > 0
  ) {
    return errorData.errors.message.join('\n');
  }

  // Return fallback message or unknown error
  return (
    fallbackMessage || translate(`${TranslationNamespaces.COMMON}:unknownError`)
  );
};
