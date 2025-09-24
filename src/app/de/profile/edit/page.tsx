"use client"
import { useEffect, useState } from "react"
import Navbar from "@/components/navbarDe"
import FooterDe from "@/components/footerDe"
import { auth, db } from "@/firebase/config"
import { onAuthStateChanged } from "firebase/auth"
import { MdOutlineModeEdit } from "react-icons/md"
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"
import AvatarUploader from "@/components/avatarUpload"
import Button from "@/components/button"


interface UserProfile {
  userUid: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
  username: string
  bio: string
  isArtist: boolean
  avatarUrl: string
}


function EditPage() {
  const [user, setUser] = useState<any>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [userData, setUserData] = useState<UserProfile | null>(null)

  // подтягиваем данные
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      setAuthChecked(true)

      if (currentUser) {
        const ref = doc(db, "users", currentUser.uid)
        const snap = await getDoc(ref)

        if (snap.exists()) {
          const data = snap.data()
          const userProfile: UserProfile = {
            userUid: currentUser.uid,
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            createdAt: data.createdAt?.toDate().toLocaleString() || "",
            username: data.username || "",
            bio: data.bio ?? "",
            isArtist: data.isArtist ?? false,
            avatarUrl: data.avatarUrl || "",
          }
          setUserData(userProfile)
        }
      }
    })
    return () => unsubscribe()
  }, [])

  // обновляем данные
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !userData) return

    const ref = doc(db, "users", user.uid)
    await updateDoc(ref, {
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.username,
      email: userData.email,
      bio: userData.bio,
      avatarUrl: userData.avatarUrl,
    })
    alert("Daten gespeichert!")
  }


  if (!authChecked) return <p>Загрузка...</p>
  if (!userData) return <p>Нет данных пользователя</p>

  return (
    <>
      <Navbar />
                        <div>
                          <h1>Редактирование профиля</h1>
                        
                          

                        <div
                    className="
                      sm:flex hidden
                      bg-[url('/images/artistpanel.png')]
                      w-[80%] h-100
                      rounded-3xl bg-cover bg-center
                      mx-auto mt-50
                      relative
                    "
                  >
                    {/* аватар */}
                    <img
                      src={userData.avatarUrl}
                      alt="Avatar"
                      className="
                        absolute left-1/2 transform
                        -translate-x-1/2 -translate-y-35/100
                        w-54 rounded-full
                        xl:-translate-x-1/2 xl:-translate-y-45/100 xl:w-64
                      "
                    />

                    {/* сетка */}
                    <div className="w-full grid grid-cols-3 grid-rows-2 gap-6 text-xl ">
                      {/* пустая ячейка */}
                      <div className="p-4 text-center"></div>

                      {/* аплоадер */}
                      <div className="pr-22 pb-20 text-center relative flex items-end justify-end">
                        <AvatarUploader
                          userId={userData.userUid || ""}
                          onUpload={(url) =>
                            setUserData((prev: UserProfile | null) =>
                              prev ? { ...prev, avatarUrl: url } : prev
                            )
                          }
                        />
                      </div>

                      {/* бейдж "Автор" */}
                      <div className="p-4 text-center justify-end w-full flex">
                        {userData.isArtist && (
                          <div
                            className="
                              w-30 h-8 mr-5 pt-1 pb-1
                              bg-gradient-to-r from-[#FEC97C] to-[#E35A5A]
                              rounded font-bold
                            "
                          >
                            Автор
                          </div>
                        )}
                      </div>

                      {/* форма */}
                      <form onSubmit={handleSave} className="col-span-3 grid grid-cols-3 gap-6">
                        {/* username */}
                        <div className="pl-4 flex flex-col items-start">
                          <h2 className="xl:text-2xl  text-xl font-bold">Benutzername</h2>
                          <input
                            className="xl:w-80 md:w-4 sm:w-40 sm:text-sm border-2 rounded p-1 border-amber-600 text-orange-200"
                            type="text"
                            value={userData.username}
                            onChange={(e) =>
                              setUserData({ ...userData, username: e.target.value })
                            }
                          />
                        </div>

                        {/* first + last name */}
                        <div className="flex flex-col gap-3">
                          <h3 className="mx-auto xl:text-2xl  text-xl font-semibold">Vorname und Nachname</h3>
                          <input
                            className="mx-auto xl:w-80 md:w-4 sm:w-40 sm:text-sm border-2 rounded p-1 border-amber-600 text-orange-200"
                            type="text"
                            value={userData.firstName}
                            onChange={(e) =>
                              setUserData({ ...userData, firstName: e.target.value })
                            }
                          />
                          <input
                            className="mx-auto xl:w-80 md:w-4 sm:w-40 sm:text-sm border-2 rounded p-1 border-amber-600 text-orange-200"
                            type="text"
                            value={userData.lastName}
                            onChange={(e) =>
                              setUserData({ ...userData, lastName: e.target.value })
                            }
                          />
                           <button type="submit"  className="py-2 w-50 bg-gradient-to-r from-[#FEC97C] mx-auto to-[#E35A5A]  text-white rounded-lg">
                              Opslaan
                            </button>
                        
                        </div>

                        {/* bio */}
                        <div className="pl-4 flex flex-col">
                          <h2 className="xl:text-2xl  text-xl font-semibold">Bio</h2>
                          <textarea
                            className="xl:w-80 md:w-4 sm:w-30 sm:text-sm h-25 border-2 rounded p-1 border-amber-600 text-orange-200 resize"
                            value={userData.bio}
                            onChange={(e) =>
                              setUserData({ ...userData, bio: e.target.value })
                            }
                          />
                          
                        </div>
                        
                         
                            
                      </form>
                    </div>
                  </div>


             {/* small screen */}
             <div className="flex sm:hidden  bg-[url('/images/Subtract1337.png')] w-[330px] h-[450px] rounded-3xl bg-cover mx-auto bg-center mt-27">
                 <img src={userData.avatarUrl} alt="AVatar" className="absolute z-[-1] left-1/2 transform -translate-x-48/100 translate-y-7/100 w-27 rounded-full "/> 
                 
               <div className="w-full grid grid-cols-3 grid-rows-4 gap-1">
                <div className="p-4 col-span-2 flex items-end justify-center gap-2 ">
                            <AvatarUploader 
                          userId={userData.userUid || ""}
                          onUpload={(url) =>
                            setUserData((prev: UserProfile | null) =>
                              prev ? { ...prev, avatarUrl: url } : prev
                            )
                          }
                        />
                   
               
                     
                 </div>
                  <form onSubmit={handleSave}  className="col-span-3 row-span-3 px-5 flex flex-col gap-4 items-start"> 
               
                      
              {/* Ник */}
              <div className="flex flex-col  w-full">
                <label className="text-sm font-semibold">Benutzername</label>
                <input
                  className="border-2 rounded p-1 border-amber-600 text-orange-200 text-sm"
                  type="text"
                  value={userData.username}
                  onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                />
              </div>

              {/* Имя */}
              <div className="flex flex-col  w-full">
                <label className="text-sm font-semibold">Vorname</label>
                <input
                  className="border-2 rounded p-1 border-amber-600 text-orange-200 text-sm"
                  type="text"
                  value={userData.firstName}
                  onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                />
              </div>

              {/* Фамилия */}
              <div className="flex flex-col  w-full">
                <label className="text-sm font-semibold">Nachname</label>
                <input
                  className="border-2 rounded p-1 border-amber-600 text-orange-200 text-sm"
                  type="text"
                  value={userData.lastName}
                  onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                />
              </div>

              {/* Био */}
              <div className="flex flex-col w-full">
                <label className="text-sm font-semibold">Bio</label>
                <textarea
                  className="border-2 rounded p-1 border-amber-600 text-orange-200 text-sm resize-none w-full"
                  value={userData.bio}
                  onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                />
              </div>
              <button type="submit"  className="py-2 w-50 bg-gradient-to-r from-[#FEC97C] mx-auto to-[#E35A5A]  text-white rounded-lg">
                              Opslaan
                            </button>
           </form>

                     
               </div>
             </div>
      </div>
      <FooterDe />
    </>
  )
}

export default EditPage
