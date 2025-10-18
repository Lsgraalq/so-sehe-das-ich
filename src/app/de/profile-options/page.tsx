"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProfileOptionsPage() {
  const params = useSearchParams()
  const router = useRouter()

  const mode = params.get("mode")
  const oobCode = params.get("oobCode")

  useEffect(() => {
    if (mode === "resetPassword" && oobCode) {
      router.replace(`/de/profile-options/reset-password?oobCode=${oobCode}`)
    } else if (mode === "verifyEmail" && oobCode) {
      router.replace(`/de/profile-options/verify-email?oobCode=${oobCode}`)
    } else {
      router.replace("/de/profile-options?section=profile")
    }
  }, [mode, oobCode, router])

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Lädt...
    </div>
  )
}
