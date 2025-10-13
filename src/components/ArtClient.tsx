"use client"

import { useEffect, useState } from "react"
import { db } from "@/firebase/config"
import { doc, getDoc, collection, query, where, limit, getDocs } from "firebase/firestore"
import Navbar from "@/components/navbarDe"
import FooterDe from "@/components/footerDe"
import Loader from "./loader"
import Image from "next/image"
import ShareModal from "./ShareModal"
import Link from "next/link"
import ShareButton from "@/components/ShareButton"

type Author = { username: string }

interface Exhibition {
  id: string
  title: string
  description: string
  date: string
  time: string
  titleImage: string
  carousel?: string[]
  participants: string[]
  artworks: string[]
}

export default function ArtClient({ id }: { id: string }) {
  const [art, setArt] = useState<any | null>(null)
  const [author, setAuthor] = useState<Author | null>(null)
  const [exhibition, setExhibition] = useState<Exhibition | null>(null)
  const [loading, setLoading] = useState(true)
  const [otherArts, setOtherArts] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artRef = doc(db, "arts", id)
        const artSnap = await getDoc(artRef)

        if (!artSnap.exists()) {
          setArt(null)
          setLoading(false)
          return
        }

        const artData = artSnap.data()
        setArt(artData)

        // автор
        const authorRef = doc(db, "users", artData.userId)
        const authorSnap = await getDoc(authorRef)
        if (authorSnap.exists()) {
          setAuthor(authorSnap.data() as Author)
        }

        // выставка
        if (artData.exhibition) {
          const exhbRef = doc(db, "exhibitions", artData.exhibition)
          const exhbSnap = await getDoc(exhbRef)
          if (exhbSnap.exists()) {
            setExhibition(exhbSnap.data() as Exhibition)
          }
        }

        // другие картины автора (до 3)
        if (artData.userId) {
          const artsRef = collection(db, "arts")
          const q = query(
            artsRef,
            where("userId", "==", artData.userId),
            where("__name__", "!=", id),
            limit(6)
          )
          const snaps = await getDocs(q)
          const artsList = snaps.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          setOtherArts(artsList)
        }
      } catch (err) {
        console.error("Ошибка загрузки:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) return <Loader />
  if (!art) return <div>Gemälde nicht gefunden</div>

  return (
    <>
      <Navbar />
      <div className="pt-25 flex flex-col gap-10 mx-5 min-h-screen">
        <div className="max-w-[80%] md:max-w-[70%] xl:max-w-[60%] mx-auto relative">
          {art.inAuction && (
            <div className="flex absolute bg-[#E35A5A] md:w-60 md:h-10 end-0 right-[-30] top-[-20] rounded-lg w-40 h-9">
              <p className="flex mx-auto items-center md:text-xl xl:text-2xl italic">Auktion</p>
            </div>
          )}
          {art.price && (
            <div className="flex absolute bg-[#E8B672] md:w-60 md:h-10 end-0 right-[-30] top-[-20] rounded-lg w-40 h-9">
              <p className="flex mx-auto items-center md:text-xl xl:text-2xl italic">Zu verkaufen</p>
            </div>
          )}
          {art.isSold && (
            <div className="flex absolute bg-[#6D628A] md:w-60 md:h-10 end-0 right-[-30] top-[-20] rounded-lg w-40 h-9">
              <p className="flex mx-auto items-center md:text-xl xl:text-2xl italic">Verkauft</p>
            </div>
          )}

          <Image
            src={art.imageUrl}
            alt={art.title || "Foto"}
            width={1200}
            height={900}
            className="w-full h-auto max-h-[80vh] object-contain mx-auto rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.4)] transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 60vw"
            priority
          />
        </div>

        <div className="text-xl flex flex-col gap-3 sm:min-w-[80%] sm:mx-auto min-w-[80%] mx-auto">
          <h1 className="font-bold">{art.title}</h1>
          {author && (
            <p>
              Autor:{" "}
              <a href={`/de/artist/${art.userId}`} className="underline">
                {author.username}
              </a>
            </p>
          )}
          <span className="italic text-[#B3ABBE]">{art.description}</span>
          {art.canvasType && (
            <h6>
              Material:{" "}
              <p className="p-1 bg-[#9773BD] inline-block rounded-sm">{art.canvasType}</p>
            </h6>
          )}
          {art.paints && (
            <h6>
              Farben:{" "}
              <p className="p-1 bg-[#E24C4C] inline-block rounded-sm">{art.paints.join(" ")}</p>
            </h6>
          )}
          {art.price && <p>Preis: {art.price} €</p>}
          {exhibition && <h6 className="italic font-semibold">Ausstellung: {exhibition.title}</h6>}
          {art.auction && <h6>Nimmt an der Auktion teil</h6>}
          <h6>
            Größe:
            <p className="p-1 inline-block rounded-sm">{art.height}cm</p> x{" "}
            <p className="p-1 inline-block rounded-sm">{art.width}cm</p>
          </h6>

          <div className="w-full justify-end">
            <div className="flex items-center gap-3">
              <ShareButton />
            </div>
          </div>
          
        </div>

        {/* Блок других работ */}
        {otherArts.length > 0 && (
          <div className="min-w-[80%]  mx-auto mt-15 pb-20">
            <h2 className="text-2xl font-semibold mb-6">Weitere Werke des Autors:</h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-y-10 gap-6">
              {otherArts.map((a) => (
                <Link key={a.id} href={`/de/gallery/arts/${a.id}`} className="block group">
                  <div className="relative w-full md:h-90 h-54 overflow-hidden rounded-lg">
                    <Image
                      src={a.imageUrl}
                      alt={a.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="mt-2  font-medium text-xl text-gray-500">{a.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <FooterDe />
    </>
  )
}
