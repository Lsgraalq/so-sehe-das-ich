// app/profile/[username]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/app/firebase/config"
import Navbar from "../../../../../components/navbarDe"



export default function AuthorProfilePage() {
  const { username } = useParams() as { username: string }

  const [userData, setUserData] = useState<any>(null)
  const [artworks, setArtworks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получаем пользователя по username
        const q = query(collection(db, "users"), where("username", "==", username))
        const userSnap = await getDocs(q)

        if (!userSnap.empty) {
          const docData = userSnap.docs[0]
          const data = docData.data()
          const userId = docData.id

          setUserData(data)

          // Если это художник — подгружаем картины
          if (data.isArtist) {
            const artworksQuery = query(
              collection(db, "artworks"),
              where("authorId", "==", userId)
            )
            const artSnap = await getDocs(artworksQuery)
            const arts = artSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setArtworks(arts)
          }
        } else {
          setUserData(null)
        }
      } catch (error) {
        console.error("Ошибка при загрузке профиля:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [username])

  if (loading) return <p className="text-center mt-10 text-gray-500">Загрузка профиля...</p>
  if (!userData) return <p className="text-center mt-10 text-red-500">Пользователь не найден</p>

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6 md:p-12 ">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12">
        {/* Аватар и имя */}
        <div className="flex flex-col items-center gap-4 text-center">
          <img
            src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${userData.username}`}
            alt="avatar"
            className="w-28 h-28 rounded-full shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {userData.firstName} {userData.lastName}
            </h1>
            <p className="text-sm text-gray-500">@{userData.username}</p>
          </div>
          <p className="text-gray-600 max-w-xl">{userData.bio || "Описание отсутствует."}</p>
          {userData.createdAt && (
            <p className="text-sm text-gray-400">
              Аккаунт создан:{" "}
              {new Date(userData.createdAt.seconds * 1000).toLocaleDateString("ru-RU")}
            </p>
          )}
        </div>

        {/* Галерея */}
        {userData.isArtist && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Картины</h2>
            {artworks.length === 0 ? (
              <p className="text-gray-500 text-sm">Пока что нет ни одной опубликованной картины.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {artworks.map(art => (
                  <div
                    key={art.id}
                    className="bg-gray-50 p-3 rounded-xl shadow hover:shadow-md transition"
                  >
                    <img
                      src={art.imageUrl || "/placeholder.jpg"}
                      alt={art.title}
                      className="w-full h-48 object-cover rounded-lg mb-2"
                    />
                    <h3 className="text-md font-semibold text-gray-800">{art.title}</h3>
                    <p className="text-sm text-gray-500">
                      {art.description?.slice(0, 60) || "Без описания"}
                    </p>
                    {art.isForSale && (
                      <p className="text-blue-600 font-bold mt-1">{art.price} €</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  )
}
