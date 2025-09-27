// src/components/SignUpPage.tsx
"use client"

import React, { useState } from "react"
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth"
import { setDoc, doc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/firebase/config"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbarDe"
import FooterDe from "@/components/footerDe"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function SignUpPage() {
  const router = useRouter()

  // поля формы
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("https://firebasestorage.googleapis.com/v0/b/so-sehe-das-ich.firebasestorage.app/o/avatars%2Fporabote.jpg?alt=media&token=a0ddf113-d253-408e-96ed-15c8b4b89cf8")
  const [bio, setBio] = useState("")
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [isArtist, setIsArtist] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const usernameRegex = /^[a-zA-Z0-9_]+$/



  const registrateEmailPassword = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!acceptedTerms) return
  if (!usernameRegex.test(username)) {
    setErrorMsg("Benutzername darf nur lateinische Buchstaben, Zahlen und _ enthalten")
    return
  }

  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredentials.user

    await sendEmailVerification(user)

    await setDoc(doc(db, "users", user.uid), {
      email,
      username,
      firstName,
      lastName,
      avatarUrl,
      bio,
      birthDate,
      isArtist,
      createdAt: serverTimestamp(),
    })

    // 👉 сразу выкидываем
    await signOut(auth)

    router.push("/de/check-email") // страница с текстом: "Bitte bestätigen Sie Ihre E-Mail-Adresse."
  } catch (error: any) {
    console.log("Fehler bei der Registrierung:", error)
    setErrorMsg(error.message || "Unbekannter Fehler bei der Registrierung.")
  }
}

  return (
    <>
    <Navbar></Navbar>
    
    <div className="pt-23 mb-45  bg-[url('/images/auth_bg.png')] bg-cover bg-center bg-no-repeat w-full h-screen">
<form onSubmit={registrateEmailPassword} className="mx-10 flex flex-col gap-1 ">
  {/* Email */}
  <div className="flex flex-row  align-center items-center  md:gap-30 gap-10 md:max-w-[400px] xl:max-w-[500px] mx-auto">
      <h1 className="font-bold text-center md:text-2xl text-xl">Registrieren</h1>
  <a href="/de/sign-in" className="text-sm md:text-xl text-blue-300 hover:underline hover:cursor-pointer">Bereits ein Konto?</a>
  </div>

  <div className="relative z-0 w-full mb-5 group md:max-w-[400px] mx-auto xl:max-w-[500px]">
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      id="floating_email"
      className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 
                 border-b-2 border-gray-300 appearance-none 
                  focus:outline-none 
                 focus:ring-0 focus:border-white peer"
      placeholder=" "
      required
    />
    <label
      htmlFor="floating_email"
      className="peer-focus:font-medium absolute text-sm text-blue-300 
                 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                 peer-focus:start-0 peer-focus:text-white  
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      E-Mail
    </label>
  </div>

  {/* Пароль */}
  <div className="relative z-0 w-full mb-5 group md:max-w-[400px] mx-auto xl:max-w-[500px]">
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      id="floating_password"
      className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 
                 border-b-2 border-gray-300 appearance-none 
                   focus:outline-none 
                 focus:ring-0 focus:border-white peer"
      placeholder=" "
      required
    />
    <label
      htmlFor="floating_password"
      className="peer-focus:font-medium absolute text-sm text-blue-300 
                 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                 peer-focus:text-white  
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Passwort
    </label>
  </div>

  {/* Username */}
  <div className="relative z-0 w-full mb-5 group md:max-w-[400px] mx-auto xl:max-w-[500px]">
    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      id="floating_username"
      className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 
                 border-b-2 border-gray-300 appearance-none 
                   focus:outline-none 
                 focus:ring-0 focus:border-white peer"
      placeholder=" "
      required
    />
    <label
      htmlFor="floating_username"
      className="peer-focus:font-medium absolute text-sm text-blue-300 
                 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                 peer-focus:text-white  
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Benutzername
    </label>
  </div>

  {/* Имя */}
  <div className="relative z-0 w-full mb-5 group md:max-w-[400px] mx-auto xl:max-w-[500px]">
    <input
      type="text"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      id="floating_first_name"
      className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 
                 border-b-2 border-gray-300 appearance-none 
                   focus:outline-none 
                 focus:ring-0 focus:border-white peer"
      placeholder=" "
      required
    />
    <label
      htmlFor="floating_first_name"
      className="peer-focus:font-medium absolute text-sm text-blue-300 
                 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                 peer-focus:text-white  
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Vorname
    </label>
  </div>

  {/* Фамилия */}
  <div className="relative z-0 w-full mb-5 group md:max-w-[400px] mx-auto xl:max-w-[500px]">
    <input
      type="text"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      id="floating_last_name"
      className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 
                 border-b-2 border-gray-300 appearance-none 
                   focus:outline-none 
                 focus:ring-0 focus:border-white peer"
      placeholder=" "
      required
    />
    <label
      htmlFor="floating_last_name"
      className="peer-focus:font-medium absolute text-sm text-blue-300 
                 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                 peer-focus:text-white  
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Nachname
    </label>
  </div>

  {/* Bio */}
  <div className="relative z-0 w-full mb-5 group md:max-w-[400px] mx-auto xl:max-w-[500px]">
    <textarea
      value={bio}
      onChange={(e) => setBio(e.target.value)}
      id="floating_bio"
      className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 
                 border-b-2 border-gray-300 appearance-none 
                   focus:outline-none 
                 focus:ring-0 focus:border-white peer resize-none"
      placeholder=" "
    />
    <label
      htmlFor="floating_bio"
      className="peer-focus:font-medium absolute text-sm text-blue-300 
                 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                 peer-focus:text-white  
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Über mich
    </label>
  </div>

  {/* Дата рождения */}
  <div className="relative z-0 w-full mb-5 group md:max-w-[400px] mx-auto xl:max-w-[500px] flex flex-col-reverse gap-5">
      <DatePicker
        selected={birthDate}
        onChange={(date) => setBirthDate(date)} 
        dateFormat="dd.MM.yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300"
        calendarClassName="bg-white text-black rounded-xl shadow-lg"
      />
    <label
      htmlFor="floating_birthdate"
      className="text-sm text-blue-300 peer-focus:text-white">
      Geburtsdatum
    </label>
  </div>
  

  {/* Чекбоксы */}
  <div className=" mb-3 md:max-w-[400px] sm:mx-auto xl:max-w-[500px] ">
     <div className="flex items-center gap-2 ">
    <input
      type="checkbox"
      checked={isArtist}
      onChange={(e) => setIsArtist(e.target.checked)}
    />
    <span className="text-sm text-gray-100">Ich bin Künstler</span>
    </div>
  </div>

  <div className=" mb-5 md:max-w-[400px] sm:mx-auto  xl:max-w-[500px]">
    <div className="flex items-center gap-2 ">
    <input
      type="checkbox"
      checked={acceptedTerms}
      onChange={(e) => setAcceptedTerms(e.target.checked)}
      required
    />
    <span className="text-sm text-gray-100">
      Ich akzeptiere{" "}
      <a href="/terms" className="underline text-orange-500" target="_blank">
        die Nutzungsvereinbarung
      </a>
    </span>
    </div>
  </div>

  {/* Кнопка */}
  <button
    type="submit"
    disabled={!acceptedTerms}
    className={` text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 md:min-w-[150px] mx-auto xl:min-w-[200px] 
                text-center ${
                  acceptedTerms
                    ? "bg-gradient-to-r from-[#FEC97C] to-[#E35A5A] rounded focus:ring-2 focus:outline-none focus:ring-orange-200"
                    : "bg-orange-300 text-blue-300 cursor-not-allowed"
                }`}
  >
    Registrieren
  </button>
</form>
</div>
<FooterDe></FooterDe>
    </>
  )
}
