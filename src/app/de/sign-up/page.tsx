// src/components/SignUpPage.tsx
"use client"

import React, { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { setDoc, doc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/firebase/config"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignUpPage() {
  const router = useRouter()

  // поля формы
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [bio, setBio] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [isArtist, setIsArtist] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const usernameRegex = /^[a-zA-Z0-9_]+$/



  const registrateEmailPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptedTerms) return
    if (!usernameRegex.test(username) ) {
    setErrorMsg("Имя пользователя может содержать только латинские буквы, цифры и _")
    return
  }
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
      
      const user = userCredentials.user

      await setDoc(doc(db, "users", user.uid), {
        email,
        username,
        firstName,
        lastName,
        bio,
        birthDate,
        isArtist,
        createdAt: serverTimestamp(),
      })

      router.push("/de/profile/" )
    } catch (error: any) {
      console.log("Ошибка при регистрации:", error)
      setErrorMsg(error.message || "Неизвестная ошибка при регистрации.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4">
      <div className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Регистрация</h2>
        {errorMsg && (
  <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-xl text-sm">
    {errorMsg}
  </div>
)}
        <form onSubmit={registrateEmailPassword} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-2 text-black rounded-xl"
          />

          {/* Пароль */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            required
            className="w-full px-4 py-2 text-black rounded-xl"
          />

          {/* Username */}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Имя пользователя"
            required
            className="w-full px-4 py-2 text-black rounded-xl"
          />

          {/* Имя */}
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Имя"
            required
            className="w-full px-4 py-2 text-black rounded-xl"
          />

          {/* Фамилия */}
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Фамилия"
            required
            className="w-full px-4 py-2 text-black rounded-xl"
          />

          {/* Описание */}
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="O себе"
            className="w-full px-4 py-2 text-black rounded-xl"
          />

          {/* Дата рождения */}
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
            className="w-full px-4 py-2 text-black rounded-xl"
          />

          {/* Я художник */}
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={isArtist}
              onChange={(e) => setIsArtist(e.target.checked)}
            />
            Я художник
          </label>

          {/* Пользовательское соглашение */}
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              required
            />
            Я принимаю{" "}
            <a
              href="/terms"
              className="underline text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              пользовательское соглашение
            </a>
          </label>

          {/* Кнопка */}
          <button
            type="submit"
            disabled={!acceptedTerms}
            className={`w-full py-2 px-4 font-semibold rounded-xl transition-all shadow-lg ${
              acceptedTerms
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Зарегистрироваться
          </button>
        </form>
        <a href="/de/sign-in" className="text-blue-600 text-lg underline">Уже есть аккаунт?</a>
      </div>
    </div>
  )
}
