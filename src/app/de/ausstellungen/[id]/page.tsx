// app/de/ausstellungen/[id]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { db, auth } from "@/firebase/config"
import Navbar from "@/components/navbarDe"
import FooterDe from "@/components/footerDe"
import { useRouter } from "next/navigation"
import Carousel from "@/components/slider"
import Loader from "@/components/loader"


interface Section {
  title: string
  text: string
  imageUrl?: string
  iframeUrl?: string
}

interface Exhibition {
  title: string
  description: string
  date: string
  time: string
  carousel: string[]
  sections: Section[]
  createdAt?: any
  participants: string[]
  arts: string[]
  city: string
  actual: boolean
}

export default function ExhibitionPage() {
  const params = useParams()
  const router = useRouter()
  const id = Array.isArray(params.id) ? params.id[0] : params.id

  const [exhibition, setExhibition] = useState<Exhibition | null>(null)
  const [loading, setLoading] = useState(true)
  const [isArtist, setisArtist] = useState<boolean | null>(null)

  // Загружаем выставку
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return
      try {
        const ref = doc(db, "exhibitions", id)
        const snap = await getDoc(ref)
        if (snap.exists()) {
          setExhibition(snap.data() as Exhibition)
        } else {
          setExhibition(null)
        }
      } catch (err) {
        console.error("Ошибка загрузки выставки:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  // Проверка текущего пользователя и isArtist
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid)
        const snap = await getDoc(userRef)
        if (snap.exists()) {
          const data = snap.data()
          setisArtist(data.isArtist === true)
        } else {
          setisArtist(false)
        }
      } else {
        setisArtist(false)
      }
    })
    return () => unsubscribe()
  }, [])

  if (loading) return <Loader></Loader>
  if (!exhibition) return <p className="text-center text-red-400">❌Error</p>

  return (
    <>
      <Navbar></Navbar>
      <div className="pt-20 ">
        {exhibition.carousel?.length > 0 && (
          <div className="mb-10">
            <Carousel images={exhibition.carousel} />
          </div>
        )}
      </div>
      <div className="md:pt-10 pt-3 max-w-[80%] mx-auto flex flex-col gap-5 xl:gap-8">
        <div className="flex flex-col gap-5 xl:gap-10">
          <h1 className="text-[32px] sm:text-6xl md:text-[66px] font-bold italic xl:text-[100px] 2xl:text-[120px]">{exhibition.title}</h1>
          <p className="text-[#C7B8CA] md:text-2xl text-sm">{exhibition.description}</p>
        </div>
        {isArtist &&  exhibition.actual && (
          <div className="bg-[#9C88CD] w-55 h-10 rounded flex mx-auto md:w-100 md:h-17 xl:w-150 xl:h-20">
            <a href={`/de/ausstellungen/${id}/register`} className="text-sm md:text-2xl xl:text-4xl font-bold w-full mx-auto flex items-center justify-center">Zur Ausstellung anmelden</a>
            
          </div>
        )}
        <div className="flex flex-row gap-2 justify-between text-sm  md:text-xl md:gap-10 xl:text-4xl">
            <div className="flex flex-col gap-2 ">
                <p className="">Datum: <strong>{exhibition.date}</strong></p>
                <p className="">Uhrzeit: <strong>{exhibition.time}</strong></p>
            </div>
            <div className="flex flex-col gap-2 ">
                <p className="">Anzahl der Teilnehmer: <strong>{exhibition.participants.length}</strong></p>
                <p className="">Anzahl der Werke: <strong>{exhibition.arts.length}</strong></p>
            </div>
        </div>
        {/* <img src="/images/vika.png" alt="" className="max-w-[80%] m-10 md:max-w-[30%] md:mt-15 md:mb-15 " /> */}


        {/* Секции */}
        {exhibition.sections?.length > 0 && (
          <div>
            {exhibition.sections.map((s, i) => (
              <div key={i} className="flex flex-col gap-5 xl:gap-10">
                <img src="/images/vika.png" alt="" className="max-w-[80%] m-10 md:max-w-[40%] md:mt-15 md:mb-15 " />
                <h2 className="text-3xl italic font-bold md:text-4xl xl:text-6xl">{s.title}</h2>
                <p className="text-[#C7B8CA] md:text-2xl text-sm">{s.text}</p>
                {s.imageUrl && (
                  <img
                    src={s.imageUrl}
                    alt={`section-${i}`}
                    className="rounded max-h-[90vh] object-contain"
                  />
                )}
                  {s.iframeUrl ? (
            <div className="w-full aspect-video">
              <iframe
                src={s.iframeUrl}
                className="w-full h-full rounded-lg"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          ) : (
            <p className="text-gray-300"></p>
          )}
              </div>
            ))}
          </div>
        )}

        {/* Авторский блок */}
        
      </div>
      <FooterDe></FooterDe>
    </>
  )
}
