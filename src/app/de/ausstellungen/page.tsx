"use client"

import React, { useEffect, useState } from "react"
import Navbar from "@/components/navbarDe"
import FooterDe from "@/components/footerDe"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase/config"
import Link from "next/link"

interface Exhibition {
  id: string
  title: string
  description: string
  date: string
  time: string
  titleImage: string
  carousel?: string[]
  participants: string[]
  arts: string[]
  city: string
  actual: boolean
}

function Page() {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([])

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const snap = await getDocs(collection(db, "exhibitions"))
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Exhibition[]
        setExhibitions(data)
      } catch (error) {
        console.error("Ошибка загрузки выставок:", error)
      }
    }
    fetchExhibitions()
  }, [])

  const activeEx = exhibitions.find(ex => ex.actual)
  const oldEx = exhibitions.filter(ex => !ex.actual)

  return (
    <>
      <Navbar />

   
      <div className="bg-[url('/images/SSDIautism.png')] bg-cover bg-center bg-no-repeat w-full h-screen flex flex-col items-center justify-center gap-10">
        <h1 className="md:text-6xl text-6xl font-bold text-white">AUSSTEL<br className="flex md:hidden" />LUNGEN</h1>
        <h2 className="md:text-4xl text-xl text-center max-w-[70%] mx-auto text-gray-200">
          Auf dieser Seite können Sie die Ausstellung auswählen, an der Sie teilnehmen möchten, und sehen, wie die
          vergangenen Ausstellungen durchgeführt wurden.
        </h2>
      </div>

      <div className="max-w-[80%] mx-auto flex flex-col pt-30 gap-20">

       
        {activeEx ? (
          <div className="flex flex-col gap-5 border-b border-gray-700 pb-10">

            <a href={`/de/ausstellungen/${activeEx.id}`} className="flex items-center justify-center w-full">
              <img
                src={activeEx.titleImage}
                alt={activeEx.title}
                className="w-full object-cover rounded-lg shadow-[0_0_25px_rgba(0,0,0,0.4)]"
              />
            </a>

            <Link href={`/de/ausstellungen/${activeEx.id}`}>
              <h1 className="italic md:text-6xl text-3xl font-bold">{activeEx.title}</h1>
            </Link>

            <p className="md:text-3xl text-[#C7B8CA]">{activeEx.description}</p>

            <ul className="grid grid-cols-2 md:text-2xl gap-2 text-sm">
              <li><strong>Datum:</strong> {activeEx.date}</li>
              <li><strong>Uhrzeit:</strong> {activeEx.time}</li>
              <li><strong>Stadt:</strong> {activeEx.city}</li>
              <li><strong>Teilnehmer:</strong> {activeEx.participants.length}</li>
              <li><strong>Werke:</strong> {activeEx.arts.length}</li>
            </ul>
          </div>
        ) : (
          <h2 className="text-3xl text-gray-400 text-center">Zurzeit gibt es keine aktive Ausstellung</h2>
        )}

        {/* 📜 Frühere Ausstellungen */}
        {oldEx.length > 0 && (
          <>
            <h2 className="text-4xl font-bold text-gray-400 mt-8  mb-4 text-center">
              Vergangene Ausstellungen
            </h2>

            <div className="flex flex-col gap-10">
              {oldEx.map(ex => (
                <div key={ex.id} className="flex flex-col gap-5">
                  <a href={`/de/ausstellungen/${ex.id}`} className="flex items-center justify-center w-full">
                    <img
                      src={ex.titleImage}
                      alt={ex.title}
                      className="w-full object-cover rounded shadow-[0_0_15px_rgba(0,0,0,0.3)]"
                    />
                  </a>

                  <Link href={`/de/ausstellungen/${ex.id}`}>
                    <h1 className="italic md:text-5xl text-3xl font-bold">{ex.title}</h1>
                  </Link>

                  <p className="md:text-2xl text-[#C7B8CA]">{ex.description}</p>

                  <ul className="grid grid-cols-2 md:text-xl gap-2 text-sm">
                    <li><strong>Datum:</strong> {ex.date}</li>
                    <li><strong>Teilnehmer:</strong> {ex.participants.length}</li>
                    <li><strong>Uhrzeit:</strong> {ex.time}</li>
                    <li><strong>Werke:</strong> {ex.arts.length}</li>
                    <li><strong>Stadt:</strong> {ex.city}</li>
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <FooterDe />
    </>
  )
}

export default Page
