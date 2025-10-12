"use client"

import { Suspense } from "react"
import ResetPasswordDe from "./ResetPasswordDe"


export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Lädt...</div>}>
      <ResetPasswordDe />
    </Suspense>
  )
}
