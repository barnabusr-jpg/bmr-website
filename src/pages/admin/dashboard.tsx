"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Activity, Building2, Send, X, Zap, CheckCircle, FileText, ChevronDown, ChevronUp, Clock, Mail } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [nodeDetails, setNodeDetails] = useState<any[]>([]);
  const [selectedAudit, setSelectedAudit] = useState<any>(null);
  const [emails, setEmails] = useState({ exec: "", mgr: "", tech: "" });

  const fetchLedger = useCallback(async () => {
    const { data } = await supabase.from('audits').select('*').order('created_at', { ascending: false });
    setData(data || []);
  }, []);

  const refreshNodes = useCallback(async (id: string) => {
    const { data } = await supabase.from('operators').select('persona_type, status').eq('audit_id', id);
    if (data) setNodeDetails(data);
  }, []);

  const triggerActivation = async () => {
    setIsUpdating(true);
    try {
      await fetch('/api/dispatch-directives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orgName: selectedAudit.org_name,
          parentAuditId: selectedAudit.id,
          emails: { EXECUTIVE: emails.exec, MANAGERIAL: emails.mgr, TECHNICAL: emails.tech }
        })
      });
      setSelectedAudit(null);
      fetchLedger();
    } catch (e) { console.error(e); }
    finally { setIsUpdating(false); }
  };

  const runSynthesis = async (auditId: string) => {
    setIsUpdating(true);
    await fetch('/api/synthesize-fracture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ auditId })
    });
    await fetchLedger();
    setIsUpdating(false);
  };

  // ... [ToggleRow, useEffect & Table Render logic] ...
  // Ensure "GENERATE_FORENSIC_DOSSIER" button links to `/results/${audit.id}`
}
