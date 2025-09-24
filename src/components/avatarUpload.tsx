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
  const [loading, setLoading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setLoading(true)

      const storageRef = ref(storage, `avatars/${userId}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      await updateDoc(doc(db, "users", userId), { avatarUrl: url })
      onUpload(url)

      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <label className="bg-gray-700 text-white text-xs px-3 py-3 rounded-full cursor-pointer hover:bg-gray-500">
        <MdOutlineModeEdit />
        <input type="file" className="hidden" onChange={handleFileChange} />
      </label>

      {loading && <p className="text-sm text-gray-500 ">Загрузка...</p>}
    </div>
  )
}
