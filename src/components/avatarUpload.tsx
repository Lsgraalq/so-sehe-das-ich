"use client"

import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { storage, db } from "@/firebase/config";

interface AvatarUploaderProps {
  userId: string;
  onUpload: (url: string) => void;
}

export default function AvatarUploader({ userId, onUpload }: AvatarUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const storageRef = ref(storage, `avatars/${userId}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    await updateDoc(doc(db, "users", userId), { avatarUrl: url });
    onUpload(url); 
    setLoading(false);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} className=""/>
      <button onClick={handleUpload} disabled={!file || loading}>
        {loading ? "Загрузка..." : "Подтвердить"}
      </button>
    </div>
  );
}