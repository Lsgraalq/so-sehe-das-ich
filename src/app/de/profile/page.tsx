"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import AvatarUploader from "@/components/avatarUpload";
import { IoMdAdd } from "react-icons/io";

import { useRouter } from "next/navigation";
import Navbar from "@/components/navbarDe";
import FooterDe from "@/components/footerDe";
import { useParams } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { MdOutlineModeEdit } from "react-icons/md"


interface UserProfile {
  userUid : string;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  username: string;
  isArtist: boolean;
  avatarUrl?: string;
  createdAt: string;
}

interface UserData {
  userUid : string;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  username: string;
  isArtist: boolean;
  avatarUrl?: string;
  createdAt: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null);
  const [artworks, setArtworks] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);

      if (currentUser) {
        const ref = doc(db, "users", currentUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          const userProfile: UserProfile = {
            userUid : currentUser.uid,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            createdAt: data.createdAt.toDate().toLocaleString(),
            username: data.username,
            bio: data.bio ?? "",
            isArtist: data.isArtist ?? false,
            avatarUrl: data.avatarUrl,
          };
          setUserData(userProfile);

          if (data.isArtist) {
            const artworksQuery = query(collection(db, "arts"), where("authorId", "==", currentUser.uid))
            const artSnap = await getDocs(artworksQuery)
            const arts = artSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setArtworks(arts)
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  if (!authChecked) return <p>Laden...</p>;

  if (!user ) {
    router.push("/de/sign-in");
    return <p>Weiterleitung...</p>;
  }

  if (!userData) return <p>Laden...</p>;

  return (
    <>
    <Navbar></Navbar>
    <div className=" sm:flex hidden  bg-[url('/images/artistpanel.png')] w-[80%] h-100 rounded-3xl bg-cover mx-auto bg-center mt-50">
          <img src={userData.avatarUrl} alt="AVatar" className="absolute  left-1/2 transform -translate-x-1/2 -translate-y-35/100 w-54 xl:-translate-x-1/2 xl:-translate-y-45/100 xl:w-64 rounded-full "/> 
          
        <div className="w-full grid grid-cols-3 grid-rows-2 gap-6 text-xl">
          <div className=" p-4 text-center">Mitglied seit {userData.createdAt}</div>
          <div className=" pr-22 pb-20 text-center relative flex items-end justify-end">
      <a href="/de/profile/edit" className="bg-gray-700 text-white text-xs px-3 py-3 rounded-full cursor-pointer hover:bg-gray-500">
        <MdOutlineModeEdit />
        <input  className="hidden"  />
      </a>
          </div>
          <div className=" p-4 text-center justify-end  w-full flex"> {userData.isArtist && (
                <div className="w-30 h-8 mr-5 pt-1 pb-1 bg-gradient-to-r from-[#FEC97C] to-[#E35A5A] rounded font-bold">
                 Autor
                </div>
              )}</div>
          <div className=" p-10 text-center">Ausstellungen: <br /> SO SEHE DAS ICH 1 <br /> 29.10.2025</div>
          <div className=" text-center flex flex-col gap-2">
            
            <h2 className="text-4xl font-bold">{userData.username}</h2>
            <h3 className="text-center mx-auto flex text-xl">{userData.firstName} {userData.lastName}</h3>
            <img src="/images/artistvector.png" alt="Fehler" className="mt-3"/>
            </div>
          <div className=" p-10 text-center kolvo rabot">Anzahl der Werke: <br /> {artworks.length}</div>
        </div>
      </div>
      {/* small screen */}
      <div className="flex sm:hidden  bg-[url('/images/Subtract1337.png')] w-[330px] h-[330px] rounded-3xl bg-cover mx-auto bg-center mt-27">
          <img src={userData.avatarUrl} alt="AVatar" className="absolute  left-1/2 transform -translate-x-48/100 -translate-y-3/100 w-18 rounded-full "/> 
          
        <div className="w-full grid grid-cols-3 grid-rows-2 gap-1">
         <div className="p-4 col-span-3 flex items-end justify-center gap-2">
          {userData.isArtist && (
                <div className="px-2 pt-1 pb-1 bg-gradient-to-r from-[#FEC97C] to-[#E35A5A] rounded font-bold">
                  Autor
                </div>
              )}
            <h2 className="text-xl font-bold mb-0.5">
              {userData.username}</h2>
                <a href="/de/profile/edit" className="bg-gray-700 text-white text-xs px-3 py-3 rounded-full cursor-pointer hover:bg-gray-500">
        <MdOutlineModeEdit />
        <input  className="hidden"  />
      </a>
              
          </div>
          <div className=" col-span-3   px-5 flex flex-col gap-3">
            <h3 className="text-left  flex text-sm ">{userData.firstName} {userData.lastName}</h3>
           
            <p className="text-left">Anzahl der Werke: {artworks.length}</p>
              
              <p>Ausstellungen:  SO SEHE DAS ICH 1 </p>
              <div className="">

              </div>
          </div>
              
        </div>
      </div>
{/* menu */}
    {/* <div className="p-6 max-w-md mx-auto bg-black rounded-xl shadow-md pt-20 flex flex-row gap-5">
      
      <a href="profile/add-painting" className="w-60 h-15  bg-gradient-to-r from-[#ff99fa] to-[#f429ff] rounded flex justify-center  items-center">
         
         <div className=" flex  justify-center"> Neues Gemälde hinzufügen</div>
      </a>
    </div> */}

    {/* artworks */}
    <div className="max-w-6xl mx-auto mt-10 px-4">
        {userData.isArtist && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Gemälde</h2>
            {artworks.length === 0 ? (
              
                <a href="/de/profile/add-painting/" className="block">
                  <img src="/images/add-painting.png" alt="" className="max-w-[100%]" />
                </a>
              
              
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <a href="/de/profile/add-painting/" className="block">
                  <img src="/images/add-painting.png" alt="" className="max-w-[100%]" />
                </a>
                {artworks.map(art => (
                   <a
          href={'/de/gallery/arts/' + art.id}
          key={art.id}
          className="rounded-sm overflow-hidden max-w-[100%]"
        >
          <img
            src={art.imageUrl}
            alt={art.title}
            className="w-full h-64 object-cover "
          />
          <div className="pt-4 pl-0.5">
            <h2 className="text-lg font-semibold">{art.title}</h2>
            <p className="text-gray-600 mt-2">{art.height}cm x {art.width}cm</p>
            <p className="text-gray-600">Autor: {art.authorUsername}</p>
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
