"use client";

import React from "react";
import { useFormContext } from "../contexts/FormContext";
import { useMutation } from "@tanstack/react-query";

const Summary = () => {
  const { formData } = useFormContext();

  // Simulate API submission
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (data: typeof formData) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return Promise.resolve({ status: 200 });
    },
    onSuccess: () => {
      console.log("Form submitted:", formData);
    },
  });
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">Review Your Information</h2>

      {/* Personal Information Section */}
      <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg">
        <h3 className="font-semibold mb-3 dark:text-neutral-200">Personal Information</h3>

        <dl className="space-y-2">
          <DataRow label="Full Name" value={formData.fullName} />
          <DataRow label="Email" value={formData.email} />
          <DataRow label="Phone" value={formData.phone} />
        </dl>
      </div>

      {/* Address Section */}
      <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg">
        <h3 className="font-semibold mb-3 dark:text-neutral-200">Address Details</h3>
        <dl className="space-y-2">
          <DataRow label="Street" value={formData.street} />
          <DataRow label="City" value={formData.city} />
          <DataRow label="Zip Code" value={formData.zipcode} />
        </dl>
      </div>

      {/* Account Section */}
      <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg">
        <h3 className="font-semibold mb-3 dark:text-neutral-200">Account Details</h3>
        <dl className="space-y-2">
          <DataRow label="Username" value={formData.username} />
          <DataRow label="Password" value={formData.password} />
        </dl>
      </div>

      <div className="flex flex-col items-center gap-4 mt-8">
        <button
          onClick={() => mutate(formData)}
          disabled={isPending || isSuccess}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            isPending ? "bg-neutral-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800 transition-all cursor-pointer text-white"
          }`}>
          {isPending ? "Submitting..." : isSuccess ? "Submitted!" : "Submit"}
        </button>

        {isSuccess && <div className="text-green-600 dark:text-green-400 text-center">✓ Successfully submitted the form!</div>}
      </div>
    </div>
  );
};

// Helper component for consistent data display
function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <dt className="text-neutral-600 dark:text-neutral-300">{label}</dt>
      <dd className="text-neutral-900 dark:text-white font-medium">{value}</dd>
    </div>
  );
}

export default Summary;
