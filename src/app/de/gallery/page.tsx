"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import Navbar from "@/components/navbarDe"
import FooterDe from "@/components/footerDe"
import Loader from "@/components/loader"
import { fetchArt } from "@/utils/fetchArts"
import { db } from "@/firebase/config"
import { collection, query, where, getDocs } from "firebase/firestore"

export type Art = {
  id: string
  title: string
  imageUrl: string
  width?: number
  height?: number
  authorUsername?: string
  createdAt?: any
  blurDataURL?: string
}

const PAGE_SIZE = 20

export default function ArtGallery() {
  const [arts, setArts] = useState<Art[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [cursor, setCursor] = useState<any>(null)
  const [queryText, setQueryText] = useState("")
  const [searching, setSearching] = useState(false)

  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const gridRef = useRef<HTMLDivElement | null>(null)

  const animateIn = useCallback((items: Element[]) => {
    gsap.fromTo(
      items,
      { autoAlpha: 0, y: 16, scale: 0.98 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.04,
      }
    )
  }, [])

  const loadBatch = useCallback(
    async (isFirst = false) => {
      if (loadingMore) return
      setLoadingMore(true)
      try {
        let items: Art[] = []
        let nextCursorLocal: any = null
        let hasMoreLocal = true

        const maybeAll = await fetchArt()
        if (Array.isArray(maybeAll)) {
          const startIndex = cursor ? (cursor as number) : 0
          items = maybeAll.slice(startIndex, startIndex + PAGE_SIZE)
          nextCursorLocal = startIndex + PAGE_SIZE
          hasMoreLocal = nextCursorLocal < maybeAll.length
        } else {
          items = maybeAll.items ?? []
          nextCursorLocal = maybeAll.nextCursor ?? null
          hasMoreLocal = maybeAll.hasMore ?? items.length === PAGE_SIZE
        }

        setArts(prev => (isFirst ? items : [...prev, ...items]))
        setCursor(nextCursorLocal)
        setHasMore(hasMoreLocal)

        requestAnimationFrame(() => {
          if (!gridRef.current) return
          const newCards = Array.from(
            gridRef.current.querySelectorAll("[data-card='art']")
          ).slice(-items.length)
          if (newCards.length) animateIn(newCards)
        })
      } catch (e) {
        console.error("Failed to load arts:", e)
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    },
    [animateIn, cursor, loadingMore]
  )

  useEffect(() => {
    loadBatch(true)
  }, [])

  useEffect(() => {
    if (!sentinelRef.current) return
    const el = sentinelRef.current

    const io = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        if (entry.isIntersecting && hasMore && !loadingMore && !loading && !searching) {
          loadBatch(false)
        }
      },
      { rootMargin: "800px 0px" }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [hasMore, loadingMore, loading, loadBatch, searching])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!queryText.trim()) {
      setSearching(false)
      loadBatch(true)
      return
    }

    setSearching(true)
    setLoading(true)

    try {
      const artsRef = collection(db, "arts")
      const q = query(artsRef, where("keywords", "array-contains", queryText.toLowerCase()))
      const snapshot = await getDocs(q)
      const found = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Art[]
      setArts(found)
    } catch (err) {
      console.error("Ошибка при поиске:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />

  return (
    <>
      <Navbar />

      {/* Hero */}
      <div className="flex md:hidden h-screen bg-[url('/images/kunsthubsmall.png')] bg-cover bg-center">
        <div className="flex flex-col h-screen justify-center gap-5">
          <h1 className="text-left mx-auto text-6xl font-bold flex flex-col">
            KUNST <span className="flex">HUB <img src="/images/kunsthubeye.png" alt="Auge" className="flex md:hidden" /></span>
          </h1>
          <h2 className="text-sm text-center mx-auto font-bold max-w-[80%]">
            Das ist KunstHUB! Hier finden Sie alle Kunstwerke, die jemals auf
            unseren Ausstellungen gezeigt wurden oder einfach auf die Website
            hochgeladen wurden.
          </h2>
          <div className="min-w-[75%] mx-auto mt-10 mb-6 ">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Suche nach Titel oder Beschreibung..."
            value={queryText}
            onChange={e => setQueryText(e.target.value)}
            className=" w-full p-4 pr-12 rounded-full text-black  bg-white focus:outline-none focus:ring-0"
          />
          <img
            src="/images/search.png"
            alt="Suche"
            onClick={handleSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer opacity-70"
          />
        </form>
      </div>
        </div>
      </div>

      <div className="md:flex hidden h-screen bg-[url('/images/kunsthubphoto.png')] bg-cover bg-center">
        <div className="w-full flex flex-col h-screen justify-center gap-5">
          <h1 className="text-center mx-auto text-6xl font-bold flex flex-col md:text-[60px] xl:text-[100px]">
            KUNSTHUB
          </h1>
          <h2 className="text-center mx-auto font-semibold max-w-[50%] text-3xl">
            Das ist KunstHUB! Hier finden Sie alle Kunstwerke, die jemals auf
            unseren Ausstellungen gezeigt wurden oder einfach auf die Website
            hochgeladen wurden.
          </h2>
          <div className="min-w-[50%] mx-auto mt-10 mb-6 ">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Suche nach Titel oder Beschreibung..."
            value={queryText}
            onChange={e => setQueryText(e.target.value)}
            className=" w-full p-4 pr-12 rounded-full text-black  bg-white focus:outline-none focus:ring-0"
          />
          <img
            src="/images/search.png"
            alt="Suche"
            onClick={handleSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer opacity-70"
          />
        </form>
      </div>
        </div>
        
      </div>

      

  
      


      {/* Галерея */}
      <div className="p-6 max-w-5xl xl:max-w-[90%] mx-auto">
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-6 xl:gap-10 gap-y-12">
          {arts.map(art => (
            <Link
              href={`/de/gallery/arts/${art.id}`}
              key={art.id}
              className="group rounded-sm overflow-hidden max-w-[100%] block"
              data-card="art"
            >
              <div className="relative w-full h-64">
                <Image
                  src={art.imageUrl}
                  alt={art.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 20vw"
                />
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-black/10 via-black/5 to-black/10" />
              </div>

              <div className="pt-4 pl-0.5">
                <h2 className="text-lg font-semibold">{art.title}</h2>
                {(art.height || art.width) && (
                  <p className="text-gray-600 mt-2">
                    {art.height ?? "?"}cm x {art.width ?? "?"}cm
                  </p>
                )}
                {art.authorUsername && (
                  <p className="text-gray-600">Autor: {art.authorUsername}</p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div ref={sentinelRef} className="h-10" />

        {loadingMore && (
          <div className="flex justify-center py-6">
            <Loader />
          </div>
        )}

        {!hasMore && !searching && (
          <div className="text-center text-sm text-gray-500 py-8">
            — Ende der Liste —
          </div>
        )}
      </div>

      <FooterDe />
    </>
  )
}
