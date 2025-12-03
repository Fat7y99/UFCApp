// Format number with commas and 2 decimal places
export const formatAmount = (value: string): string => {
  // Remove all non-numeric characters except decimal point
  let numericValue = value.replace(/[^0-9.]/g, '');

  // Prevent only dots - if input is just ".", convert to "0."
  if (numericValue === '.') {
    return '0.';
  }

  // If input starts with "." (and has more characters), convert to "0."
  if (numericValue.startsWith('.')) {
    numericValue = '0' + numericValue;
  }

  // Split by decimal point
  const parts = numericValue.split('.');

  // Ensure integer part is not empty - if empty, use "0"
  let integerPart = parts[0] || '0';

  // Remove leading zeros except for "0" itself
  if (
    integerPart?.length > 1 &&
    integerPart?.startsWith('0') &&
    integerPart !== '0'
  ) {
    integerPart = integerPart.replace(/^0+/, '') || '0';
  }

  // Format the integer part with commas
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Handle decimal part (limit to 2 decimal places)
  const decimalPart = parts[1] ? parts[1].substring(0, 2) : '';

  // Combine parts
  if (decimalPart) {
    return `${integerPart}.${decimalPart}`;
  } else if (numericValue.includes('.')) {
    return `${integerPart}.`;
  } else {
    return integerPart;
  }
};

// Format number without decimal places (for years, age, etc.)
export const formatNumber = (value: string): string => {
  const numericValue = value.replace(/[^0-9]/g, '');
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Format phone number
export const formatPhoneNumber = (value: string): string => {
  const numericValue = value.replace(/[^0-9]/g, '');

  // Format as +966 XX XXX XXXX for Saudi numbers
  if (numericValue.length <= 2) {
    return numericValue;
  } else if (numericValue.length <= 4) {
    return `+966 ${numericValue}`;
  } else if (numericValue.length <= 7) {
    return `+966 ${numericValue.substring(0, 2)} ${numericValue.substring(2)}`;
  } else if (numericValue.length <= 9) {
    return `+966 ${numericValue.substring(0, 2)} ${numericValue.substring(2, 5)} ${numericValue.substring(5)}`;
  } else {
    return `+966 ${numericValue.substring(0, 2)} ${numericValue.substring(2, 5)} ${numericValue.substring(5, 9)}`;
  }
};

// Input constraints based on field type
export const getInputConstraints = (fieldType: string) => {
  switch (fieldType) {
    case 'amount':
    case 'salary':
    case 'installment':
    case 'balance':
    case 'value':
    case 'income':
      return {
        keyboardType: 'numeric' as const,
        maxLength: 15,
        formatValue: formatAmount,
      };

    case 'phone':
    case 'mobile':
      return {
        keyboardType: 'phone-pad' as const,
        maxLength: 13,
        formatValue: formatPhoneNumber,
      };

    case 'year':
    case 'age':
      return {
        keyboardType: 'numeric' as const,
        maxLength: 3,
        formatValue: formatNumber,
      };

    case 'text':
    default:
      return {
        keyboardType: 'default' as const,
        maxLength: 50,
        formatValue: (value: string) => value,
      };
  }
};

// Validate input based on field type
export const validateInput = (value: string, fieldType: string): boolean => {
  switch (fieldType) {
    case 'amount':
    case 'salary':
    case 'installment':
    case 'balance':
    case 'value':
    case 'age':
    case 'income':
      const numericValue = value // Convert Arabic digits → English digits
        .replace(/[\u0660-\u0669]/g, d => String(d.charCodeAt(0) - 0x0660))
        // Convert Arabic decimal comma → English decimal point
        .replace(/،/g, '.')
        // Keep ONLY digits + decimal point
        .replace(/[^0-9.]/g, '');
      console.log('numericValue', numericValue);
      return numericValue.length > 0;

    case 'phone':
    case 'mobile':
      const phoneValue = value.replace(/[^0-9]/g, '');
      return phoneValue.length >= 9 && phoneValue.length <= 12;

    case 'year':
    case 'age':
      const yearValue = value.replace(/[^0-9]/g, '');
      const year = parseInt(yearValue, 10);
      return year > 0 && year < 1000;

    case 'text':
    default:
      return value.trim().length > 0;
  }
};

export const validateEmail = (emailPass: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(emailPass);
};

export const formatInput = (text: string, noDecimal?: boolean) => {
  // Detect if the user typed Arabic digits
  const isArabic = /[\u0660-\u0669]/.test(text);

  // Convert Arabic → English ONLY internally
  const normalized = text.replace(/[\u0660-\u0669]/g, d =>
    String(d.charCodeAt(0) - 0x0660),
  );

  // Extract only digits
  const cleanText = normalized.replace(/[^0-9]/g, '');
  if (!cleanText) return '';

  let formatted = '';

  if (noDecimal) {
    // Format based on original language
    formatted = Number(cleanText).toLocaleString(isArabic ? 'ar-EG' : 'en-US');
  } else {
    if (cleanText.length === 1) {
      formatted = `0.0${cleanText}`;
    } else if (cleanText.length === 2) {
      formatted = `0.${cleanText}`;
    } else {
      formatted = `${Number(cleanText.slice(0, -2)).toLocaleString(isArabic ? 'ar-EG' : 'en-US')}.${cleanText.slice(-2)}`;
    }
  }

  // If Arabic input → convert final digits back to Arabic
  if (isArabic) {
    formatted = formatted.replace(/[0-9]/g, d =>
      String.fromCharCode(d.charCodeAt(0) + 0x0660),
    );
  }

  return formatted;
};

export const filterEnglishLettersAndSpaces = (text: string): string =>
  //allow arabic, english letters and spaces
  text.replace(/[^a-zA-Z\s\u0600-\u06FF]/g, '');
export const convertArabicNumberToEnglish = (number: string) =>
  number.replace(/[\u0660-\u0669]/g, d => String(d.charCodeAt(0) - 0x0660));

export const toArabicDigits = (value: string | number) => {
  const english = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const arabic = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

  return value
    .toString()
    .replace(/[0-9]/g, digit => arabic[english.indexOf(digit)]);
};
