"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Banknote, Stethoscope, Factory, ShoppingCart, ChevronRight } from "lucide-react";
import ForensicLoader from "@/components/ForensicLoader";
import { supabase } from "@/lib/supabaseClient";

// ... [LOCAL_QUESTIONS & sectors constants stay the same] ...

export default function ConsolidatedDiagnostic() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("triage");
  const [sector, setSector] = useState("finance");
  const [selectedLens, setSelectedLens] = useState<string | null>(null); 
  const [aiSpend, setAiSpend] = useState(1.2);
  const [operatorName, setOperatorName] = useState("");
  const [entityName, setEntityName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const getLiveMetrics = () => {
    const totalSum = Object.values(answers).reduce((a, b) => a + parseInt(b || "0"), 0);
    const scaledTotal = (totalSum * 0.04) * Math.pow(aiSpend / 1.2, 1.15);
    return { 
      decay: Math.min(Math.round((1 - (1 / (1 + scaledTotal / (aiSpend * 0.8)))) * 100), 98), 
      rework: (scaledTotal * 0.38).toFixed(1) 
    };
  };

  const logToDatabase = async (finalMetrics: any) => {
    try {
      // 1. Upsert Entity
      const { data: ent } = await supabase.from('entities')
        .upsert({ name: entityName.toUpperCase() }, { onConflict: 'name' })
        .select().single();

      // 2. Create Audit Record
      const { data: auditData } = await supabase.from('audits').insert([{ 
        org_name: entityName.toUpperCase(), 
        lead_email: email.toLowerCase(), 
        sector, 
        ai_spend: aiSpend, 
        status: 'LEAD',
        decay_pct: finalMetrics.decay,
        rework_tax: parseFloat(finalMetrics.rework),
        raw_responses: answers // Redundancy save
      }]).select().single();

      if (!auditData) throw new Error("Audit generation failed");

      // 3. Create/Link Operator AND Save Answers
      await supabase.from('operators').upsert({ 
        email: email.toLowerCase(), 
        full_name: operatorName.toUpperCase(), 
        entity_id: ent?.id, 
        audit_id: auditData.id, 
        persona_type: selectedLens, 
        raw_responses: answers, 
        status: 'COMPLETED' 
      });

      return auditData.id;
    } catch (e) { 
      console.error("DATA_FRACTURE:", e);
      return null; 
    }
  };

  // ... [Render logic with Step Triage/Intake/Audit stays the same] ...
  // Ensure the final onClick in step === 'audit' calls the updated logToDatabase
}
