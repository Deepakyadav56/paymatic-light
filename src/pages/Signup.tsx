
import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { StepperProvider } from '@/components/stepper/StepperContext';
import Stepper from '@/components/stepper/Stepper';
import { useStepper } from '@/components/stepper/StepperContext';
import AnimatedLogo from '@/components/ui-elements/AnimatedLogo';
import { ArrowLeft, ArrowRight, Calendar, Check, ChevronDown, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { 
  validateRequired, 
  validateEmail, 
  validatePhone, 
  validatePAN, 
  validatePincode, 
  validateAadhaar4Digits, 
  validateIFSC,
  validateAccountNumber,
  validatePercentage,
  getErrorMessage
} from '@/utils/validators';

// Define form data type structure
interface FormData {
  // Step 1: Personal Details
  name: string;
  pan: string;
  dob: string;
  gender: string;
  fatherName: string;
  motherName: string;
  aadhaar: string;
  
  // Step 2: Communication Details
  address1: string;
  address2: string;
  pincode: string;
  email: string;
  phone: string;
  
  // Step 3: Nominee Details
  nomineeName: string;
  nomineePan: string;
  relation: string;
  nomineeDob: string;
  percentage: string;
  
  // Step 4: Bank Details
  accountNumber: string;
  ifsc: string;
  accountHolderName: string;
  accountType: string;
  
  // Step 5: Signature
  signature: File | null;
}

// Initial form data
const initialFormData: FormData = {
  name: '',
  pan: '',
  dob: '',
  gender: '',
  fatherName: '',
  motherName: '',
  aadhaar: '',
  address1: '',
  address2: '',
  pincode: '',
  email: '',
  phone: '',
  nomineeName: '',
  nomineePan: '',
  relation: '',
  nomineeDob: '',
  percentage: '',
  accountNumber: '',
  ifsc: '',
  accountHolderName: '',
  accountType: '',
  signature: null
};

// Define form errors type
type FormErrors = {
  [key in keyof FormData]?: string;
};

// Step titles
const STEPS = [
  'Personal Details',
  'Communication Details',
  'Nominee Details',
  'Bank Details',
  'Signature'
];

// Input component for form fields
interface InputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  maxLength
}) => {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-payx-red">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        className={cn(
          "w-full px-4 py-3 rounded-lg border focus-teal transition-all duration-200",
          error ? "border-payx-red" : "border-gray-200"
        )}
      />
      {error && <p className="mt-1 text-xs text-payx-red">{error}</p>}
    </div>
  );
};

// Select component for dropdowns
interface SelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error?: string;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  error,
  required = false
}) => {
  return (
    <div className="mb-5 relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-payx-red">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={cn(
            "w-full px-4 py-3 rounded-lg border appearance-none focus-teal transition-all duration-200",
            error ? "border-payx-red" : "border-gray-200"
          )}
        >
          <option value="" disabled>
            Select {label}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-500" />
      </div>
      {error && <p className="mt-1 text-xs text-payx-red">{error}</p>}
    </div>
  );
};

// Date picker component
interface DatePickerProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  required = false
}) => {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-payx-red">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type="date"
          value={value}
          onChange={onChange}
          className={cn(
            "w-full px-4 py-3 rounded-lg border focus-teal transition-all duration-200",
            error ? "border-payx-red" : "border-gray-200"
          )}
        />
        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-500" />
      </div>
      {error && <p className="mt-1 text-xs text-payx-red">{error}</p>}
    </div>
  );
};

// File Upload component
interface FileUploadProps {
  id: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  preview?: string | null;
  required?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  id,
  label,
  onChange,
  error,
  preview,
  required = false
}) => {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-payx-red">*</span>}
      </label>
      <div 
        className={cn(
          "w-full p-6 rounded-lg border-2 border-dashed flex flex-col items-center justify-center transition-all duration-200",
          error ? "border-payx-red" : "border-gray-200 hover:border-payx-teal"
        )}
      >
        {preview ? (
          <div className="mb-4">
            <img src={preview} alt="Preview" className="max-h-32 rounded-lg shadow-sm" />
          </div>
        ) : (
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
        )}
        
        <p className="text-sm text-gray-500 mb-2">
          {preview ? "Change signature" : "Click or drag to upload signature"}
        </p>
        <p className="text-xs text-gray-400 mb-4">
          Supports: JPG, PNG (Max 2MB)
        </p>
        <input
          id={id}
          type="file"
          onChange={onChange}
          accept="image/jpeg, image/png"
          className="hidden"
        />
        <button
          type="button"
          onClick={() => document.getElementById(id)?.click()}
          className="px-4 py-2 bg-payx-teal bg-opacity-10 text-payx-teal rounded-lg text-sm font-medium hover:bg-opacity-20 transition-all"
        >
          {preview ? "Change File" : "Select File"}
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-payx-red">{error}</p>}
    </div>
  );
};

// Footer component with prev/next buttons
interface StepFooterProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isFormValid: boolean;
}

const StepFooter: React.FC<StepFooterProps> = ({
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep,
  isFormValid
}) => {
  return (
    <div className="flex justify-between mt-8">
      {!isFirstStep ? (
        <button
          type="button"
          onClick={onPrevious}
          className="px-6 py-3 border border-gray-200 text-payx-dark rounded-lg font-medium inline-flex items-center hover:border-payx-teal hover:text-payx-teal transition-all"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </button>
      ) : (
        <Link
          to="/"
          className="px-6 py-3 border border-gray-200 text-payx-dark rounded-lg font-medium inline-flex items-center hover:border-payx-teal hover:text-payx-teal transition-all"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={!isFormValid}
        className={cn(
          "px-6 py-3 rounded-lg font-medium inline-flex items-center transition-all",
          isFormValid
            ? "bg-payx-teal text-white hover:shadow-lg"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        )}
      >
        {isLastStep ? 'Submit' : 'Next'} {!isLastStep && <ArrowRight className="ml-2 h-4 w-4" />}
      </button>
    </div>
  );
};

// The form steps components
const PersonalDetailsStep: React.FC<{
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formErrors: FormErrors;
}> = ({ formData, setFormData, formErrors }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-payx-dark mb-6">Personal Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <Input
          id="name"
          label="Full Name"
          value={formData.name}
          onChange={handleChange}
          error={formErrors.name}
          placeholder="As per PAN card"
          required
        />
        <Input
          id="pan"
          label="PAN Number"
          value={formData.pan}
          onChange={handleChange}
          error={formErrors.pan}
          placeholder="ABCDE1234F"
          required
          maxLength={10}
        />
        <DatePicker
          id="dob"
          label="Date of Birth"
          value={formData.dob}
          onChange={handleChange}
          error={formErrors.dob}
          required
        />
        <Select
          id="gender"
          label="Gender"
          value={formData.gender}
          onChange={handleChange}
          error={formErrors.gender}
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
          ]}
          required
        />
        <Input
          id="fatherName"
          label="Father's Name"
          value={formData.fatherName}
          onChange={handleChange}
          error={formErrors.fatherName}
          placeholder="Father's full name"
          required
        />
        <Input
          id="motherName"
          label="Mother's Name"
          value={formData.motherName}
          onChange={handleChange}
          error={formErrors.motherName}
          placeholder="Mother's full name"
          required
        />
        <Input
          id="aadhaar"
          label="Last 4 Digits of Aadhaar"
          value={formData.aadhaar}
          onChange={handleChange}
          error={formErrors.aadhaar}
          placeholder="Last 4 digits only"
          required
          maxLength={4}
        />
      </div>
    </div>
  );
};

const CommunicationDetailsStep: React.FC<{
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formErrors: FormErrors;
}> = ({ formData, setFormData, formErrors }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-payx-dark mb-6">Communication Details</h2>
      <div className="grid grid-cols-1 gap-x-6">
        <Input
          id="address1"
          label="Address Line 1"
          value={formData.address1}
          onChange={handleChange}
          error={formErrors.address1}
          placeholder="House/Flat/Block No., Street"
          required
        />
        <Input
          id="address2"
          label="Address Line 2"
          value={formData.address2}
          onChange={handleChange}
          error={formErrors.address2}
          placeholder="Area, Landmark (Optional)"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Input
            id="pincode"
            label="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            error={formErrors.pincode}
            placeholder="6-digit pincode"
            required
            maxLength={6}
          />
          <Input
            id="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
            placeholder="Your email address"
            required
          />
          <Input
            id="phone"
            label="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            error={formErrors.phone}
            placeholder="10-digit mobile number"
            required
            maxLength={10}
          />
        </div>
      </div>
    </div>
  );
};

const NomineeDetailsStep: React.FC<{
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formErrors: FormErrors;
}> = ({ formData, setFormData, formErrors }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-payx-dark mb-6">Nominee Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <Input
          id="nomineeName"
          label="Nominee Name"
          value={formData.nomineeName}
          onChange={handleChange}
          error={formErrors.nomineeName}
          placeholder="Full name of nominee"
          required
        />
        <Input
          id="nomineePan"
          label="Nominee PAN"
          value={formData.nomineePan}
          onChange={handleChange}
          error={formErrors.nomineePan}
          placeholder="ABCDE1234F"
          required
          maxLength={10}
        />
        <Select
          id="relation"
          label="Relation"
          value={formData.relation}
          onChange={handleChange}
          error={formErrors.relation}
          options={[
            { value: 'spouse', label: 'Spouse' },
            { value: 'parent', label: 'Parent' },
            { value: 'child', label: 'Child' },
            { value: 'other', label: 'Other' },
          ]}
          required
        />
        <DatePicker
          id="nomineeDob"
          label="Nominee Date of Birth"
          value={formData.nomineeDob}
          onChange={handleChange}
          error={formErrors.nomineeDob}
          required
        />
        <Input
          id="percentage"
          label="Percentage"
          value={formData.percentage}
          onChange={handleChange}
          error={formErrors.percentage}
          placeholder="Enter value between 1-100"
          required
        />
      </div>
    </div>
  );
};

const BankDetailsStep: React.FC<{
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formErrors: FormErrors;
}> = ({ formData, setFormData, formErrors }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-payx-dark mb-6">Bank Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <Input
          id="accountNumber"
          label="Account Number"
          value={formData.accountNumber}
          onChange={handleChange}
          error={formErrors.accountNumber}
          placeholder="Your bank account number"
          required
        />
        <Input
          id="ifsc"
          label="IFSC Code"
          value={formData.ifsc}
          onChange={handleChange}
          error={formErrors.ifsc}
          placeholder="ABCD0123456"
          required
          maxLength={11}
        />
        <Input
          id="accountHolderName"
          label="Account Holder Name"
          value={formData.accountHolderName}
          onChange={handleChange}
          error={formErrors.accountHolderName}
          placeholder="Name as per bank records"
          required
        />
        <Select
          id="accountType"
          label="Account Type"
          value={formData.accountType}
          onChange={handleChange}
          error={formErrors.accountType}
          options={[
            { value: 'savings', label: 'Savings' },
            { value: 'current', label: 'Current' },
          ]}
          required
        />
      </div>
    </div>
  );
};

const SignatureStep: React.FC<{
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formErrors: FormErrors;
  signaturePreview: string | null;
  setSignaturePreview: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ formData, setFormData, formErrors, signaturePreview, setSignaturePreview }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2MB limit");
        return;
      }
      
      // Update form data
      setFormData((prev) => ({ ...prev, signature: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignaturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-payx-dark mb-6">Upload Signature</h2>
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Please upload a clear image of your signature. This will be used for verification purposes.
        </p>
        <FileUpload
          id="signature"
          label="Signature"
          onChange={handleFileChange}
          error={formErrors.signature}
          preview={signaturePreview}
          required
        />
      </div>
      <div className="p-4 bg-payx-teal bg-opacity-10 rounded-lg">
        <p className="text-sm text-payx-dark">
          By submitting this form, you confirm that all the information provided is accurate and complete. Your details will be used to create your account and for verification purposes.
        </p>
      </div>
    </div>
  );
};

// Main signup component with step management
const SignupForm: React.FC = () => {
  const { currentStep, goToNextStep, goToPreviousStep, isFirstStep, isLastStep } = useStepper();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);

  // Validate current step - use memoization to prevent recreation on each render
  const validateStep = useCallback(() => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Step 1: Personal Details
    if (currentStep === 1) {
      if (!validateRequired(formData.name)) {
        newErrors.name = getErrorMessage('name', 'required');
        isValid = false;
      }
      
      if (!validateRequired(formData.pan)) {
        newErrors.pan = getErrorMessage('pan', 'required');
        isValid = false;
      } else if (!validatePAN(formData.pan)) {
        newErrors.pan = getErrorMessage('pan', 'format');
        isValid = false;
      }
      
      if (!validateRequired(formData.dob)) {
        newErrors.dob = getErrorMessage('dob', 'required');
        isValid = false;
      }
      
      if (!validateRequired(formData.gender)) {
        newErrors.gender = getErrorMessage('gender', 'required');
        isValid = false;
      }
      
      if (!validateRequired(formData.fatherName)) {
        newErrors.fatherName = getErrorMessage('fatherName', 'required');
        isValid = false;
      }
      
      if (!validateRequired(formData.motherName)) {
        newErrors.motherName = getErrorMessage('motherName', 'required');
        isValid = false;
      }
      
      if (!validateRequired(formData.aadhaar)) {
        newErrors.aadhaar = getErrorMessage('aadhaar', 'required');
        isValid = false;
      } else if (!validateAadhaar4Digits(formData.aadhaar)) {
        newErrors.aadhaar = getErrorMessage('aadhaar', 'format');
        isValid = false;
      }
    }

    // Step 2: Communication Details
    else if (currentStep === 2) {
      if (!validateRequired(formData.address1)) {
        newErrors.address1 = getErrorMessage('address1', 'required');
        isValid = false;
      }
      
      if (!validateRequired(formData.pincode)) {
        newErrors.pincode = getErrorMessage('pincode', 'required');
        isValid = false;
      } else if (!validatePincode(formData.pincode)) {
        newErrors.pincode = getErrorMessage('pincode', 'format');
        isValid = false;
      }
      
      if (!validateRequired(formData.email)) {
        newErrors.email = getErrorMessage('email', 'required');
        isValid = false;
      } else if (!validateEmail(formData.email)) {
        newErrors.email = getErrorMessage('email', 'format');
        isValid = false;
      }
      
      if (!validateRequired(formData.phone)) {
        newErrors.phone = getErrorMessage('phone', 'required');
        isValid = false;
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = getErrorMessage('phone', 'format');
        isValid = false;
      }
    }

    // Step 3: Nominee Details
    else if (currentStep === 3) {
      if (!validateRequired(formData.nomineeName)) {
        newErrors.nomineeName = getErrorMessage('name', 'required');
        isValid = false;
      }
      
      if (!validateRequired(formData.nomineePan)) {
        newErrors.nomineePan = getErrorMessage('pan', 'required');
        isValid = false;
      } else if (!validatePAN(formData.nomineePan)) {
        newErrors.nomineePan = getErrorMessage('pan', 'format');
        isValid = false;
      }
      
      if (!validateRequired(formData.relation)) {
        newErrors.relation = getErrorMessage('relation', 'required');
        isValid = false;
      }
      
      if (!validateRequired(formData.nomineeDob)) {
        newErrors.nomineeDob = getErrorMessage('dob', 'required');
        isValid = false;
      }
      
      if (!validateRequired(formData.percentage)) {
        newErrors.percentage = getErrorMessage('percentage', 'required');
        isValid = false;
      } else if (!validatePercentage(formData.percentage)) {
        newErrors.percentage = getErrorMessage('percentage', 'format');
        isValid = false;
      }
    }

    // Step 4: Bank Details
    else if (currentStep === 4) {
      if (!validateRequired(formData.accountNumber)) {
        newErrors.accountNumber = getErrorMessage('accountNumber', 'required');
        isValid = false;
      } else if (!validateAccountNumber(formData.accountNumber)) {
        newErrors.accountNumber = getErrorMessage('accountNumber', 'format');
        isValid = false;
      }
      
      if (!validateRequired(formData.ifsc)) {
        newErrors.ifsc = getErrorMessage('ifsc', 'required');
        isValid = false;
      } else if (!validateIFSC(formData.ifsc)) {
        newErrors.ifsc = getErrorMessage('ifsc', 'format');
        isValid = false;
      }
      
      if (!validateRequired(formData.accountHolderName)) {
        newErrors.accountHolderName = getErrorMessage('accountHolderName', 'required');
        isValid = false;
      }
      
      if (!validateRequired(formData.accountType)) {
        newErrors.accountType = getErrorMessage('accountType', 'required');
        isValid = false;
      }
    }

    // Step 5: Signature
    else if (currentStep === 5) {
      if (!formData.signature) {
        newErrors.signature = getErrorMessage('signature', 'required');
        isValid = false;
      }
    }

    setFormErrors(newErrors);
    return isValid;
  }, [currentStep, formData]);

  // Handle next button click
  const handleNext = useCallback(() => {
    const isValid = validateStep();
    
    if (isValid) {
      if (isLastStep) {
        // Submit the form
        console.log('Form submitted successfully!', formData);
        toast.success('Registration successful!');
        
        // Here you would typically send the data to an API
      } else {
        // Go to next step
        goToNextStep();
      }
    }
  }, [validateStep, isLastStep, formData, goToNextStep]);

  // Memoize isCurrentStepValid to prevent unnecessary recalculation
  const isCurrentStepValid = useMemo(() => {
    return validateStep();
  }, [validateStep]);

  // Render the current step
  const renderStep = useCallback(() => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetailsStep
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
          />
        );
      case 2:
        return (
          <CommunicationDetailsStep
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
          />
        );
      case 3:
        return (
          <NomineeDetailsStep
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
          />
        );
      case 4:
        return (
          <BankDetailsStep
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
          />
        );
      case 5:
        return (
          <SignatureStep
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
            signaturePreview={signaturePreview}
            setSignaturePreview={setSignaturePreview}
          />
        );
      default:
        return null;
    }
  }, [currentStep, formData, formErrors, signaturePreview]);

  return (
    <div className="w-full">
      <Stepper />
      <div className="w-full max-w-4xl mx-auto p-6 glass rounded-xl shadow-elevated">
        <form className="w-full">{renderStep()}</form>
        <StepFooter
          onPrevious={goToPreviousStep}
          onNext={handleNext}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          isFormValid={isCurrentStepValid}
        />
      </div>
    </div>
  );
};

// Main Signup page component
const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-8 px-4">
      <header className="max-w-7xl mx-auto mb-8 flex items-center justify-center">
        <AnimatedLogo />
      </header>
      
      <div className="max-w-7xl mx-auto">
        <StepperProvider steps={STEPS}>
          <SignupForm />
        </StepperProvider>
      </div>
    </div>
  );
};

export default Signup;
