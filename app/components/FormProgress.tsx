/**
 * - Visual representation of 3-step progress
 * - Connector lines between steps
 */
export default function FormProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center 
            ${currentStep >= step ? "bg-blue-600 text-white" : "bg-gray-200 text-neutral-800"}`}>
            {step}
          </div>

          {/* Connector Line (not shown after last step) */}
          {step < 3 && <div className="w-16 h-1 bg-gray-200 mx-2"></div>}
        </div>
      ))}
    </div>
  );
}
