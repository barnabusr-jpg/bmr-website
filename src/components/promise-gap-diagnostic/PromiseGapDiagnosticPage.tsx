import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import DiagnosticResultsContent from "./DiagnosticResultsContent";

const lensDefinitions: Record<string, string> = {
  "Executive": "Focus: Strategic alignment, enterprise risk stewardship, and long-term ROI stability.",
  "Manager": "Focus: Operational workflow synchronization, adoption friction, and team output.",
  "Technical": "Focus: System reliability, architectural integrity, and forensic data accuracy."
};

const diagnosticQuestions = [
  { id: 1, lens: "HAI", text: "How do teams handle verification of AI outputs before sharing them?", options: [
    { label: "Level 4: Forensic Assurance (Optimized)", strength: 5, weight: 8 },
    { label: "Level 3: Protocolized Verification", strength: 3, weight: 3 },
    { label: "Level 2: Ad-Hoc / Fragmented Cycles", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  { id: 2, lens: "HAI", text: "What is the process for identifying the cause of AI errors?", options: [
    { label: "Level 4: Real-Time Root-Cause Telemetry", strength: 5, weight: 8 },
    { label: "Level 3: Formalized Forensic Retrospectives", strength: 3, weight: 3 },
    { label: "Level 2: Tactical Incident Investigation", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  { id: 3, lens: "HAI", text: "How do teams handle situations where AI tools may not be optimal?", options: [
    { label: "Level 4: Dynamic Edge-Case Optimization", strength: 5, weight: 8 },
    { label: "Level 3: Integrated Exception Workflows", strength: 3, weight: 3 },
    { label: "Level 2: Manual Tool Bypassing", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  { id: 4, lens: "HAI", text: "How does the organization review AI risk appetite against performance?", options: [
    { label: "Level 4: Predictive Risk Modeling", strength: 5, weight: 8 },
    { label: "Level 3: Data-Driven Performance Benchmarking", strength: 3, weight: 3 },
    { label: "Level 2: Qualitative Risk Assessment", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  { id: 5, lens: "AVS", text: "What is the standard process for pre-deployment risk reviews?", options: [
    { label: "Level 4: Automated Deployment Guardrails", strength: 5, weight: 8 },
    { label: "Level 3: Formalized Risk Tiering", strength: 3, weight: 3 },
    { label: "Level 2: Fragmented Review Capacity", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  { id: 6, lens: "AVS", text: "How is responsibility assigned for AI failures?", options: [
    { label: "Level 4: Persistent Accountability Telemetry", strength: 5, weight: 8 },
    { label: "Level 3: Optimized Response Pathways", strength: 3, weight: 3 },
    { label: "Level 2: Fragmented Ownership Matrix", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  { id: 7, lens: "AVS", text: "How is AI compliance managed after deployment?", options: [
    { label: "Level 4: Continuous Drift Detection", strength: 5, weight: 8 },
    { label: "Level 3: Dynamic Compliance Benchmarking", strength: 3, weight: 3 },
    { label: "Level 2: Static Post-Launch Oversight", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  { id: 8, lens: "AVS", text: "What level of effort is required to maintain AI tools?", options: [
    { label: "Level 4: Autonomous Maintenance Telemetry", strength: 5, weight: 8 },
    { label: "Level 3: Strategic Lifecycle Optimization", strength: 3, weight: 3 },
    { label: "Level 2: Manual Correction Overhead", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  { id: 9, lens: "IGF", text: "How are human corrections fed back into AI systems?", options: [
    { label: "Level 4: Retraining Loop Automation", strength: 5, weight: 8 },
    { label: "Level 3: Systematic Correction Refinement", strength: 3, weight: 3 },
    { label: "Level 2: Fragmented Feedback Ingestion", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  { id: 10, lens: "IGF", text: "How does leadership prioritize AI projects?", options: [
    { label: "Level 4: Impact Telemetry Alignment", strength: 5, weight: 8 },
    { label: "Level 3: Strategic Maturity Thresholds", strength: 3, weight: 3 },
    { label: "Level 2: Technical Feature Prioritization", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  { id: 11, lens: "IGF", text: "How does the organization prepare teams for AI deployments?", options: [
    { label: "Level 4: Systematic Readiness Reporting", strength: 5, weight: 8 },
    { label: "Level 3: Standardized Impact Benchmarking", strength: 3, weight: 3 },
    { label: "Level 2: Tactical Change Readiness", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]},
  { id: 12, lens: "IGF", text: "How is the gap between expected and actual AI ROI measured?", options: [
    { label: "Level 4: Automated Value Tracking", strength: 5, weight: 8 },
    { label: "Level 3: Pilot ROI Benchmarking", strength: 3, weight: 3 },
    { label: "Level 2: Speculative Impact Reporting", strength: 2, weight: 1 },
    { label: "Level 1: Reactive / Undefined Baseline", strength: 1, weight: 0 }
  ]}
];

export default function PromiseGapDiagnosticPage() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', email: '', confirmEmail: '', org: '', role: 'Executive' 
  });
  const [answers, setAnswers] = useState<any[]>([]);

  // FIX: Added normalized case-insensitive comparison logic
  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    
    const primary = formData.email.trim().toLowerCase();
    const secondary = formData.confirmEmail.trim().toLowerCase();

    if (primary !== secondary) {
      setEmailError(true);
      return; // Force matching emails before proceeding
    }
    
    setEmailError(false);
    setStep(1);
  };

  const handleAnswer = async (option: any) => {
    const currentLens = diagnosticQuestions[step
