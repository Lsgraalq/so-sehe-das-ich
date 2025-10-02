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
  carousel?: string[] // массив фоток
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

  return (
    <>
      <Navbar />

      <div className="bg-[url('/images/SSDIautism.png')] bg-cover bg-center bg-no-repeat w-full h-screen flex flex-col items-center justify-center gap-10"> 
        <h1 className='md:text-6xl text-6xl font-bold'>AUSTEL<br className='flex: md:hidden' />LUNGEN</h1> 
        <h2 className='md:text-4xl text-xl text-center max-w-[70%] mx-auto'>
          Auf dieser Seite können Sie die Ausstellung auswählen, an der Sie teilnehmen möchten, und sehen,wie die vergangenen Ausstellungen durchgeführt wurden.
        </h2>
       </div>

      <div className="max-w-[80%] mx-auto flex flex-col pt-30 gap-20">
        {exhibitions.map(ex => (
          <div key={ex.id} className=" flex flex-col gap-5">
            <a 
              href={`/de/ausstellungen/${ex.id}`} 
              className="flex items-center justify-center h-screen w-full"
            >
              <img 
                src={ex.titleImage} 
                alt={ex.title} 
                className=" w-full object-cover rounded"
              />
            </a>




            <Link href={`/de/ausstellungen/${ex.id}`}>
              <h1 className="italic md:text-6xl text-3xl font-bold">{ex.title}</h1>
            </Link>

            <p className="md:text-3xl text-[#C7B8CA]">{ex.description}</p>

            <ul className=" grid grid-cols-2 grid-rows-3 md:text-2xl gap-2 text-sm">
              <li className=' col-span-1'><strong>Datum:</strong>{ex.date}</li>
              <li className=' col-span-1'><strong>Anzahl der Teilnehmer:</strong>0</li>
              <li className=' col-span-1'><strong>Uhrzeit:</strong> {ex.time}</li>
              <li className=' col-span-1'><strong>Anzahl der Werke:</strong> 0</li>
              <li className=' col-span-1'><strong>Stadt:</strong> Halle (Saale)</li>
            </ul>
          </div>
        ))}
      </div>

      <FooterDe />
    </>
  )
}

export default Page



 {/* SSDI 2 */}
      {/* 
      <div className="flex flex-col gap-5">
        <a href="/de/ausstellungen/so-sehe-das-ich-2" className=''>
          <img src="/images/prva.png" alt="" />
      </a>
       <a href="/de/ausstellungen/so-sehe-das-ich-2" className=''>
      <h1 className="italic md:text-6xl text-3xl font-bold">So Sehe Das Ich #2</h1>
      </a>
      <p className="md:text-3xl text-[#C7B8CA]">Zweite Ausstellung – So Sehe Das Ich Am 29. November 2025 öffnet die zweite große Ausstellung So Sehe Das Ich im Ratshof Halle (Saale) ihre Türen. Junge Künstler*innen aus unterschiedlichen Ländern präsentieren ihre neuesten Werke – von Malerei über Fotografie bis zu digitaler Kunst. Jede Arbeit erzählt eine persönliche Geschichte und lädt zum Austausch über Perspektiven, Kulturen und Gefühle ein.</p>
      <div className="md:w-[70%]">
        <ul className=" grid grid-cols-2 grid-rows-3 md:text-2xl gap-2 text-sm">
          <li className=' col-span-1'><strong>Datum:</strong> 29.11.2025</li>
          <li className=' col-span-1'><strong>Anzahl der Teilnehmer:</strong> 0</li>
          <li className=' col-span-1'><strong>Uhrzeit:</strong> 13:00 - 18:00</li>
          <li className=' col-span-1'><strong>Anzahl der Werke:</strong> 0</li>
          <li className=' col-span-1'><strong>Stadt:</strong> Halle (Saale)</li>
        </ul>
      </div>
      </div>
       */}
    

    {/* SSDI 1 */}
    {/* <div className="flex flex-col gap-5">
       
        <a href="/de/ausstellungen/so-sehe-das-ich-1" className=''>
         <img src="/images/vtoraya.png" alt="" />
      </a>
      <a href="/de/ausstellungen/so-sehe-das-ich-1" className=''>
         <h1 className="italic md:text-6xl text-3xl font-bold">So Sehe Das Ich #1</h1>
      </a>
      
      <p className="md:text-3xl text-[#C7B8CA]">Unsere Reise begann mit der ersten Ausstellung „So Sehe Das Ich“. Diese Ausstellung markierte den Beginn der Verbreitung der Jugendkunst in ganz Deutschland, gab den Menschen die Möglichkeit, ihre Weltanschauung auszudrücken und schuf eine offene Plattform für kulturellen Austausch.</p>
      <div className="md:w-[70%]">
        <ul className=" grid grid-cols-2 grid-rows-3 md:text-2xl gap-2 text-sm">
          <li className=' col-span-1'><strong>Datum:</strong> 29.03.2025</li>
          <li className=' col-span-1'><strong>Anzahl der Teilnehmer:</strong>16</li>
          <li className=' col-span-1'><strong>Uhrzeit:</strong> 13:00 - 17:00</li>
          <li className=' col-span-1'><strong>Anzahl der Werke:</strong> 137</li>
          <li className=' col-span-1'><strong>Stadt:</strong> Halle (Saale)</li>
        </ul>
      </div>
      </div>
     */}
