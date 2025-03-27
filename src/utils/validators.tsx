
// Form validation functions

export const validateRequired = (value: string): boolean => {
  return value.trim() !== '';
};

export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone: string): boolean => {
  return /^\d{10}$/.test(phone);
};

export const validatePAN = (pan: string): boolean => {
  return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
};

export const validatePincode = (pincode: string): boolean => {
  return /^\d{6}$/.test(pincode);
};

export const validateAadhaar4Digits = (aadhaar: string): boolean => {
  return /^\d{4}$/.test(aadhaar);
};

export const validateIFSC = (ifsc: string): boolean => {
  return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);
};

export const validateAccountNumber = (accountNumber: string): boolean => {
  // Account numbers can vary in length but should be numeric
  return /^\d{9,18}$/.test(accountNumber);
};

export const validatePercentage = (percentage: string): boolean => {
  const num = Number(percentage);
  return !isNaN(num) && num >= 1 && num <= 100;
};

// Helper to get error message
export const getErrorMessage = (fieldName: string, validationType: string): string => {
  const errorMessages: Record<string, Record<string, string>> = {
    required: {
      default: 'This field is required',
      name: 'Name is required',
      email: 'Email is required',
      phone: 'Phone number is required',
      pan: 'PAN is required',
      dob: 'Date of birth is required',
      gender: 'Gender is required',
      fatherName: 'Father\'s name is required',
      motherName: 'Mother\'s name is required',
      aadhaar: 'Last 4 digits of Aadhaar are required',
      address1: 'Address line 1 is required',
      pincode: 'Pincode is required',
      relation: 'Relation is required',
      percentage: 'Percentage is required',
      accountNumber: 'Account number is required',
      ifsc: 'IFSC code is required',
      accountHolderName: 'Account holder name is required',
      accountType: 'Account type is required',
      signature: 'Signature is required',
    },
    format: {
      email: 'Please enter a valid email address',
      phone: 'Phone number must be 10 digits',
      pan: 'PAN must be in format: ABCDE1234F',
      pincode: 'Pincode must be 6 digits',
      aadhaar: 'Please enter exactly 4 digits',
      ifsc: 'IFSC must be 11 characters in format: ABCD0123456',
      accountNumber: 'Please enter a valid account number',
      percentage: 'Percentage must be between 1 and 100',
    }
  };

  return errorMessages[validationType]?.[fieldName] || errorMessages[validationType]?.default || 'Invalid input';
};
