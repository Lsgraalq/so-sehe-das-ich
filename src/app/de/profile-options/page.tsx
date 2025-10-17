"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"

function ProfileOptionsInner() {
  const params = useSearchParams()
  const tab = params.get("tab")
  return <div>Aktueller Tab: {tab}</div>
}

export default function ProfileOptionsPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Lädt...</div>}>
      <ProfileOptionsInner />
    </Suspense>
  )
}
