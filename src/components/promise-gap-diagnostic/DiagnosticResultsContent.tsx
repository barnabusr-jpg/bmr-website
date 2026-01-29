import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DiagnosticResultsContent = () => {
  return (
    <div className="text-center py-12">
      <h2 className="text-3xl font-bold text-white mb-6">Diagnostic Complete</h2>
      <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
        Thank you for completing the Promise Gap assessment. Based on your inputs, we are 
        generating your custom report to help align your execution with your strategic promises.
      </p>
      <div className="flex justify-center gap-4">
        <Button asChild>
          <Link href="/contact">Schedule a Review</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default DiagnosticResultsContent;
