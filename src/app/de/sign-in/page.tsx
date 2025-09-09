// src/components/LoginPage.tsx
"use client"
import React, { useState } from 'react';
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "@/firebase/config"
import { useRouter } from 'next/navigation';


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    
        
   const loginEmailPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    const userCredentials = await signInWithEmailAndPassword(auth,email,password);
    console.log(userCredentials.user);
    router.push("/")
      }  catch(error: any) {
        console.log(error);
        setErrorMsg(error.message || "Неизвестная ошибка при регистрации.")
      }
   }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4">
      <div className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">захади не боись</h2>
        {errorMsg && (
  <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-xl text-sm">
    {errorMsg}
  </div>
)}
    
        <form  onSubmit={loginEmailPassword} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 text-black bg-white/60 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 text-black bg-white/60 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}