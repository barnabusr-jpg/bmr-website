"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Option {
  label: string;
  value: number;
}

interface DiagnosticStepProps {
  dimensionTitle: string;
  questionText: string;
  options: Option[];
  answers: Record<string, string>;
  questionId: string;
  onAnswerChange: (questionId: string, value: string) => void;
}

const DiagnosticStep = ({
  dimensionTitle,
  questionText,
  options,
  answers,
  questionId,
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
      {/* Forensic Header */}
      <div className="space-y-3 border-l-2 border-red-600 pl-6">
        <h2 className="text-xs font-mono font-bold text-red-600 uppercase tracking-[0.3em]">
          {dimensionTitle}
        </h2>
        <p className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none max-w-4xl">
          {questionText}
        </p>
      </div>

      {/* Options List */}
      <div className="space-y-4">
        <RadioGroup
          value={answers[questionId] || ""}
          onValueChange={(val) => onAnswerChange(questionId, val)}
          className="flex flex-col gap-3"
        >
          {options.map((option) => {
            const optionId = `${questionId}-${option.value}`;
            return (
              <div key={option.value} className="flex items-center w-full">
                <RadioGroupItem
                  value={option.value.toString()}
                  id={optionId}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={optionId}
                  className={
                    "w-full px-8 py-6 border border-slate-800 bg-slate-950/50 cursor-pointer transition-all duration-300 " +
                    "hover:border-red-600/50 peer-data-[state=checked]:border-red-600 " +
                    "peer-data-[state=checked]:bg-red-600/10 peer-data-[state=checked]:text-red-500 " +
                    "text-xs font-bold uppercase tracking-[0.2em] flex justify-between items-center group"
                  }
                >
                  <span className="group-hover:translate-x-2 transition-transform duration-300">
                    {option.label}
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] w-8 bg-slate-800 group-hover:bg-red-600 transition-colors" />
                    <span className="font-mono text-[10px] opacity-30 group-hover:opacity-100 transition-opacity">
                      VAL_{option.value.toString().padStart(2, '0')}
                    </span>
                  </div>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </motion.div>
  );
};

export default DiagnosticStep;
