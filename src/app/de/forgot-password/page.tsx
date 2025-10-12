"use client"
import { useState } from "react"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/firebase/config"
import Navbar from "@/components/navbarDe"
import FooterDe from "@/components/footerDe"



export default function ForgotPasswordDe() {
  const [email, setEmail] = useState("")
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMsg("")
    try {
      await sendPasswordResetEmail(auth, email, {
        url: "https://so-sehe-das-ich.art/de/reset-password",
        handleCodeInApp: false,
      })
      setMsg("Eine E-Mail zum Zurücksetzen des Passworts wurde gesendet ✅")
    } catch (err: any) {
      console.error(err)
      if (err.code === "auth/user-not-found")
        setMsg("Kein Benutzer mit dieser E-Mail gefunden.")
      else if (err.code === "auth/invalid-email")
        setMsg("Ungültige E-Mail-Adresse.")
      else setMsg("Fehler beim Senden der E-Mail.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <Navbar></Navbar>
    <div className="flex flex-col items-center justify-center h-screen  px-4">
      <form
        onSubmit={handleReset}
        className=" p-6 rounded-2xl shadow-lg w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-white">
          Passwort vergessen?
        </h1>
        <p className="text-white text-center text-sm">
          Gib deine E-Mail-Adresse ein, um einen Link zum Zurücksetzen zu erhalten.
        </p>
        <input
          type="email"
          placeholder="E-Mail-Adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border w-full p-2 rounded-lg focus:outline-none focus:ring-2 "
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-[#FEC97C] to-[#E35A5A] hover:ring-2 ring-orange-300 focus:outline-none focus:ring-2 text-white font-semibold py-2 rounded-lg w-full"
        >
          {loading ? "Sende..." : "Link senden"}
        </button>
        {msg && <p className="text-center text-sm text-gray-700">{msg}</p>}
      </form>
    </div>
    <FooterDe></FooterDe>
    </>
  )
}
