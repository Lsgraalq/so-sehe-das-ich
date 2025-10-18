"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"

function ProfileOptionsRouter() {
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

export default function ProfileOptionsPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Lädt...</div>}>
      <ProfileOptionsRouter />
    </Suspense>
  )
}
