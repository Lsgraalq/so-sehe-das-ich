"use client"

import { useState } from "react"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { doc, updateDoc } from "firebase/firestore"
import { storage, db } from "@/firebase/config"
import { MdOutlineModeEdit } from "react-icons/md";


interface AvatarUploaderProps {
  userId: string
  onUpload: (url: string) => void
}

export default function AvatarUploader({ userId, onUpload }: AvatarUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    const storageRef = ref(storage, `avatars/${userId}`)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    await updateDoc(doc(db, "users", userId), { avatarUrl: url })
    onUpload(url)
    setLoading(false)
    setFile(null)
    setPreview(null)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {/* превью аватарки */}
      
        <label className=" bg-gray-700 text-white text-xs px-3 py-3 rounded-full cursor-pointer hover:bg-gray-500">
         <MdOutlineModeEdit />

          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
     

      {/* кнопка загрузки */}
      {file && (
        <button
          onClick={handleUpload}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mt-0"
        >
          {loading ? "Загрузка..." : "Сохранить"}
        </button>
      )}
    </div>
  )
}
