"use client"
import { useState } from "react"

export default function ImageUploader() {
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const url = URL.createObjectURL(file)
      setPreview(url)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    setFileName(null)
  }

  return (
    <div className="w-full flex flex-col items-center">
      <label
        htmlFor="fileUpload"
        className={`w-[380px] h-[240px] flex items-center justify-center rounded-md cursor-pointer transition-all duration-300 overflow-hidden relative group border-2 ${
          preview
            ? "border-[#8a74c0]"
            : "border-[#333] hover:border-[#c75dfb] hover:shadow-[0_0_15px_#c75dfb50]"
        }`}
      >
        {/* Если изображение выбрано */}
        {preview ? (
          <>
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded hover:bg-red-600 transition-colors"
            >
              Удалить
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500">
            <div className="text-6xl mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#c75dfb]">+</div>
            <p className="text-sm text-gray-400">Нажми, чтобы загрузить</p>
          </div>
        )}
        <input
          id="fileUpload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Имя файла под превью */}
      {fileName && (
        <p className="mt-3 text-gray-400 text-sm truncate max-w-[360px] text-center">
          {fileName}
        </p>
      )}
    </div>
  )
}
