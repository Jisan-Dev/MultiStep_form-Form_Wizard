"use client";

import { useState } from "react";
import Step1 from "./components/Step1";
import { FormProvider } from "./contexts/FormContext";
import FormProgress from "./components/FormProgress";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    <Step1 key={1} nextStep={() => setCurrentStep(2)} />,
    // <Step2 key={2}
    //   nextStep={() => setCurrentStep(3)}
    //   prevStep={() => setCurrentStep(1)}
    // />,
    // <Step3 key={3}
    //   nextStep={() => setCurrentStep(4)}
    //   prevStep={() => setCurrentStep(2)}
    // />,
    // <Summary key={4} />
  ];

  return (
    <FormProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <FormProgress currentStep={currentStep} />
          {steps[currentStep - 1]}
        </div>
      </div>
    </FormProvider>
  );
}
