"use client"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth"
import { auth } from "@/firebase/config"
import Navbar from "@/components/navbarDe"
import FooterDe from "@/components/footerDe"


export default function ResetPasswordDe() {
  const params = useSearchParams()
  const router = useRouter()
  const oobCode = params.get("oobCode")

  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (oobCode) {
      verifyPasswordResetCode(auth, oobCode)
        .then((email) => setEmail(email))
        .catch(() =>
          setMsg("Dieser Link ist ungültig oder abgelaufen. Bitte erneut versuchen.")
        )
    } else {
      setMsg("Ungültiger Link.")
    }
  }, [oobCode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!oobCode) return setMsg("Kein Code gefunden.")
    if (newPassword.length < 6)
      return setMsg("Das Passwort muss mindestens 6 Zeichen lang sein.")
    setLoading(true)
    try {
      await confirmPasswordReset(auth, oobCode, newPassword)
      setMsg("Passwort erfolgreich geändert ✅")
      setTimeout(() => router.push("/de/sign-in"), 2000)
    } catch (err: any) {
      console.error(err)
      setMsg("Fehler beim Zurücksetzen des Passworts.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <Navbar></Navbar>
    <div className="flex flex-col items-center justify-center h-screen  px-4">
      <form
        onSubmit={handleSubmit}
        className=" p-6 rounded-2xl shadow-lg w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-white">
          Neues Passwort festlegen
        </h1>
        {email && (
          <p className="text-center text-sm text-white mb-2">
            Für Konto: {email}
          </p>
        )}
        <input
          type="password"
          placeholder="Neues Passwort"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="border w-full p-2 rounded-lg focus:outline-none "
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-[#FEC97C] to-[#E35A5A] hover:ring-2 ring-orange-300 focus:outline-none focus:ring-2 text-white font-semibold py-2 rounded-lg w-full"
        >
          {loading ? "Speichere..." : "Passwort ändern"}
        </button>
        {msg && <p className="text-center text-sm text-gray-700">{msg}</p>}
      </form>
    </div>
    <FooterDe></FooterDe>
    </>
  )
}
