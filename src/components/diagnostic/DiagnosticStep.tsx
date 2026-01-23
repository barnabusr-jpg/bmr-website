import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Question {
  id: string;
  text: string;
}

interface DiagnosticStepProps {
  dimensionTitle: string;
  dimensionDescription?: string;
  questions: Question[];
  answers: Record<string, string>;
  onAnswerChange: (questionId: string, value: string) => void;
}

const answerOptions = [
  { value: "1", label: "Strongly Disagree" },
  { value: "2", label: "Disagree" },
  { value: "3", label: "Neutral" },
  { value: "4", label: "Agree" },
  { value: "5", label: "Strongly Agree" },
];

const DiagnosticStep = ({
  dimensionTitle,
  dimensionDescription,
  questions,
  answers,
  onAnswerChange,
}: DiagnosticStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-10"
    >
      {/* Dimension Header */}
      <div className="space-y-3">
        <h2 className="text-2xl md:text-3xl font-semibold">{dimensionTitle}</h2>
        {dimensionDescription && (
          <p className="text-foreground/70 leading-[1.7]">{dimensionDescription}</p>
        )}
      </div>

      {/* Questions */}
      <div className="space-y-10">
        {questions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="space-y-5"
          >
            <Label className="text-base font-medium leading-relaxed block">
              {index + 1}. {question.text}
            </Label>
            <RadioGroup
              value={answers[question.id] || ""}
              onValueChange={(value) => onAnswerChange(question.id, value)}
              className="flex flex-wrap gap-3"
            >
              {answerOptions.map((option) => (
                <div key={option.value} className="flex items-center">
                  <RadioGroupItem
                    value={option.value}
                    id={`${question.id}-${option.value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`${question.id}-${option.value}`}
                    className="px-4 py-2 rounded-lg border border-border bg-card cursor-pointer transition-all duration-200 hover:border-accent/50 peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/10 peer-data-[state=checked]:text-accent text-sm"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DiagnosticStep;
