"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/firebase/config"

export default function AdminGuard() {
  const router = useRouter()

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/de/faq") // не авторизован → редиректим
        return
      }
      try {
        const snap = await getDoc(doc(db, "users", user.uid))
        if (!snap.exists() || !snap.data().isAdmin) {
          router.push("/de/faq") // не админ → редиректим
        }
      } catch (err) {
        console.error("Ошибка проверки прав:", err)
        router.push("/de/faq")
      }
    })

    return () => unsubscribe()
  }, [router])

  return null // он ничего не рендерит
}
