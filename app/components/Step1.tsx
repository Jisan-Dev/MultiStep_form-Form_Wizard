"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFormContext } from "../contexts/FormContext";
import { step1Schema } from "../lib/validation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface Step1Types {
  fullName: string;
  email: string;
  phone: string;
}

export default function Step1({ nextStep }: { nextStep: () => void }) {
  // Access global form state
  const { formData, setFormData } = useFormContext();

  // Form initialization with validation
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: formData,
  });

  // Handle valid form submission
  const onSubmit = (data: Step1Types) => {
    setFormData((prev) => ({ ...prev, ...data }));
    nextStep();
  };

  // Auto-focus first field on mount
  useEffect(() => {
    setFocus("fullName");
  }, [setFocus]); // setFocus is stable, no infinite loops

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium" htmlFor="name">
          Full Name
        </label>
        <input {...register("fullName")} id="name" className="mt-1 p-2 w-full rounded border border-gray-300" />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input {...register("email")} id="email" className="mt-1 p-2 w-full rounded border border-gray-300" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="phone">
          Phone No.
        </label>
        <input {...register("phone")} id="phone" className="mt-1 p-2 w-full rounded border border-gray-300" />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>

      <div className="flex justify-end">
        <button type="submit" className="bg-blue-700 hover:bg-blue-800 cursor-pointer transition-all text-white px-4 py-2 rounded-md">
          Next
        </button>
      </div>
    </form>
  );
}
