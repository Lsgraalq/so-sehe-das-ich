"use client"
import { useState } from "react"

export default function ShareButton() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Link konnte nicht kopiert werden:", err)
    }
  }

  return (
    <div className="relative inline-block">
      <button onClick={handleCopy}>
        <img
          src="/images/shareButton.png" 
          alt="share"
          className="w-8 h-8 cursor-pointer hover:opacity-80 transition"
        />
      </button>

      {copied && (
        <span className="absolute left-1/2 -translate-x-1/2 top-10 bg-black text-white text-xs px-3 py-1 rounded-md">
          Link kopiert ✅
        </span>
      )}
    </div>
  )
}
