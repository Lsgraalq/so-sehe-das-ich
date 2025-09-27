// src/components/LoginPage.tsx
"use client"
import React, { useState } from 'react';
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "@/firebase/config"
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbarDe';
import FooterDe from '@/components/footerDe';

export default function LoginPage() {
    const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const router = useRouter()

  const loginEmailPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredentials.user

      if (!user.emailVerified) {
        setErrorMsg("Bitte bestätigen Sie zuerst Ihre E-Mail-Adresse.")
        return
      }

      console.log("Anmeldung erfolgreich:", user.uid)
      router.push("/de/profile")
    } catch (error: any) {
      console.error("Fehler bei der Anmeldung:", error)
      setErrorMsg(error.message || "Unbekannter Fehler bei der Anmeldung.")
    }
  }

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen bg-[url('/images/auth_bg.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-md mx-auto">
  <h2 className="text-3xl font-bold text-center mb-8">Anmelden</h2>
  
  {errorMsg && (
    <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded text-sm">
      {errorMsg}
    </div>
  )}

  <form onSubmit={loginEmailPassword} className="space-y-6">
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="floating_email"
        className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
        placeholder=" "
        required
      />
      <label
        htmlFor="floating_email"
        className="peer-focus:font-medium absolute text-sm text-orange-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        E-Mail
      </label>
    </div>

    <div className="relative z-0 w-full mb-5 group">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="floating_password"
        className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
        placeholder=" "
        required
      />
      <label
        htmlFor="floating_password"
        className="peer-focus:font-medium absolute text-sm text-orange-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Passwort
      </label>
    </div>

    <button
      type="submit"
      className="w-full py-2 px-4 bg-gradient-to-r from-[#FEC97C] to-[#E35A5A]  text-white font-semibold rounded transition-all"
    >
      Anmelden
    </button>
  </form>

  <a href="/de/sign-up" className="block pt-5 text-blue-400 text-center hover:underline hover:cursor-pointer">Noch kein Konto?</a>
</div>

    </div>
    <FooterDe></FooterDe>
    </>
  );
}