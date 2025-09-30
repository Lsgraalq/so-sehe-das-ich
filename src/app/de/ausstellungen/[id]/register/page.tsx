"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { auth, db } from "@/firebase/config"
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore"
import NavbarDe from "@/components/navbarDe"
import FooterDe from "@/components/footerDe"

interface Art {
  id: string
  title: string
  imageUrl: string
  exhibition?: string | null
}

export default function RegisterExhibitionPage() {
  const params = useParams()
  // так как папка называется [id]
  const exhibitionId = params?.id ? String(params.id) : null

  const [arts, setArts] = useState<Art[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [acceptAGB, setAcceptAGB] = useState(false)

  useEffect(() => {
    const fetchArts = async () => {
      if (!auth.currentUser) {
        setLoading(false)
        return
      }
      try {
        const q = query(
          collection(db, "arts"),
          where("authorId", "==", auth.currentUser.uid)
        )
        const snap = await getDocs(q)
        const list: Art[] = []
        snap.forEach((d) => {
          const data = d.data() as Art
          list.push({ ...data, id: d.id })
        })
        setArts(list)

        // выставляем выбранные, если уже есть эта выставка
        if (exhibitionId) {
          const preSelected = list
            .filter((art) => art.exhibition === exhibitionId)
            .map((art) => art.id)
          setSelected(preSelected)
        }
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    fetchArts()
  }, [exhibitionId, auth.currentUser])

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const handleSave = async () => {
    if (!acceptAGB) {
      alert("Bitte AGB akzeptieren")
      return
    }
    if (!exhibitionId) {
      alert("Fehler: Ungültige Ausstellung")
      return
    }

    setSaving(true)
    try {
      for (const art of arts) {
        const artRef = doc(db, "arts", art.id)
        if (selected.includes(art.id)) {
          await updateDoc(artRef, { exhibition: exhibitionId })
        } else {
          await updateDoc(artRef, { exhibition: null })
        }
      }
      alert("Gespeichert!")
    } catch (err) {
      console.error(err)
      alert("Fehler beim Speichern")
    }
    setSaving(false)
  }

  return (
    <>
      <NavbarDe />
      <div className="max-w-3xl mx-auto p-6 pt-20 text-white">
        <h1 className="text-2xl font-bold mb-6">
          Registrierung für Ausstellung 
        </h1>

        {loading ? (
          <p>Lädt...</p>
        ) : (
          <div className="space-y-4">
            {arts.map((art) => (
              <div
                key={art.id}
                className="flex items-center gap-4 bg-zinc-900 p-4 rounded"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(art.id)}
                  onChange={() => toggleSelect(art.id)}
                />
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <span className="text-lg">{art.title}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 mt-6">
          <input
            type="checkbox"
            checked={acceptAGB}
            onChange={(e) => setAcceptAGB(e.target.checked)}
          />
          <label>
            Ich akzeptiere die{" "}
            <a href="/agb" className="underline text-blue-400">
              AGB
            </a>
          </label>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || !acceptAGB}
          className="mt-4 px-6 py-2 rounded bg-gradient-to-r from-[#FEC97C] to-[#E35A5A] text-white disabled:opacity-50"
        >
          {saving ? "Speichern..." : "Speichern"}
        </button>
      </div>
      <FooterDe />
    </>
  )
}
