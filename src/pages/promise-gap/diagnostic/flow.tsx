// src/pages/promise-gap/diagnostic/flow.tsx
import { useState } from 'react';
import { sendDiagnosticEmail } from "@/lib/email"; // Match your new utility name

// Inside your component's handleSubmit function:
const handleSubmit = async (finalAnswers: any, userEmail: string, name: string) => {
  // Call the new utility that hits the /api/send-email route
  await sendDiagnosticEmail({
    to: userEmail,
    firstName: name,
    answers: finalAnswers
  });
};
