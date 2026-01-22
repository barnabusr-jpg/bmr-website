import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DiagnosticProgress from "@/components/diagnostic/DiagnosticProgress";
import DiagnosticStep from "@/components/diagnostic/DiagnosticStep";
import { diagnosticDimensions } from "@/data/diagnosticQuestions";
import { ArrowLeft, ArrowRight, ClipboardCheck } from "lucide-react";
import { sendEmail } from "@/lib/email";
import { calculateDiagnosticScores } from "@/lib/diagnosticScoring";
import { generateDiagnosticEmailHtml } from "@/lib/emailTemplates";
import { useRouter } from "next/router";

const DiagnosticFlow = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(12);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const totalSteps = diagnosticDimensions.length;
  const currentDimension = diagnosticDimensions[currentStep - 1];

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const isCurrentStepComplete = () => {
    return currentDimension.questions.every((q) => answers[q.id]);
  };

  const handleNext = () => {
    if (!isCurrentStepComplete()) {
      toast({
        title: "All questions required",
        description: "Please answer all questions before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (typeof window !== "undefined") {
        const email = localStorage.getItem("formDataEmail");
        const subject = localStorage.getItem("formDataCompany");
        const message = localStorage.getItem("formDataNotes");
        const calculatedScores = calculateDiagnosticScores(answers);
        const html = generateDiagnosticEmailHtml({ scores: calculatedScores });

        // Navigate to results page with answers
        //Send to user
        sendEmail({
          subject: subject,
          to: email,
          message: message,
          html: html,
        });
        //Send to client
        sendEmail({
          subject: subject,
          to: process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "",
          message: message,
          html: html,
        });
      }

      router.push({
        pathname: "/promise-gap/diagnostic/results",
        query: { answers: JSON.stringify(answers) },
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Get cluster badge color
  const getClusterColor = (cluster: string) => {
    switch (cluster) {
      case "trust":
        return "bg-accent/10 text-accent border-accent/20";
      case "govern":
        return "bg-secondary/30 text-foreground border-secondary/40";
      case "evolve":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      default:
        return "bg-accent/10 text-accent border-accent/20";
    }
  };

  const getClusterLabel = (cluster: string) => {
    return cluster.charAt(0).toUpperCase() + cluster.slice(1);
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-32 px-6">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-12"
          >
            {/* Header Badge */}
            <div className="text-center space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20"
              >
                <ClipboardCheck className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-accent">
                  Promise Gap™ Diagnostic
                </span>
              </motion.div>

              {/* Cluster indicator */}
              <motion.div
                key={currentDimension.cluster}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center"
              >
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getClusterColor(
                    currentDimension.cluster,
                  )}`}
                >
                  {getClusterLabel(currentDimension.cluster)} Pillar
                </span>
              </motion.div>
            </div>

            {/* Progress Bar */}
            <DiagnosticProgress
              currentStep={currentStep}
              totalSteps={totalSteps}
            />

            {/* Step Content */}
            <div className="bg-card border border-border rounded-lg p-8 md:p-10">
              <AnimatePresence mode="wait">
                <DiagnosticStep
                  key={currentStep}
                  dimensionTitle={currentDimension.title}
                  dimensionDescription={currentDimension.description}
                  questions={currentDimension.questions}
                  answers={answers}
                  onAnswerChange={handleAnswerChange}
                />
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="gap-2 transition-all duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              <Button
                onClick={handleNext}
                className="gap-2 transition-all duration-200"
              >
                {currentStep === totalSteps ? "View Results" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DiagnosticFlow;
