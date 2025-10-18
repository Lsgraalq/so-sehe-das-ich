"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Navbar from "@/components/navbarDe"
import FooterDe from "@/components/footerDe"

export default function ProfileOptionsInner() {
  const params = useSearchParams()
  const router = useRouter()
  const section = params.get("section")
  const [currentSection, setCurrentSection] = useState<string>("profile")

  useEffect(() => {
    if (!section) {
      router.replace("/de/profile-options?section=profile")
    } else {
      setCurrentSection(section)
    }
  }, [section, router])

  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen flex flex-col items-center gap-10 text-center text-white">
        {currentSection === "profile" && <p>👤 Profiloptionen</p>}
        {currentSection === "settings" && <p>⚙️ Kontoeinstellungen</p>}
        {currentSection === "security" && <p>🔒 Sicherheit</p>}
        {!["profile", "settings", "security"].includes(currentSection) && (
          <p>❓ Ungültiger Abschnitt</p>
        )}
      </div>
      <FooterDe />
    </>
  )
}
