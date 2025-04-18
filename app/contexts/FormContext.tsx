"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  zipcode: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface FormContextType {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

export const FormContext = createContext<FormContextType>({} as FormContextType);

/**
 * Form Provider Component
 * Wraps the application to provide form state management
 */
export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>({} as FormData);

  return <FormContext.Provider value={{ formData, setFormData }}>{children}</FormContext.Provider>;
}

/**
 * Custom hook for accessing form context
 * @returns Form state and updater function
 */
export const useFormContext = () => useContext(FormContext);
