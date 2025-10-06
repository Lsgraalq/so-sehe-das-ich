"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { db, storage } from "@/firebase/config"
import { collection, addDoc, serverTimestamp, doc, getDoc, } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 as uuidv4 } from "uuid"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import Navbar from "@/components/navbarDe"
import FooterDe from "@/components/footerDe"

export default function CreateExhibitionForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [city, setCity] = useState("")
  const [adress, setAdress] = useState("")
  const [time, setTime] = useState("")
  const [actual, setActual] = useState(false)
  const [titleImage, setTitleImage] = useState<string>("")
  const [carousel, setCarousel] = useState<string[]>([])
  const [sections, setSections] = useState<{ title: string; text: string; imageUrl: string }[]>([])
  const [uploading, setUploading] = useState(false)
    const router = useRouter()
  const [loadingUser, setLoadingUser] = useState(true)

  // проверка пользователя
  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/de") // если не авторизован
        return
      }
      try {
        const snap = await getDoc(doc(db, "users", user.uid))
        if (!snap.exists() || !snap.data().isAdmin) {
          router.push("/de") // если нет isAdmin
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

  // пока идёт проверка
  if (loadingUser) {
    return <p className="text-center pt-20 text-gray-400">⏳ Проверка доступа...</p>
  }


  // загрузка файла в Firebase Storage
  const handleFileUpload = async (file: File, folder: string): Promise<string> => {
    const fileRef = ref(storage, `${folder}/${uuidv4()}-${file.name}`)
    await uploadBytes(fileRef, file)
    return await getDownloadURL(fileRef)
  }

  // фото для обложки
  const handleTitleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return
    setUploading(true)
    const url = await handleFileUpload(e.target.files[0], "exhibitions/titleImage")
    setTitleImage(url)
    setUploading(false)
  }

  // фото для карусели
  const handleCarouselUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setUploading(true)
    const urls: string[] = []
    for (const file of Array.from(e.target.files)) {
      const url = await handleFileUpload(file, "exhibitions/carousel")
      urls.push(url)
    }
    setCarousel([...carousel, ...urls])
    setUploading(false)
  }

  // обновление картинки в секции
  const handleSectionImageUpload = async (i: number, file: File) => {
    setUploading(true)
    const url = await handleFileUpload(file, "exhibitions/sections")
    const newArr = [...sections]
    newArr[i].imageUrl = url
    setSections(newArr)
    setUploading(false)
  }

  const addSection = () => setSections([...sections, { title: "", text: "", imageUrl: "" }])
  const updateSection = (i: number, field: keyof typeof sections[0], value: string) => {
    const newArr = [...sections]
    newArr[i][field] = value
    setSections(newArr)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "exhibitions"), {
        title,
        description,
        date,
        time,
        actual,
        titleImage,
        carousel,
        sections,
        participants: [],   // пустой список
        arts: [],           // пустой список
        city: city || "",   // строка (по умолчанию пустая)
        adress: adress || "",
        createdAt: serverTimestamp(),
        
      })
      alert("✅ Выставка успешно создана!")
      setTitle("")
      setDescription("")
      setDate("")
      setTime("")
      setActual(false)
      setTitleImage("")
      setCarousel([])
      setAdress("")
      setCity("")
      setSections([])
      router.push(`/de/ausstellungen/`)
    } catch (err) {
      console.error("Ошибка создания выставки:", err)
    }
  }

  return (
    <>
      <Navbar />

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto flex flex-col gap-6 p-6 bg-cover bg-center bg-no-repeat text-white rounded-2xl shadow-lg pt-20"
      >
        <h1 className="text-2xl font-bold">Создание выставки</h1>

        {/* Название */}
        <input
          type="text"
          placeholder="Название выставки"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700"
          required
        />

        {/* Описание */}
        <textarea
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700 h-32"
        />

        {/* Дата */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700"
          required
        />

        {/* Время */}
        <input
          type="text"
          placeholder="Например: 13:00–17:00"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700"
        />
         <input
          type="text"
          placeholder="Макеевка"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700"
        />
         <input
          type="text"
          placeholder="проспект победы 52б"
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700"
        />

        {/* Статус actual */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={actual}
            onChange={(e) => setActual(e.target.checked)}
          />
          <span>Выставка проводится сейчас</span>
        </label>

        {/* Фото для обложки */}
        <div className="bg-gray-800 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold text-lg mb-3">Обложка выставки</h2>
          {!titleImage ? (
            <label className="block w-full cursor-pointer mb-4">
              <span className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium transition">
                📤 Загрузить обложку
              </span>
              <input type="file" onChange={handleTitleImageUpload} className="hidden" />
            </label>
          ) : (
            <div className="relative group w-40 h-28 rounded-lg overflow-hidden shadow-md">
              <img src={titleImage} alt="title" className="object-cover w-full h-full" />
              <button
                type="button"
                onClick={() => setTitleImage("")}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Фото для карусели */}
        <div className="bg-gray-800 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold text-lg mb-3">Фото для карусели</h2>
          <label className="block w-full cursor-pointer mb-4">
            <span className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium transition">
              📤 Загрузить фото
            </span>
            <input type="file" multiple onChange={handleCarouselUpload} className="hidden" />
          </label>
          {uploading && <p className="text-yellow-400 text-sm mb-2 animate-pulse">⏳ Загружается...</p>}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {carousel.map((url, i) => (
              <div key={i} className="relative group w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                <img src={url} alt={`carousel-${i}`} className="object-cover w-full h-full" />
                <button
                  type="button"
                  onClick={() => setCarousel(carousel.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Секции */}
        <div className="bg-gray-800 p-4 rounded-xl shadow-md">
          <h2 className="font-semibold text-lg mb-3">Секции</h2>
          {sections.map((s, i) => (
            <div key={i} className="border border-gray-700 p-4 rounded-lg mb-6 space-y-3 bg-gray-900 shadow-md">
              <input
                type="text"
                placeholder="Заголовок"
                value={s.title}
                onChange={(e) => updateSection(i, "title", e.target.value)}
                className="p-2 rounded bg-gray-800 border border-gray-700 w-full"
              />
              <textarea
                placeholder="Текст"
                value={s.text}
                onChange={(e) => updateSection(i, "text", e.target.value)}
                className="p-2 rounded bg-gray-800 border border-gray-700 w-full h-24 resize-none"
              />
              {!s.imageUrl ? (
                <label className="block cursor-pointer">
                  <span className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium transition">
                    📤 Загрузить фото
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => e.target.files && handleSectionImageUpload(i, e.target.files[0])}
                  />
                </label>
              ) : (
                <div className="relative group w-40 h-28 rounded-lg overflow-hidden shadow-md">
                  <img src={s.imageUrl} alt={`section-${i}`} className="object-cover w-full h-full" />
                  <button
                    type="button"
                    onClick={() => {
                      const newArr = [...sections]
                      newArr[i].imageUrl = ""
                      setSections(newArr)
                    }}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addSection}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-medium transition"
          >
            + Добавить секцию
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={uploading}
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded font-semibold"
        >
          {uploading ? "⏳ Загружается..." : "✅ Создать выставку"}
        </button>
      </form>

      <FooterDe />
    </>
  )
}
