import { motion } from "framer-motion";

interface DiagnosticProgressProps {
  currentStep: number;
  totalSteps: number;
}

const DiagnosticProgress = ({ currentStep, totalSteps }: DiagnosticProgressProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">Step {currentStep} of {totalSteps}</span>
        <span className="text-accent font-medium">{Math.round(progress)}% Complete</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default DiagnosticProgress;
