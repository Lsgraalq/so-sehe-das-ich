"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import Navbar from "@/components/navbarDe"
import FooterDe from "@/components/footerDe"

export default function ProfileOptionsInner() {
  const params = useSearchParams()
  const router = useRouter()
  const section = params.get("section")

  useEffect(() => {
    if (!section) {
      router.replace("/de/profile-options?section=profile")
    }
  }, [section, router])

  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen flex flex-col items-center gap-10 text-center text-white">
        {section === "profile" && <p>👤 Profiloptionen</p>}
        {section === "settings" && <p>⚙️ Kontoeinstellungen</p>}
        {section === "security" && <p>🔒 Sicherheit</p>}
        {!["profile", "settings", "security"].includes(section || "") && (
          <p>❓ Ungültiger Abschnitt</p>
        )}
      </div>
      <FooterDe />
    </>
  )
}
