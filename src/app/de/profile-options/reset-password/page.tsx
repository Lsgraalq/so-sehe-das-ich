"use client"

import { Suspense } from "react"
import ResetPasswordDe from "../ResetPasswordDe"

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Lädt...</div>}>
      <ResetPasswordDe />
    </Suspense>
  )
}
