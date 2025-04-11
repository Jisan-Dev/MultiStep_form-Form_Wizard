"use client";

import { useState } from "react";
import Step1 from "./components/Step1";
import { FormProvider } from "./contexts/FormContext";
import FormProgress from "./components/FormProgress";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Summary from "./components/Summary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DarkModeProvider from "./contexts/DarkModeProvider";
import ThemeToggle from "./components/ThemeToggle";

// Create a client
const queryClient = new QueryClient();

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    <Step1 key={1} nextStep={() => setCurrentStep(2)} />,
    <Step2 key={2} nextStep={() => setCurrentStep(3)} prevStep={() => setCurrentStep(1)} />,
    <Step3 key={3} nextStep={() => setCurrentStep(4)} prevStep={() => setCurrentStep(2)} />,
    <Summary key={4} />,
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <FormProvider>
          <div className="min-h-screen bg-blue-50/40 dark:bg-neutral-900 flex items-center justify-center p-4 transition-all duration-500">
            <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md text-neutral-800 dark:text-neutral-100 transition-all duration-500">
              <h1 className="text-center font-extrabold text-xl mb-5 text-blue-400">FormWizard</h1>
              <FormProgress currentStep={currentStep} />
              {steps[currentStep - 1]}
            </div>
          </div>
        </FormProvider>
        <ThemeToggle />
      </DarkModeProvider>
    </QueryClientProvider>
  );
}
