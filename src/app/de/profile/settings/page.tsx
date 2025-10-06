"use client"

import React, { useState } from "react"
import Navbar from "@/components/navbarDe"
import FooterDe from "@/components/footerDe"
import { logout } from "@/utils/logOutDe"
import { auth, db } from "@/firebase/config"
import { doc, updateDoc } from "firebase/firestore"
import Link from "next/link"
function Page() {
  const [loading, setLoading] = useState(false)

  const handleBecomeArtist = async () => {
    if (!auth.currentUser) {
      alert("Bitte einloggen")
      return
    }
    setLoading(true)
    try {
      const userRef = doc(db, "users", auth.currentUser.uid)
      await updateDoc(userRef, { isArtist: true })
      alert("Dein Account wurde als Künstler markiert!")
    } catch (err) {
      console.error(err)
      alert("Fehler beim Aktualisieren des Accounts")
    }
    setLoading(false)
  }

  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col pt-40 mx-10 gap-10 mb-35">
       
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg max-w-50"
        >
          Abmelden
        </button>

        <button
          onClick={handleBecomeArtist}
          disabled={loading}
          className="px-4 py-2 bg-gradient-to-r from-[#FEC97C] to-[#E35A5A] text-white rounded-lg max-w-60"
        >
          {loading ? "Wird gespeichert..." : "Ich bin Künstler"}
        </button>

        <Link href="/de/faq" className="mb-7">
                  <li  className="text-2xl text-blue-400 underline inline-block w-fit">
                    FAQ
                  </li>
      </Link>
      
        <a
          href="/de/profile/edit/"
          className="text-2xl text-blue-400 underline inline-block w-fit"
        >
          Profil bearbeiten
        </a>

        {/* Кнопка для переключения на Künstler */}
        

         

        <a href="/de/contact-us/" className="text-2xl text-blue-400 underline inline-block w-fit">
          Für die Löschung des Kontos kontaktieren Sie uns bitte per E-Mail
        </a>

        <ul className="text-sm md:text-lg xl:text-xl flex flex-col xl:gap-6 gap-1 italic">
          <li>
            <a href="/de/impressum" className="underline text-lg text-gray-600">
              Impressum*
            </a>
          </li>
          <li>
            <a href="/de/agb/" className="underline text-lg text-gray-600">
              AGB*
            </a>
          </li>

          <li>
            <a href="/de/datenschutzerklarung" className="underline text-lg text-gray-600">
              Datenshutzerklärung*
            </a>
          </li>
        </ul>
      </div>
      <FooterDe />
    </>
  )
}

export default Page
