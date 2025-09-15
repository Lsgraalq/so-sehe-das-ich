"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import AvatarUploader from "@/components/avatarUpload";
import { IoMdAdd } from "react-icons/io";
import { logout } from "@/utils/logOutDe";
import { useRouter } from "next/navigation";


interface UserProfile {
  userUid : string;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  username: string;
  isArtist: boolean;
  avatarUrl?: string;
}



export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter()

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
            username: data.username,
            bio: data.bio ?? "",
            isArtist: data.isArtist ?? false,
            avatarUrl: data.avatarUrl,
          };
          setUserData(userProfile);
        }
      }
    });

    return () => unsubscribe();
  }, []);


  if (!authChecked) return <p>loading...</p>;


  if (!user ) {
    router.push("/de/sign-in");
    return <p>redicting</p>;
  }

  if (!userData) return <p>loading...</p>;


  return (
    <div className="p-6 max-w-md mx-auto bg-black rounded-xl shadow-md ">
      <img src={userData.avatarUrl} alt="" />
      <AvatarUploader
        userId={userData.userUid || ""}
        onUpload={(url) => setUserData((prev) => prev ? {...prev, avatarUrl: url} : prev)}
      />

      <div className="">
         <IoMdAdd />
         <a href="profile/add-painting" className="">Add new painting</a>
      </div>
     
      <h1 className="text-2xl font-bold mb-4">Личный кабинет</h1>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Имя:</b> {userData.firstName}</p>
      <p><b>О Себе:</b> {userData.bio}</p>
      <p><a href="" className="" onClick={logout}>Log out</a></p>
    </div>
  );
} 
