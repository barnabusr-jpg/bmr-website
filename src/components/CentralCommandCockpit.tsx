"use client";
import React, { useState } from 'react';

interface CockpitProps {
  initialAuditId?: string;
  initialGroupId?: string;
  initialOrgName?: string;
  onSuccess?: () => void;
}

export default function CentralCommandCockpit({
  initialAuditId = '8e75a768-027e-4aa0-ab1b-6c574ccbd38c',
  initialGroupId = '8e75a768-027e-4aa0-ab1b-6c574ccbd38c',
  initialOrgName = 'SYSTEM TEST MATRIX',
  onSuccess
}: CockpitProps) {
  const [parentAuditId, setParentAuditId] = useState(initialAuditId);
  const [groupId, setGroupId] = useState(initialGroupId);
  const [orgName, setOrgName] = useState(initialOrgName);
  
  const [emails, setEmails] = useState({
    exec: 'barnabusr@gmail.com',
    manager: 'hello@bmradvisory.co',
    tech: 'barnabusr@outlook.com'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | null; text: string }>({
    type: null,
    text: ''
  });

  const handleEmailChange = (role: 'exec' | 'manager' | 'tech', value: string) => {
    setEmails(prev => ({ ...prev, [role]: value }));
  };

  const handleDeployDiagnostics = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;

    setIsProcessing(true);
    setStatusMessage({ type: null, text: 'Executing Triangulation Engine...' });

    try {
      const response = await fetch('/api/dispatch-directives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupId,
          orgName,
          parentAuditId,
          emails
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || result.error || 'Failed to dispatch diagnostics.');
      }

      setStatusMessage({ 
        type: 'success', 
        text: `🚀 SUCCESS: Engine initialized! Status: ${result.status}. Mode: ${result.compilationMode}` 
      });
      
      if (onSuccess) onSuccess();

    } catch (error: any) {
      console.error('Cockpit Directive Error:', error);
      setStatusMessage({ type: 'error', text: `❌ DEPLOYMENT CRASH: ${error.message}` });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDispatchVaultLinks = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    setStatusMessage({ type: null, text: 'Provisioning Secure Storage Vault Paths...' });

    try {
      const response = await fetch('/api/send-vault-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auditId: parentAuditId,
          orgName,
          email: emails.manager,
          userName: 'Primary Node Custodian'
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || result.error || 'Failed to dispatch vault infrastructure links.');
      }

      setStatusMessage({ type: 'success', text: '🔓 VAULT SUCCESS: Secure asset collection corridors activated.' });
      if (onSuccess) onSuccess();

    } catch (error: any) {
      console.error('Cockpit Vault Error:', error);
      setStatusMessage({ type: 'error', text: `❌ VAULT CRASH: ${error.message}` });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ background: '#020617', border: '2px solid #dc2626', padding: '30px', fontFamily: 'monospace', color: '#ffffff', maxWidth: '100%', boxSizing: 'border-box' }}>
      <h2 style={{ color: '#dc2626', margin: '0 0 5px 0', textTransform: 'uppercase', fontSize: '20px', fontWeight: 900, letterSpacing: '1px' }}>
        BMR Solutions // Systems Audit Engine Controller
      </h2>
      <p style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', margin: '0 0 25px 0' }}>
        Central Command Interface Layer // Secure Admin Session
      </p>

      <form onSubmit={handleDeployDiagnostics}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '5px', textTransform: 'uppercase' }}>Parent Audit UUID</label>
            <input type="text" value={parentAuditId} onChange={(e) => setParentAuditId(e.target.value)} style={{ width: '100%', background: '#0f172a', border: '1px solid #1e293b', padding: '10px', color: '#ffffff', fontFamily: 'monospace', fontSize: '13px' }} required />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '5px', textTransform: 'uppercase' }}>Group Identifier ID</label>
            <input type="text" value={groupId} onChange={(e) => setGroupId(e.target.value)} style={{ width: '100%', background: '#0f172a', border: '1px solid #1e293b', padding: '10px', color: '#ffffff', fontFamily: 'monospace', fontSize: '13px' }} required />
          </div>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '5px', textTransform: 'uppercase' }}>Organization Legal Entity Name</label>
          <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} style={{ width: '100%', background: '#0f172a', border: '1px solid #1e293b', padding: '10px', color: '#ffffff', fontFamily: 'monospace', fontSize: '13px' }} required />
        </div>

        <hr style={{ border: '0', borderTop: '1px solid #1e293b', margin: '20px 0' }} />

        <h3 style={{ fontSize: '13px', color: '#ffffff', margin: '0 0 15px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Target Stakeholder Nodes Routing Configuration
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '110px', fontSize: '11px', background: '#1e293b', color: '#94a3b8', padding: '6px 10px', textAlign: 'center', fontWeight: 'bold' }}>EXECUTIVE</span>
            <input type="email" value={emails.exec} onChange={(e) => handleEmailChange('exec', e.target.value)} style={{ flex: 1, background: '#0f172a', border: '1px solid #1e293b', padding: '8px 12px', color: '#ffffff', fontFamily: 'monospace' }} required />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '110px', fontSize: '11px', background: '#1e293b', color: '#94a3b8', padding: '6px 10px', textAlign: 'center', fontWeight: 'bold' }}>MANAGERIAL</span>
            <input type="email" value={emails.manager} onChange={(e) => handleEmailChange('manager', e.target.value)} style={{ flex: 1, background: '#0f172a', border: '1px solid #1e293b', padding: '8px 12px', color: '#ffffff', fontFamily: 'monospace' }} required />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '110px', fontSize: '11px', background: '#1e293b', color: '#94a3b8', padding: '6px 10px', textAlign: 'center', fontWeight: 'bold' }}>TECHNICAL</span>
            <input type="email" value={emails.tech} onChange={(e) => handleEmailChange('tech', e.target.value)} style={{ flex: 1, background: '#0f172a', border: '1px solid #1e293b', padding: '8px 12px', color: '#ffffff', fontFamily: 'monospace' }} required />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <button type="submit" disabled={isProcessing} style={{ background: isProcessing ? '#334155' : '#dc2626', color: isProcessing ? '#94a3b8' : '#ffffff', border: 'none', padding: '15px 20px', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', cursor: isProcessing ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
            {isProcessing ? 'Processing Engine...' : '🚀 Deploy Diagnostics'}
          </button>
          
          <button type="button" onClick={handleDispatchVaultLinks} disabled={isProcessing} style={{ background: 'transparent', color: isProcessing ? '#475569' : '#ffffff', border: `1px solid ${isProcessing ? '#334155' : '#ffffff'}`, padding: '15px 20px', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', cursor: isProcessing ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
            {isProcessing ? 'Processing Vault...' : '🔓 Dispatch Vault Links'}
          </button>
        </div>
      </form>

      {statusMessage.text && (
        <div style={{ marginTop: '25px', padding: '15px', background: '#0f172a', borderLeft: `4px solid ${statusMessage.type === 'success' ? '#10b981' : statusMessage.type === 'error' ? '#ef4444' : '#3b82f6'}`, fontSize: '12px', lineHeight: '1.5' }}>
          {statusMessage.text}
        </div>
      )}
    </div>
  );
}
