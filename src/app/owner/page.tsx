'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OwnerLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/owner/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push('/owner/dashboard');
    } else {
      alert("INVALID_CREDENTIALS");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <form onSubmit={handleLogin} className="max-w-sm w-full bg-white p-10 rounded-lg shadow-2xl">
        <h1 className="text-xs font-mono text-blue-600 uppercase tracking-widest mb-8 text-center">
          BMR_ADMIN_ACCESS
        </h1>
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="USERNAME" 
            className="w-full p-4 border rounded text-sm font-mono uppercase bg-slate-50"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="PASSWORD" 
            className="w-full p-4 border rounded text-sm font-mono uppercase bg-slate-50"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white py-4 rounded font-bold uppercase tracking-widest hover:bg-blue-700 transition">
            AUTHORIZE_ENTRY
          </button>
        </div>
      </form>
    </div>
  );
}
