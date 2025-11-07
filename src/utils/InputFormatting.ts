// Format number with commas and 2 decimal places
export const formatAmount = (value: string): string => {
  // Remove all non-numeric characters except decimal point
  const numericValue = value.replace(/[^0-9.]/g, '');

  // Split by decimal point
  const parts = numericValue.split('.');

  // Format the integer part with commas
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Handle decimal part
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
    case 'income':
      const numericValue = value.replace(/[^0-9.]/g, '');
      return numericValue.length > 0 && !isNaN(parseFloat(numericValue));

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
