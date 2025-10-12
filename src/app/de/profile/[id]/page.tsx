"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { auth, db } from "@/firebase/config"
import { onAuthStateChanged } from "firebase/auth"
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore"
import Navbar from "@/components/navbarDe"
import FooterDe from "@/components/footerDe"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Loader from "@/components/loader"
import { deleteDoc } from "firebase/firestore"
import { ref, deleteObject } from "firebase/storage"
import { storage } from "@/firebase/config" 
import { getDocs, collection } from "firebase/firestore"

export default function EditArtPage() {
  const { id } = useParams()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [allowed, setAllowed] = useState(false)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedPaints, setSelectedPaints] = useState<string[]>([])
  const [creationDate, setCreationDate] = useState<Date | null>(null)
  const [forSale, setForSale] = useState(false)
  const [inAuction, setInAuction] = useState(false)
  const [price, setPrice] = useState<number | null>(null)
  const [height, setHeight] = useState<number | null>(null)
  const [width, setWidth] = useState<number | null>(null)

const materialOptions = [
  "Leinwand", "Papier", "Karton", "Stoff", "Holz", "Gips",
  "Leinwandpapier", "MDF-Platten", "Pergament", "Kunststoff", "Ton",
  "Wachs", "Stein", "Metall", "Beton", "Plastilin", "Modelliermasse",
  "Polymer Clay", "Keramik", "Leder", "Glas"
];

const paintOptions = [
  "Ölfarben", "Acrylfarben", "Gouachefarben", "Aquarellfarben", "Lackfarben",
  "Tusche", "Enkaustik", "Sprühfarben", "Kaseinfarben", "Airbrushfarben",
  "Alkydfarben", "Freskotechnik"
];
  useEffect(() => {
    const load = async () => {
      const unsub = onAuthStateChanged(auth, async (user) => {
        if (!user) {
          router.push("/de/sign-in")
          return
        }

        const ref = doc(db, "arts", id as string)
        const snap = await getDoc(ref)

        if (!snap.exists()) {
          alert("Kunstwerk nicht gefunden.")
          router.push("/de/profile")
          return
        }

        const data = snap.data()

        // Проверяем, владелец ли текущий пользователь
        if (data.userId !== user.uid) {
          alert("Sie dürfen dieses Kunstwerk nicht bearbeiten.")
          router.push("/de/profile")
          return
        }

        setAllowed(true)

        // Загружаем данные в форму
        setTitle(data.title || "")
        setDescription(data.description || "")
        setSelectedMaterials(data.materials || [])
        setSelectedPaints(data.paintType || [])
        setCreationDate(data.creationDate ? new Date(data.creationDate.seconds * 1000) : null)
        setForSale(data.forSale || false)
        setInAuction(data.inAuction || false)
        setPrice(data.price || null)
        setHeight(data.height || null)
        setWidth(data.width || null)

        setLoading(false)
      })
      return () => unsub()
    }

    load()
  }, [id, router])

  const handleToggle = (
    arr: string[],
    setArr: (v: string[]) => void,
    value: string
  ) => {
    if (arr.includes(value)) {
      setArr(arr.filter((v) => v !== value))
    } else {
      setArr([...arr, value])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!allowed) return

    setSaving(true)
    try {
      const ref = doc(db, "arts", id as string)
      await updateDoc(ref, {
        title,
        description,
        materials: selectedMaterials,
        paintType: selectedPaints,
        creationDate: creationDate ? creationDate : null,
        forSale,
        inAuction,
        price: forSale ? price : null,
        height,
        width,
        updatedAt: serverTimestamp(),
      })

      alert("Kunstwerk wurde aktualisiert ✅")
      router.push("/de/profile")
    } catch (err) {
      console.error(err)
      alert("Fehler beim Aktualisieren.")
    } finally {
      setSaving(false)
    }
  }

const handleDelete = async () => {
  const confirmDelete = confirm("Bist du sicher, dass du dieses Kunstwerk löschen möchtest?")
  if (!confirmDelete) return

  try {
    setSaving(true)

    const artRef = doc(db, "arts", id as string)
    const snap = await getDoc(artRef)

    if (!snap.exists()) {
      alert("Kunstwerk nicht gefunden.")
      return
    }

    const data = snap.data()

    
    const exhibitionsSnap = await getDocs(collection(db, "exhibitions"))
    const affectedExhibitions = exhibitionsSnap.docs.filter(ex =>
      (ex.data().arts || []).includes(id)
    )

   
    for (const ex of affectedExhibitions) {
      const exRef = doc(db, "exhibitions", ex.id)
      const updatedArts = (ex.data().arts || []).filter((artId: string) => artId !== id)
      await updateDoc(exRef, { arts: updatedArts })
      console.log(`🧹 Removed art ${id} from exhibition ${ex.id}`)
    }

    
    if (data.imageUrl) {
      const storageRef = ref(storage, data.imageUrl)
      await deleteObject(storageRef).catch(() =>
        console.warn("Bild konnte nicht gelöscht werden")
      )
    }

   
    await deleteDoc(artRef)

    alert("Kunstwerk wurde gelöscht ✅")
    router.push("/de/profile")
  } catch (err) {
    console.error(err)
    alert("Fehler beim Löschen.")
  } finally {
    setSaving(false)
  }
}


  if (loading) return <><Loader></Loader></>
  if (!allowed) return null

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto py-20 px-6 text-white">
        <h1 className="text-4xl font-bold mb-10 text-center">
          Kunstwerk bearbeiten
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <input
            type="text"
            placeholder="Titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded bg-[#FAF3F3] text-gray-500 focus:outline-none focus:border-0"
            required
          />

          <textarea
            placeholder="Beschreibung"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded bg-[#FAF3F3] text-gray-500 focus:outline-none focus:border-0"
            required
          />

            <div className="flex flex-wrap gap-2 mt-2">
            {materialOptions.map((m) => (
                <button
                type="button"
                key={m + (selectedMaterials.includes(m) ? "-active" : "-inactive")}
                onClick={() =>
                    handleToggle(selectedMaterials, setSelectedMaterials, m)
                }
                className={`px-3 py-1 rounded transition-all duration-300 ease-in-out transform ${
                    selectedMaterials.includes(m)
                    ? "bg-[#8828ee] text-white scale-105 shadow-[0_0_10px_#e41717aa]"
                    : "bg-[#9773BD] text-white"
                }`}
                >
                {m}
                </button>
            ))}
            </div>
        
            <label className="font-semibold">Farbart:</label>
            <div className="flex flex-wrap gap-2 mt-2">
            {paintOptions.map((p) => (
                <button
                type="button"
                key={p + (selectedPaints.includes(p) ? "-active" : "-inactive")}
                onClick={() =>
                    handleToggle(selectedPaints, setSelectedPaints, p)
                }
                className={`px-3 py-1 rounded transition-all duration-300 ease-in-out transform ${
                    selectedPaints.includes(p)
                    ? "bg-[#e41717] text-white scale-105 shadow-[0_0_10px_#e41717aa]"
                    : "bg-[#E24C4C] text-white"
                }`}
                >
                {p}
                </button>
            ))}
            </div>
          <div>
            <label className="font-semibold">Entstehungsdatum:</label>
            <DatePicker
              selected={creationDate}
              onChange={(date: Date | null) => setCreationDate(date)}
              dateFormat="dd.MM.yyyy"
              className="w-full p-3 rounded bg-[#FAF3F3] text-gray-500 focus:outline-none focus:border-0"
              placeholderText="Datum wählen"
              showYearDropdown
              scrollableYearDropdown
            />
          </div>

          {!inAuction && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={forSale}
                onChange={(e) => setForSale(e.target.checked)}
              />
              <label>Zum Verkauf</label>
            </div>
          )}

          {forSale && (
            <input
              type="number"
              placeholder="Preis (€)"
              value={price ?? ""}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full p-3 rounded bg-[#FAF3F3] text-gray-500 focus:outline-none focus:border-0"
              required={forSale}
            />
          )}

          {!forSale && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={inAuction}
                onChange={(e) => setInAuction(e.target.checked)}
              />
              <label>Nimmt an der Auktion teil</label>
            </div>
          )}

          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="font-semibold">Höhe (cm):</label>
              <input
                type="number"
                placeholder="z.B. 80"
                value={height ?? ""}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full p-3 rounded bg-[#FAF3F3] text-gray-500 focus:outline-none focus:border-0"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="font-semibold">Breite (cm):</label>
              <input
                type="number"
                placeholder="z.B. 60"
                value={width ?? ""}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full p-3 rounded bg-[#FAF3F3] text-gray-500 focus:outline-none focus:border-0"
                required
              />
            </div>
          </div>

          <div className="w-full text-center flex flex-row gap-10">
                    <button
        type="button"
        onClick={handleDelete}
        className="min-w-[30%] bg-gradient-to-r from-[#fa0000] to-[#770404] text-white p-2 rounded transition-all duration-300"
        disabled={saving}
        >
        {saving ? "Löscht..." : "Kunstwerk löschen"}
        </button>
            <button
              type="submit"
              className="min-w-[30%] bg-gradient-to-r from-[#FEC97C] to-[#E35A5A] text-white p-2 rounded"
              disabled={saving}
            >
              {saving ? "Speichert..." : "Änderungen speichern"}
            </button>
          </div>
        </form>
      </div>

      <FooterDe />
    </>
  )
}
