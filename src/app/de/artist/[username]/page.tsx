"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";
import Navbar from "@/components/navbarDe";
import FooterDe from "@/components/footerDe";
export default function AuthorProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [artworks, setArtworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const username = Array.isArray(params.username) ? params.username[0] : params.username;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "users"), where("username", "==", username));
        const userSnap = await getDocs(q);

        if (userSnap.empty) {
          console.log("Пользователь не найден:", username);
          setUserData(null);
          return;
        }

        const docData = userSnap.docs[0];
        const data = docData.data();
        const userId = docData.id;
        setUserData({ ...data, id: userId });

        if (data.isArtist) {
          const artworksQuery = query(collection(db, "arts"), where("authorId", "==", userId));
          const artSnap = await getDocs(artworksQuery);
          const arts = artSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setArtworks(arts);
        }
      } catch (err) {
        console.error("Ошибка при загрузке профиля:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Загрузка профиля...</p>;
  if (!userData)
    return <p className="text-center mt-10 text-red-500">Пользователь не найден</p>;

  // Форматируем дату в немецкий формат
  const createdAtTimestamp = userData.createdAt;
  let formattedDate = "";
  if (createdAtTimestamp?.toDate) {
    const date = createdAtTimestamp.toDate();
    formattedDate = date.toLocaleString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (createdAtTimestamp) {
    const date = new Date(createdAtTimestamp);
    formattedDate = date.toLocaleString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <>
      <Navbar />
      <div className="md:flex hidden  bg-[url('/images/artistpanel.png')] w-[80%] h-100 rounded-3xl bg-cover mx-auto bg-center mt-50">
          <img src={userData.avatarUrl} alt="AVatar" className="absolute  left-1/2 transform -translate-x-1/2 -translate-y-45/100 w-64 rounded-full "/> 
        <div className="w-full grid grid-cols-3 grid-rows-2 gap-6">
          <div className=" p-4 text-center">Участник с {formattedDate}</div>
          <div className=" p-4 text-center"></div>
          <div className=" p-4 text-center"></div>
          <div className=" p-10 text-center">Выставки: <br /> SO SEHE DAS ICH 1 <br /> 29.10.2025</div>
          <div className=" text-center flex flex-col gap-2">
            <h2 className="text-4xl font-bold">{userData.username}</h2>
            <h3 className="text-center mx-auto flex text-lg">{userData.firstName} {userData.lastName}</h3>
            <img src="/images/artistvector.png" alt="Errror" className="mt-3"/>
            </div>
          <div className=" p-10 text-center kolvo rabot">Количество работ: <br /> {artworks.length}</div>
        </div>
      </div>
      <div className="flex md:hidden  bg-[url('/images/authorpanelSmall.png')] w-[330px] h-[220px] rounded-3xl bg-cover mx-auto bg-center mt-27">
          <img src={userData.avatarUrl} alt="AVatar" className="absolute  left-1/2 transform -translate-x-49/100 -translate-y-25/100 w-32 rounded-full "/> 
        <div className="w-full grid grid-cols-3 grid-rows-2 gap-6">
          <div className=" p-4 text-center">Участник с {formattedDate}</div>
          <div className=" p-4 text-center"></div>
          <div className=" p-4 text-center"></div>
          <div className=" p-10 text-center">Выставки: <br /> SO SEHE DAS ICH 1 <br /> 29.10.2025</div>
          <div className=" text-center flex flex-col gap-2">
            <h2 className="text-xl font-bold">{userData.username}</h2>
            <h3 className="text-center mx-auto flex text-sm">{userData.firstName} {userData.lastName}</h3>
            <img src="/images/artistvector.png" alt="Errror" className="mt-3"/>
            </div>
          <div className=" p-10 text-center kolvo rabot">Количество работ: <br /> {artworks.length}</div>
        </div>
      </div>

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
