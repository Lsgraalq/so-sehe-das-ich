// components/loader/Loader.tsx
"use client"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useProgress } from "@/components/ProgressProvider"

export default function Loader() {
  const { progress } = useProgress() // 0..100
  const barRef = useRef<HTMLDivElement | null>(null)
  const preRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!barRef.current) return

    // плавно анимируем ширину к новому значению
    gsap.to(barRef.current, {
      width: `${progress}%`,
      duration: 0.6,          // подбирай — 0.4..0.8 норм
      ease: "power3.out",
      overwrite: "auto",     // важно — перезаписывает предыдущую анимацию
    })

    // когда дошли до 100% — плавно скрываем весь preloader
    if (progress >= 100 && preRef.current) {
      // задержка небольшая, чтобы пользователь увидел 100% (и чтобы анимация полосы успела)
      gsap.to(preRef.current, {
        y: "-100%",
        duration: 0.8,
        ease: "power3.inOut",
        delay: 0.35,
        onComplete: () => setVisible(false),
      })
    }
  }, [progress])

  if (!visible) return null

  return (
    <div ref={preRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
      <div className="max-w-md w-full p-6 rounded-xl bg-gray-900/60 backdrop-blur">
        <h2 className="text-xl font-semibold mb-2 text-center">Wird geladen… {progress}%</h2>

        <div className="text-xs text-gray-400 text-center mb-3">
          {/* дополнительная инфа, при желании */}
        </div>

        <div className="w-full h-3 bg-gray-700 rounded overflow-hidden">
          {/* Убери CSS transition у этой полосы (чтобы GSAP полностью контролировал) */}
          <div
            ref={barRef}
            className="h-full bg-gradient-to-r from-[#FEC97C] to-[#E35A5A]"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </div>
  )
}
