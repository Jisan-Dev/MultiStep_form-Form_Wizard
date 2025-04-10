"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFormContext } from "../contexts/FormContext";
import { step1Schema } from "../lib/validation";
import { useForm } from "react-hook-form";

export default function Step1({ nextStep }: { nextStep: () => void }) {
  const { formData, setFormData } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: formData,
  });

  const onSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    nextStep();
  };

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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Next
        </button>
      </div>
    </form>
  );
}
