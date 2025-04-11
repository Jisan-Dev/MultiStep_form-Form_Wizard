import React, { useEffect, useState } from "react";
import { useFormContext } from "../contexts/FormContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema } from "../lib/validation";

interface Step2ParamTypes {
  nextStep: () => void;
  prevStep: () => void;
}

interface Step2Types {
  street: string;
  city: string;
  zipcode: string;
}

const Step2 = ({ nextStep, prevStep }: Step2ParamTypes) => {
  const { formData, setFormData } = useFormContext();
  const [prev, setPrev] = useState(false);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: formData,
  });

  const onSubmit = (data: Step2Types) => {
    if (prev) {
      setFormData((prev) => ({ ...prev, ...data }));
      prevStep();
    } else {
      setFormData((prev) => ({ ...prev, ...data }));
      nextStep();
    }
  };

  // Auto-focus first field on mount
  useEffect(() => {
    setFocus("street");
  }, [setFocus]); // setFocus is stable, no infinite loops

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="street" className="block text-sm font-medium">
          Street
        </label>
        <input type="text" {...register("street")} id="street" className="mt-1 p-2 w-full rounded border border-gray-300" />
        {errors.street && <p className="text-red-500 text-sm"> {errors.street.message} </p>}
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="city">
          City
        </label>
        <input {...register("city")} id="city" className="mt-1 p-2 w-full rounded border border-gray-300" />
        {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="zipcode">
          Zip Code
        </label>
        <input {...register("zipcode")} id="zipcode" className="mt-1 p-2 w-full rounded border border-gray-300" />
        {errors.zipcode && <p className="text-red-500 text-sm">{errors.zipcode.message}</p>}
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

export default Step2;
