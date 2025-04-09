"use client";

import { useFormContext } from "./contexts/FormContext";

export default function Home() {
  const formC = useFormContext();
  console.log(formC);
  return (
    <div>
      <h1>Hello From Form Wizard</h1>
    </div>
  );
}
