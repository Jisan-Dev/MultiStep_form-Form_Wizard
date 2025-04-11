import React, { useEffect, useState } from "react";
import { useFormContext } from "../contexts/FormContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema } from "../lib/validation";

interface Step3ParamTypes {
  nextStep: () => void;
  prevStep: () => void;
}

interface Step3Types {
  username: string;
  password: string;
  confirmPassword: string;
}

const Step3 = ({ nextStep, prevStep }: Step3ParamTypes) => {
  const { formData, setFormData } = useFormContext();
  const [prev, setPrev] = useState(false);

  const onSubmit = (data: Step3Types) => {
    if (prev) {
      setFormData((prev) => ({ ...prev, ...data }));
      prevStep();
    } else {
      setFormData((prev) => ({ ...prev, ...data }));
      nextStep();
    }
  };

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step3Schema),
    defaultValues: formData,
  });

  // Auto-focus first field on mount
  useEffect(() => {
    setFocus("username");
  }, [setFocus]); // setFocus is stable, no infinite loops

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium" htmlFor="username">
          Username
        </label>
        <input {...register("username")} id="username" className="mt-1 p-2 w-full rounded border border-gray-300" />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input type="password" id="password" {...register("password")} className="mt-1 p-2 w-full rounded border border-gray-300" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input type="password" id="confirmPassword" {...register("confirmPassword")} className="mt-1 p-2 w-full rounded border border-gray-300" />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
      </div>

      <div className="flex justify-between">
        <button type="submit" onClick={() => setPrev(true)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-300">
          Previous
        </button>
        <button type="submit" className="bg-blue-700 hover:bg-blue-800 cursor-pointer transition-all text-white px-4 py-2 rounded-md">
          Next
        </button>
      </div>
    </form>
  );
};

export default Step3;
