"use client"

import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"
import { auth, db } from "@/app/firebase/config"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function MyProfilePage() {
  const [user] = useAuthState(auth)
  const [formData, setFormData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        router.push("/de/sign-up")
        return
      }

      const userRef = doc(db, "users", user.uid)
      const userSnap = await getDoc(userRef)
      if (userSnap.exists()) {
        setFormData(userSnap.data())
      }

      setLoading(false)
    }

    fetchUser()
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    if (!user) return
    const userRef = doc(db, "users", user.uid)
    await updateDoc(userRef, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      bio: formData.bio,
      username: formData.username,
    })
    alert("Профиль обновлён ✅")
  }

  if (loading || !formData) return <p className="text-center mt-10">Загрузка...</p>

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6 md:p-12 text-black">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-black">Мой профиль</h1>

        {/* Имя */}
        <input
          name="firstName"
          value={formData.firstName || ""}
          onChange={handleChange}
          placeholder="Имя"
          className="w-full p-2 text-black border rounded-lg"
        />

        {/* Фамилия */}
        <input
          name="lastName"
          value={formData.lastName || ""}
          onChange={handleChange}
          placeholder="Фамилия"
          className="w-full p-2 text-black border rounded-lg"
        />

        {/* Username */}
        <input
          name="username"
          value={formData.username || ""}
          onChange={handleChange}
          placeholder="Имя пользователя (username)"
          className="w-full p-2 text-black border rounded-lg"
        />

        {/* Bio */}
        <textarea
          name="bio"
          value={formData.bio || ""}
          onChange={handleChange}
          placeholder="О себе"
          className="w-full p-2 text-black border rounded-lg"
        />

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Сохранить изменения
        </button>

        {/* Ссылка на добавление картины */}
        {formData.isArtist && (
          <Link href="/de/artworks/new">
            <button className="mt-4 w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
              ➕ Добавить картину
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}
