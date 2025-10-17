"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import ResetPasswordDe from "./ResetPasswordDe"
import VerifyEmailDe from "./VerifyEmailDe"


export default function ActionPageDe() {
  const params = useSearchParams()
  const mode = params.get("mode")

  let content

  switch (mode) {
    case "resetPassword":
      content = <ResetPasswordDe />
      break
    case "verifyEmail":
      content = <VerifyEmailDe />
      break
    default:
      content = (
        <div className="text-center text-2xl mt-20">
          Ungültiger oder abgelaufener Link ❌
        </div>
      )
  }

  return (
    
    <Suspense fallback={<div className="text-center mt-10">Lädt...</div>}>
      {content}
    </Suspense>
  )
}
