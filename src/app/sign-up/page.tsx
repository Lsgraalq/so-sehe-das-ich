// src/components/LoginPage.tsx
"use client"
import React, { useState } from 'react';
import {createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import {auth} from "@/app/firebase/config"
import { useRouter } from 'next/navigation';


export default function signUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const registrateEmailPassword = async(e: React.FormEvent) => {
      e.preventDefault();
      try {
      const userCredentials = await createUserWithEmailAndPassword(auth,email,password);
      console.log(userCredentials.user);
      router.push("/");
      } catch(error) {
        console.log(error);
      }
    }
  
  // const monitorAuthState = async () => {
  //   onAuthStateChanged(auth, user => {
  //     if (user){
  //       console.log(user);
  //       showApp();
  //       showLoginState(user)
  //     }
  //   })
  // }

  // monitorAuthState()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4">
      <div className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Добро пожаловать 👋</h2>
        <form onSubmit={registrateEmailPassword} className="space-y-6">
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
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}