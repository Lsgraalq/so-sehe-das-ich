"use client"

import { Suspense } from "react"
import VerifyEmailDe from "../VerifyEmailDe"

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Lädt...</div>}>
      <VerifyEmailDe />
    </Suspense>
  )
}
