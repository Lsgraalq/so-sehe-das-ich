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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setPreview(null)
    onFileSelect(null)
  }, [resetTrigger])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (!file) return
    setError(null)

    const allowedExtensions = ["jpg", "jpeg", "png", "webp", "heic", "heif"]
    const ext = file.name.split(".").pop()?.toLowerCase()

    if (!ext || !allowedExtensions.includes(ext)) {
      setError("❌ Nur JPG, PNG, WEBP oder HEIC werden unterstützt.")
      e.target.value = ""
      return
    }

    let finalFile = file

    // HEIC → JPEG Konvertierung
    if (ext === "heic" || ext === "heif") {
      try {
        // ⬇️ динамический импорт — только в браузере
        const { default: heic2any } = await import("heic2any")
        const result = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.9,
        })

        const convertedBlob = Array.isArray(result) ? result[0] : result

        finalFile = new File([convertedBlob], file.name.replace(/\.[^.]+$/, ".jpg"), {
          type: "image/jpeg",
        })

        console.log("✅ HEIC wurde in JPEG konvertiert:", finalFile.name)
      } catch (err: any) {
        console.error("HEIC-Konvertierungsfehler:", err?.message || err)
        setError("⚠️ Dieses HEIC-Format wird leider nicht unterstützt. Bitte speichern Sie das Foto als JPG oder PNG und versuchen Sie es erneut.")
        return
      }
    }

    const url = URL.createObjectURL(finalFile)
    setPreview(url)
    onFileSelect(finalFile)
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
            <img
              src={preview}
              alt="Vorschau"
              className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
            />
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
            <div className="text-6xl mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#c75dfb]">
              +
            </div>
            <p className="text-sm text-gray-400">
              Klicke, um ein Bild hochzuladen
            </p>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        )}
        <input
          id="fileUpload"
          type="file"
          accept="image/png, image/jpeg, image/webp, image/heic, image/heif"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  )
}
