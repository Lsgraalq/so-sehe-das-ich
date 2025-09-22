"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "@/firebase/config"
import Navbar from "@/components/navbarDe"
import FooterDe from "@/components/footerDe"

export default function AuthorProfilePage() {
  const [userData, setUserData] = useState<any>(null)
  const [artworks, setArtworks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const uid = Array.isArray(params.uid) ? params.uid[0] : params.uid

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!uid) return

        const userRef = doc(db, "users", uid)
        const userSnap = await getDoc(userRef)

        if (!userSnap.exists()) {
          console.log("Пользователь не найден:", uid)
          setUserData(null)
          return
        }

        const data = userSnap.data()
        setUserData({ ...data, id: userSnap.id })

        if (data.isArtist) {
          const artworksQuery = query(collection(db, "arts"), where("authorId", "==", uid))
          const artSnap = await getDocs(artworksQuery)
          const arts = artSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          setArtworks(arts)
        }
      } catch (err) {
        console.error("Ошибка при загрузке профиля:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [uid])

  if (loading) return <p className="text-center mt-10 text-gray-500">Загрузка профиля...</p>
  if (!userData) return <p className="text-center mt-10 text-red-500">Пользователь не найден</p>

  // форматирование даты
  const createdAtTimestamp = userData.createdAt
  let formattedDate = ""
  if (createdAtTimestamp?.toDate) {
    const date = createdAtTimestamp.toDate()
    formattedDate = date.toLocaleString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } else if (createdAtTimestamp) {
    const date = new Date(createdAtTimestamp)
    formattedDate = date.toLocaleString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      <Navbar />
      {/* md and bigger screen */}
      <div className=" sm:flex hidden  bg-[url('/images/artistpanel.png')] w-[80%] h-100 rounded-3xl bg-cover mx-auto bg-center mt-50">
          <img src={userData.avatarUrl} alt="AVatar" className="absolute  left-1/2 transform -translate-x-1/2 -translate-y-35/100 w-54 xl:-translate-x-1/2 xl:-translate-y-45/100 xl:w-64 rounded-full "/> 
        <div className="w-full grid grid-cols-3 grid-rows-2 gap-6 text-xl">
          <div className=" p-4 text-center">Участник с {formattedDate}</div>
          <div className=" p-4 text-center"></div>
          <div className=" p-4 text-center justify-end  w-full flex"> {userData.isArtist && (
                <div className="w-30 h-8 mr-5 pt-1 pb-1 bg-gradient-to-r from-[#FEC97C] to-[#E35A5A] rounded font-bold">
                  Автор
                </div>
              )}</div>
          <div className=" p-10 text-center">Выставки: <br /> SO SEHE DAS ICH 1 <br /> 29.10.2025</div>
          <div className=" text-center flex flex-col gap-2">
            
            <h2 className="text-4xl font-bold">{userData.username}</h2>
            <h3 className="text-center mx-auto flex text-xl">{userData.firstName} {userData.lastName}</h3>
            <img src="/images/artistvector.png" alt="Errror" className="mt-3"/>
            </div>
          <div className=" p-10 text-center kolvo rabot">Количество работ: <br /> {artworks.length}</div>
        </div>
      </div>
      {/* small screen */}
      <div className="flex sm:hidden  bg-[url('/images/Subtract1337.png')] w-[330px] h-[330px] rounded-3xl bg-cover mx-auto bg-center mt-27">
          <img src={userData.avatarUrl} alt="AVatar" className="absolute  left-1/2 transform -translate-x-48/100 -translate-y-3/100 w-18 rounded-full "/> 
        <div className="w-full grid grid-cols-3 grid-rows-2 gap-1">
         <div className="p-4 col-span-3 flex items-end justify-center gap-2">
          {userData.isArtist && (
                <div className="px-2 pt-1 pb-1 bg-gradient-to-r from-[#FEC97C] to-[#E35A5A] rounded font-bold">
                  Автор
                </div>
              )}
            <h2 className="text-xl font-bold mb-0.5">
              {userData.username}</h2>
              
          </div>
          <div className=" col-span-3   px-5 flex flex-col gap-3">
            <h3 className="text-left  flex text-sm ">{userData.firstName} {userData.lastName}</h3>
           
            <p className="text-left">Количество работ: {artworks.length}</p>
              
              <p>Выставки:  SO SEHE DAS ICH 1 </p>
              <div className="">

              </div>
          </div>
              
        </div>
      </div>
      <div className="w-[80%] mx-auto flex flex-row mt-5">
        <div className="md:w-[70%]  flex flex-col gap-3">
        <h3 className="">Описание профиля:</h3>
        <p className="">{userData.bio}</p>
        </div>
      </div>
     
{/* artworks */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        {userData.isArtist && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Картины</h2>
            {artworks.length === 0 ? (
              <p className="text-gray-500 text-sm">
                Пока что нет ни одной опубликованной картины.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {artworks.map(art => (
                   <a
          href={'/de/gallery/arts/' + art.id}
          key={art.id}
          className="rounded-sm overflow-hidden"
        >
          <img
            src={art.imageUrl}
            alt={art.title}
            className="w-full h-64 object-cover"
          />
          <div className="pt-4 pl-0.5">
            <h2 className="text-lg font-semibold">{art.title}</h2>
            <p className="text-gray-600 mt-2">{art.height}см х {art.width}см</p>
            <p className="text-gray-600">Author: {art.authorUsername}</p>
          </div>
        </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <FooterDe></FooterDe>
    </>
  );
}
