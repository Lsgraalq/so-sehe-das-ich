"use client"
import { useState, useEffect } from "react"

export default function ImageUploaderWrapper({
  onFileSelect,
  resetTrigger,
}: {
  onFileSelect: (file: File | null) => void
  resetTrigger?: boolean
}) {
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    // если родитель сбросил форму — очищаем превью
    setPreview(null)
    onFileSelect(null)
  }, [resetTrigger])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      onFileSelect(file)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    onFileSelect(null)
  }

  return (
    <div className="w-full flex flex-col items-center">
      <label
        htmlFor="fileUpload"
        className={`w-full h-[50vh] flex items-center justify-center rounded-md cursor-pointer transition-all duration-300 overflow-hidden relative group border-2 ${
          preview
            ? "border-[#8a74c0]"
            : "border-[#333] hover:border-[#c75dfb] hover:shadow-[0_0_15px_#c75dfb50]"
        }`}
      >
        {preview ? (
          <>
            <img src={preview} alt="preview" className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105" />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded hover:bg-red-600 transition-colors"
            >
              Löschen
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500">
            <div className="text-6xl mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#c75dfb]">+</div>
            <p className="text-sm text-gray-400">Klicke, um hochzuladen</p>
          </div>
        )}
        <input id="fileUpload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </label>
    </div>
  )
}
