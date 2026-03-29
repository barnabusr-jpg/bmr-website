"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Hardened Question Interface
interface Question {
  id: string;
  text: string;
  category?: string;
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
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{dimensionTitle}</h2>
        {dimensionDescription && (
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            {dimensionDescription}
          </p>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-12">
        <AnimatePresence mode="popLayout">
          {questions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="space-y-5 p-1"
            >
              <Label className="text-base font-semibold leading-relaxed block text-card-foreground">
                <span className="text-red-500 mr-2">{index + 1}.</span>
                {question.text}
              </Label>
              
              <RadioGroup
                value={answers[question.id] || ""}
                onValueChange={(val) => onAnswerChange(question.id, val)}
                className="flex flex-wrap gap-3"
              >
                {answerOptions.map((option) => {
                  const optionId = `${question.id}-${option.value}`;
                  return (
                    <div key={option.value} className="flex items-center">
                      <RadioGroupItem
                        value={option.value}
                        id={optionId}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={optionId}
                        className={
                          "px-4 py-2.5 rounded-none border border-border bg-card cursor-pointer transition-all duration-300 " +
                          "hover:border-red-500/50 peer-data-[state=checked]:border-red-600 " +
                          "peer-data-[state=checked]:bg-red-600/10 peer-data-[state=checked]:text-red-500 " +
                          "text-xs font-bold uppercase tracking-widest"
                        }
                      >
                        {option.label}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DiagnosticStep;
