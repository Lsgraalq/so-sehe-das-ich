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
  getDoc,
  updateDoc,
  arrayUnion, 
  arrayRemove
} from "firebase/firestore"
import NavbarDe from "@/components/navbarDe"
import FooterDe from "@/components/footerDe"
import { onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/navigation"


interface Art {
  authorId: string
  id: string
  title: string
  imageUrl: string
  exhibition?: string | null
}


interface UserData {
  userUid : string;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  username: string;
  isArtist: boolean;
  avatarUrl?: string;
  createdAt: string;
}

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
}


export default function RegisterExhibitionPage() {
  const router = useRouter()
  const params = useParams()
  // так как папка называется [id]
  const exhibitionId = params?.id ? String(params.id) : null
  
  const [arts, setArts] = useState<Art[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [acceptAGB, setAcceptAGB] = useState(false)
  const [exhibition, setExhibition] = useState<Exhibition | null>(null)
  const [uid, setUid] = useState<string | null>(null)


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUid(user ? user.uid : null)
    })
    return unsubscribe
  }, [])


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


  useEffect(() => {
    const fetchExhibitions = async () => {
      if (!auth.currentUser) {
        setLoading(false)
        return
      }
      try {
        const ref = doc(db, "exhibitions", exhibitionId!)
        const snap = await getDoc(ref)
          if (snap.exists()) {
    const exhibition: Exhibition = {
      id: snap.id,
      ...(snap.data() as Omit<Exhibition, "id">) // все поля кроме id
    }

    setExhibition(exhibition)
    }

      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    fetchExhibitions()
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
        const exhbRef = doc(db, "exhibitions", exhibitionId)
        if (selected.includes(art.id)) {
          await updateDoc(artRef, { exhibition: exhibitionId })
         await updateDoc(exhbRef, {
          arts: arrayUnion(art.id),
          participants: arrayUnion(uid)
        })
        } else {
          await updateDoc(artRef, { exhibition: null })
          await updateDoc(exhbRef, {arts: arrayRemove(art.id),})

          if (exhibition) {
                  const stillHasArts = arts.some(
                    (a) => selected.includes(a.id) && a.authorId === uid
                  )
            if (!uid) {
            alert("Kein Benutzer angemeldet")
            return
          }
            if (!stillHasArts) {
            await updateDoc(exhbRef, {
              participants: arrayRemove(uid),
            })
          } 
          }
          
    }
      }
      alert("Gespeichert!")
      router.push("/de/gallery")
    } catch (err) {
      console.error(err)
      alert("Fehler beim Speichern")
    }
    setSaving(false)
  }

  return (
    <>
      <NavbarDe />
      <div className="md:max-w-[80%] mx-auto p-6 pt-20 text-white text-center">
        <h1 className="text-2xl font-bold mb-6">
          Registrierung für Ausstellung 
        </h1>

        {loading ? (
          <p>Lädt...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-5 ">
            {arts.map((art) => (
              <label
                key={art.id}
                className="flex flex-col"
              >
               
                <img
              src={art.imageUrl}
              alt={art.title}
              className="w-full h-64 object-cover"
            />
            
                <span className="text-lg">{art.title}</span>
                 <input
                  type="checkbox"
                  className="peer hidden"
                  checked={selected.includes(art.id)}
                  onChange={() => toggleSelect(art.id)}
                />
                <span className="w-5 h-5 mx-auto rounded border border-gray-400 peer-checked:bg-purple-600 peer-checked:border-purple-600 flex items-center justify-center transition">
    ✓
  </span>
              </label>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 mt-6 md:max-w-[51%] mx-auto">
          <input
            type="checkbox"
            checked={acceptAGB}
            onChange={(e) => setAcceptAGB(e.target.checked)}
          />
          <label className="text-xs md:text-sm text-left">
            Ich bestätige, dass ich den  {" "}
            <a href="/de/kommissionsvertrag " className="underline text-blue-400">
             Kommissionsvertrag
            </a>
            {" "}
            gelesen habe und mit allen Bedingungen einverstanden bin.
Ich bin über 18 Jahre alt und stimme der Verarbeitung meiner personenbezogenen Daten gemäß der Datenschutzerklärung zu.
          </label>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || !acceptAGB}
          className="mt-4 px-6 py-2 rounded bg-gradient-to-r from-[#FEC97C] to-[#E35A5A] text-white disabled:opacity-50 "
        >
          {saving ? "Speichern..." : "Speichern"}
        </button>
      </div>
      <FooterDe />
    </>
  )
}
