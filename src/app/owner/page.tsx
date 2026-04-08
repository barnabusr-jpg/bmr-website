'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function OwnerLogin() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/owner/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/owner/dashboard');
      } else {
        alert("ACCESS_DENIED: INVALID_CREDENTIALS");
      }
    } catch (error) {
      console.error("Login_Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans text-slate-900">
      <form onSubmit={handleLogin} className="max-w-sm w-full bg-white p-12 rounded-sm shadow-2xl border-t-4 border-blue-600">
        <div className="flex justify-center mb-8">
          <div className="p-3 bg-slate-100 rounded-full text-slate-400">
            <Lock size={24} />
          </div>
        </div>
        <h1 className="text-[10px] font-mono text-blue-600 uppercase tracking-[0.4em] mb-10 text-center">
          BMR_ADMIN_GATE
        </h1>
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="IDENTIFIER" 
            className="w-full p-4 border border-slate-200 rounded-sm text-xs font-mono uppercase bg-slate-50 focus:outline-none focus:border-blue-600 transition"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="PASSCODE" 
            className="w-full p-4 border border-slate-200 rounded-sm text-xs font-mono uppercase bg-slate-50 focus:outline-none focus:border-blue-600 transition"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-blue-700 transition-all active:scale-[0.98]">
            AUTHORIZE_ACCESS
          </button>
        </div>
        <p className="mt-8 text-[8px] font-mono text-slate-400 text-center uppercase tracking-widest">
          Session_Monitoring_Active
        </p>
      </form>
    </div>
  );
}
