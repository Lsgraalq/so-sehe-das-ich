// components/preloader/Preloader.tsx
"use client"
import { useEffect } from "react"
import { useProgress } from "@/components/ProgressProvider"

export default function Preloader() {
  const { setAssetProgress } = useProgress()

  useEffect(() => {
    if (typeof window === "undefined") return
    const nodes = Array.from(document.querySelectorAll("img, video"))
    let loaded = 0
    const total = nodes.length

    const tick = () => {
      loaded += 1
      const pct = total ? Math.min(100, Math.round((loaded / total) * 100)) : 100
      setAssetProgress(pct)
    }

    nodes.forEach((el) => {
      if (el instanceof HTMLImageElement) {
        if (el.complete && el.naturalWidth > 0) tick()
        else {
          const on = () => { el.removeEventListener("load", on); el.removeEventListener("error", on); tick() }
          el.addEventListener("load", on)
          el.addEventListener("error", on)
        }
      } else if (el instanceof HTMLVideoElement) {
        if (el.readyState >= 3) tick()
        else {
          const on = () => { el.removeEventListener("loadeddata", on); el.removeEventListener("error", on); tick() }
          el.addEventListener("loadeddata", on)
          el.addEventListener("error", on)
        }
      }
    })

    if (total === 0) {
      // если ассетов нет — быстро установить 100
      setAssetProgress(100)
    }
  }, [setAssetProgress])

  return null // визуал не рендерим — им займётся Loader
}
