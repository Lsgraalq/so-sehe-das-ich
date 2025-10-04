"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { db, storage } from "@/firebase/config"
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 as uuidv4 } from "uuid"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import Navbar from "@/components/navbarDe"
import FooterDe from "@/components/footerDe"
import Loader from "@/components/loader"
interface Section {
  title: string
  text: string
  iframeUrl?: string
  imageUrl?: string
}

interface Exhibition {
  id: string
  title: string
  description: string
  date: string
  time: string
  actual: boolean
  titleImage?: string
  carousel: string[]
  sections: Section[]
  city: string
  adress: string
}

export default function EditExhibitionPage() {
  const params = useParams()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id || ""
  const router = useRouter()

  const [loadingUser, setLoadingUser] = useState(true)
  const [loadingData, setLoadingData] = useState(true)
  const [exhibition, setExhibition] = useState<Exhibition | null>(null)
  const [uploading, setUploading] = useState(false)

  // проверка админа
  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/de")
        return
      }
      try {
        const snap = await getDoc(doc(db, "users", user.uid))
        if (!snap.exists() || !snap.data().isAdmin) {
          router.push("/de")
        } else {
          setLoadingUser(false)
        }
      } catch (err) {
        console.error("Ошибка проверки прав:", err)
        router.push("/de")
      }
    })
    return () => unsubscribe()
  }, [router])

  // загрузка выставки
  useEffect(() => {
    const fetchExhibition = async () => {
      if (!id) return
      try {
        const ref = doc(db, "exhibitions", id)
        const snap = await getDoc(ref)
        if (snap.exists()) {
          setExhibition({ id: snap.id, ...snap.data() } as Exhibition)
        }
      } catch (err) {
        console.error("Ошибка загрузки выставки:", err)
      } finally {
        setLoadingData(false)
      }
    }
    fetchExhibition()
  }, [id])

  // загрузка файла
  const handleFileUpload = async (file: File, folder: string): Promise<string> => {
    const fileRef = ref(storage, `${folder}/${uuidv4()}-${file.name}`)
    await uploadBytes(fileRef, file)
    return await getDownloadURL(fileRef)
  }

  // секции
  const updateSection = (i: number, field: keyof Section, value: string) => {
    if (!exhibition) return
    const newSections = [...exhibition.sections]
    newSections[i][field] = value
    setExhibition({ ...exhibition, sections: newSections })
  }

  const handleSectionImageUpload = async (i: number, file: File) => {
    if (!exhibition) return
    setUploading(true)
    const url = await handleFileUpload(file, "exhibitions/sections")
    const newSections = [...exhibition.sections]
    newSections[i].imageUrl = url
    setExhibition({ ...exhibition, sections: newSections })
    setUploading(false)
  }

  const addSection = () => {
    if (!exhibition) return
    setExhibition({
      ...exhibition,
      sections: [...exhibition.sections, { title: "", text: "", iframeUrl: "", imageUrl: "" }],
    })
  }

  const moveSection = (i: number, direction: "up" | "down") => {
    if (!exhibition) return
    const newSections = [...exhibition.sections]
    if (direction === "up" && i > 0) {
      ;[newSections[i - 1], newSections[i]] = [newSections[i], newSections[i - 1]]
    }
    if (direction === "down" && i < newSections.length - 1) {
      ;[newSections[i + 1], newSections[i]] = [newSections[i], newSections[i + 1]]
    }
    setExhibition({ ...exhibition, sections: newSections })
  }

  // сохранение
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!exhibition) return
    try {
      const ref = doc(db, "exhibitions", exhibition.id)
      await updateDoc(ref, {
        title: exhibition.title,
        description: exhibition.description,
        date: exhibition.date,
        time: exhibition.time,
        actual: exhibition.actual,
        titleImage: exhibition.titleImage || "",
        carousel: exhibition.carousel || [],
        sections: exhibition.sections || [],
        city: exhibition.city ?? "",
        adress: exhibition.adress ?? "",
      })
      alert("✅ Выставка обновлена!")
      router.push(`/de/ausstellungen/${exhibition.id}`)
    } catch (err) {
      console.error("Ошибка сохранения:", err)
    }
  }

  const handleDelete = async () => {
  if (!exhibition) return
  const confirmed = confirm(`❗ Вы уверены, что хотите удалить выставку "${exhibition.title}"? Это действие необратимо.`)
  if (!confirmed) return
  try {
    await deleteDoc(doc(db, "exhibitions", exhibition.id))
    alert("🗑 Выставка удалена!")
    router.push("/de/ausstellungen")
  } catch (err) {
    console.error("Ошибка удаления выставки:", err)
    alert("❌ Ошибка при удалении выставки")
  }
}

  if (loadingUser || loadingData) {
    return <Loader></Loader>
  }

  if (!exhibition) {
    return <p className="text-center pt-20 text-red-400">❌ Выставка не найдена</p>
  }

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSave}
        className="max-w-4xl mx-auto flex flex-col gap-6 p-6 text-white pt-20 bg-black rounded-xl shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-6">Редактирование выставки</h1>

        <input
          type="text"
          value={exhibition.title}
          onChange={(e) => setExhibition({ ...exhibition, title: e.target.value })}
          className="p-3 rounded bg-gray-900 border border-gray-700"
          placeholder="Название"
        />
        

        <textarea
          value={exhibition.description}
          onChange={(e) => setExhibition({ ...exhibition, description: e.target.value })}
          className="p-3 rounded bg-gray-900 border border-gray-700 h-28"
          placeholder="Описание"
        />
         <input
          value={exhibition.city ?? ""}
          onChange={(e) => setExhibition({ ...exhibition, city: e.target.value })}
          className="p-3 rounded bg-gray-900 border border-gray-700 "
          placeholder="город"
        />

      <input
          value={exhibition.adress ?? ""}
          onChange={(e) => setExhibition({ ...exhibition, adress: e.target.value })}
          className="p-3 rounded bg-gray-900 border border-gray-700 "
          placeholder="адресс"
        />


        <div className="flex gap-4">
          <input
            type="date"
            value={exhibition.date}
            onChange={(e) => setExhibition({ ...exhibition, date: e.target.value })}
            className="p-3 rounded bg-gray-900 border border-gray-700"
          />
          <input
            type="text"
            value={exhibition.time}
            onChange={(e) => setExhibition({ ...exhibition, time: e.target.value })}
            className="p-3 rounded bg-gray-900 border border-gray-700"
            placeholder="Например: 13:00–17:00"
          />
        </div>
        

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={exhibition.actual}
            onChange={(e) => setExhibition({ ...exhibition, actual: e.target.checked })}
          />
          Текущая выставка
        </label>

        {/* секции */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Секции</h2>
          {exhibition.sections.map((s, i) => (
            <div key={i} className="bg-gray-900 border border-gray-700 p-4 rounded-lg space-y-3 relative">
              <input
                type="text"
                placeholder="Заголовок"
                value={s.title}
                onChange={(e) => updateSection(i, "title", e.target.value)}
                className="p-2 rounded bg-gray-800 border border-gray-600 w-full"
              />

              <textarea
                placeholder="Текст (оставь пустым, если хочешь iframe)"
                value={s.text}
                onChange={(e) => updateSection(i, "text", e.target.value)}
                className="p-2 rounded bg-gray-800 border border-gray-600 w-full h-20 resize-none"
              />

              <input
                type="text"
                placeholder="Iframe URL (например: Google Maps embed)"
                value={s.iframeUrl || ""}
                onChange={(e) => updateSection(i, "iframeUrl", e.target.value)}
                className="p-2 rounded bg-gray-800 border border-gray-600 w-full"
              />

              {!s.imageUrl ? (
                <input
                  type="file"
                  onChange={(e) => e.target.files && handleSectionImageUpload(i, e.target.files[0])}
                  className="text-sm text-gray-400"
                />
              ) : (
                <img src={s.imageUrl} alt="" className="h-32 rounded-lg object-cover" />
              )}

              {/* кнопки управления */}
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => moveSection(i, "up")}
                  className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                >
                  ⮝ Вверх
                </button>
                <button
                  type="button"
                  onClick={() => moveSection(i, "down")}
                  className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                >
                  ⮟ Вниз
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addSection}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-medium"
          >
            + Добавить секцию
          </button>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded font-semibold text-lg mt-6"
        >
          {uploading ? "⏳ Сохраняется..." : "💾 Сохранить выставку"}
        </button>
      </form>
      <div className=" mx-auto items-center flex">
          <button
          type="button"
          onClick={handleDelete}
          className=" py-3 bg-red-600 hover:bg-red-700 rounded font-semibold text-lg  w-100 mx-auto h-10"
        >
          🗑 Удалить выставку
        </button>

      </div>
      
      <FooterDe />
    </>
  )
}
