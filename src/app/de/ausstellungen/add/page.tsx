"use client"

import { useState } from "react"
import { db, storage } from "@/firebase/config"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 as uuidv4 } from "uuid"
import Navbar from "@/components/navbarDe"
import FooterDe from "@/components/footerDe"


export default function CreateExhibitionForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [carousel, setCarousel] = useState<string[]>([])
  const [sections, setSections] = useState<{ title: string; text: string; imageUrl: string }[]>([])
  const [uploading, setUploading] = useState(false)

 
  // загрузка файла в Firebase Storage
  const handleFileUpload = async (file: File, folder: string): Promise<string> => {
    const fileRef = ref(storage, `${folder}/${uuidv4()}-${file.name}`)
    await uploadBytes(fileRef, file)
    return await getDownloadURL(fileRef)
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
        carousel,
        sections,
        participants: [],
        createdAt: serverTimestamp()
      })
      alert("✅ Выставка успешно создана!")
      setTitle("")
      setDescription("")
      setDate("")
      setTime("")
      setCarousel([])
      setSections([])
    } catch (err) {
      console.error("Ошибка создания выставки:", err)
    }
  }

  return (
    <>
    <Navbar></Navbar>
   
   <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex flex-col gap-6 p-6  bg-cover bg-center bg-no-repeat text-white rounded-2xl shadow-lg pt-20">
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

      {/* Фото для карусели */}
     <div className="bg-gray-800 p-4 rounded-xl shadow-md">
  <h2 className="font-semibold text-lg mb-3">Фото для карусели</h2>

  {/* input */}
  <label className="block w-full cursor-pointer mb-4">
    <span className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium transition">
      📤 Загрузить фото
    </span>
    <input
      type="file"
      multiple
      onChange={handleCarouselUpload}
      className="hidden"
    />
  </label>

  {uploading && (
    <p className="text-yellow-400 text-sm mb-2 animate-pulse">
      ⏳ Загружается...
    </p>
  )}

  {/* превью фото */}
  <div className="flex gap-3 overflow-x-auto pb-2">
    {carousel.map((url, i) => (
      <div
        key={i}
        className="relative group w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden shadow-md"
      >
        <img
          src={url}
          alt={`carousel-${i}`}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        {/* кнопка удаления */}
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
    <div
      key={i}
      className="border border-gray-700 p-4 rounded-lg mb-6 space-y-3 bg-gray-900 shadow-md"
    >
      {/* Заголовок */}
      <input
        type="text"
        placeholder="Заголовок"
        value={s.title}
        onChange={(e) => updateSection(i, "title", e.target.value)}
        className="p-2 rounded bg-gray-800 border border-gray-700 w-full"
      />

      {/* Текст */}
      <textarea
        placeholder="Текст"
        value={s.text}
        onChange={(e) => updateSection(i, "text", e.target.value)}
        className="p-2 rounded bg-gray-800 border border-gray-700 w-full h-24 resize-none"
      />

      {/* Картинка */}
      {!s.imageUrl ? (
        <label className="block cursor-pointer">
          <span className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium transition">
            📤 Загрузить фото
          </span>
          <input
            type="file"
            className="hidden"
            onChange={(e) =>
              e.target.files && handleSectionImageUpload(i, e.target.files[0])
            }
          />
        </label>
      ) : (
        <div className="relative group w-40 h-28 rounded-lg overflow-hidden shadow-md">
          <img
            src={s.imageUrl}
            alt={`section-${i}`}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
          {/* кнопка удаления */}
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

  {/* кнопка добавить секцию */}
  <button
    type="button"
    onClick={addSection}
    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-medium transition"
  >
    + Добавить секцию
  </button>
</div>


      {/* Submit */}
      <button type="submit" disabled={uploading} className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded font-semibold">
        {uploading ? "⏳ Загружается..." : "✅ Создать выставку"}
      </button>
    </form>

    <FooterDe></FooterDe>
    </>
  )
}
