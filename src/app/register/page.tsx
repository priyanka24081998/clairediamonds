"use client";

import { Suspense } from "react";
import Register from "./RegisterPage"; // Import the Register component

export default function RegisterWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Register />
    </Suspense>
  );
}
