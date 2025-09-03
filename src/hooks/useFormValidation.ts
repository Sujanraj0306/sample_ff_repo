import { useState } from 'react';

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

interface FieldValidation {
  [key: string]: ValidationRules;
}

interface ValidationErrors {
  [key: string]: string;
}

export const useFormValidation = (validationRules: FieldValidation) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = (name: string, value: string): string | null => {
    const rules = validationRules[name];
    if (!rules) return null;

    if (rules.required && !value.trim()) {
      return `${name} is required`;
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `${name} must be at least ${rules.minLength} characters`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return `${name} format is invalid`;
    }

    if (rules.custom) {
      return rules.custom(value);
    }

    return null;
  };

  const validate = (formData: { [key: string]: string }): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName] || '');
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleFieldBlur = (name: string, value: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error || '' }));
  };

  const clearErrors = () => {
    setErrors({});
    setTouched({});
  };

  return {
    errors,
    touched,
    validate,
    handleFieldBlur,
    clearErrors,
  };
};