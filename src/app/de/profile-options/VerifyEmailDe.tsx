"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { applyActionCode } from "firebase/auth"
import { auth } from "@/firebase/config"
import Navbar from "@/components/navbarDe"
import FooterDe from "@/components/footerDe"

export default function VerifyEmailDe() {
  const params = useSearchParams()
  const router = useRouter()
  const oobCode = params.get("oobCode")

  const [msg, setMsg] = useState("Bitte warten...")

  useEffect(() => {
    if (!oobCode) {
      setMsg("Ungültiger oder abgelaufener Link ❌")
      return
    }

    applyActionCode(auth, oobCode)
      .then(() => {
        setMsg("Ihre E-Mail-Adresse wurde erfolgreich bestätigt ✅")
        setTimeout(() => router.push("/de/sign-in"), 2500)
      })
      .catch((err) => {
        console.error(err)
        setMsg("Fehler bei der Bestätigung der E-Mail-Adresse ❌")
      })
  }, [oobCode, router])

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <div className="bg-[#1a1a1a]/50 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            E-Mail-Bestätigung
          </h1>
          <p className="text-gray-100 text-sm">{msg}</p>
          {msg.includes("bestätigt") && (
            <a href="/de/sign-in">
              <button
                type="button"
                className="mt-6 bg-gradient-to-r from-[#FEC97C] to-[#E35A5A] hover:ring-2 ring-orange-300 focus:outline-none focus:ring-2 text-white font-semibold py-2 rounded-lg w-full transition-all"
              >
                Weiter zur Anmeldung
              </button>
            </a>
          )}
        </div>
      </div>
      <FooterDe />
    </>
  )
}
