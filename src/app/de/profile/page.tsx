"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import AvatarUploader from "@/components/avatarUpload";


interface UserProfile {
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


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const ref = doc(db, "users", currentUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          const userProfile: UserProfile = {
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

  if (!user) return <p>Вы не авторизованы</p>;
  if (!userData) return <p>Загрузка...</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-black rounded-xl shadow-md">
      <img src={userData.avatarUrl} alt="" />
      <AvatarUploader
        userId={userData?.username || ""}
        onUpload={(url) => setUserData((prev) => prev ? {...prev, avatarUrl: url} : prev)}
      />

      <h1 className="text-2xl font-bold mb-4">Личный кабинет</h1>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Имя:</b> {userData.firstName}</p>
      <p><b>О Себе:</b> {userData.bio}</p>
    </div>
  );
}
