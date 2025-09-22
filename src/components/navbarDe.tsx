"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/firebase/config"


export default function Navbar() {
  const [user] = useAuthState(auth)
  const [userData, setUserData] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)

  const handleNav = () => setMenuOpen(!menuOpen)
  const langHandleNav = () => setLangMenuOpen(!langMenuOpen)

  // Загружаем username, если пользователь авторизован
  useEffect(() => {
   
  }, [])

  return (
    <div className="fixed w-full top-0 h-18 shadow-xl z-[1] bg-[#0A0A0A]">
      <div className="flex justify-between items-center h-full w-full contaner md:px-20 px-8">
        <Link href={"/"}>
          <div className="uppercase xl:text-xl sm:text-base">
            <img src="/images/title.png" alt="" className="w-[70%]" />
          </div>
        </Link>

        <div className="hidden lg:flex">
          <ul className="hidden lg:flex gap-20">
            <Link href={"/de/"}>
              <li className="uppercase hover:border-b xl:text-xl sm:text-base text-white Libre_wide">
                Ausstellungen
              </li>
            </Link>
            <Link href={"/de/gallery"}>
              <li className="uppercase hover:border-b xl:text-xl text-white sm:text-base Libre_wide">
                KunstHUB
              </li>
            </Link>

                        {user ? (
            <Link href="/de/profile/">
                <li className="uppercase hover:border-b xl:text-xl text-white sm:text-base Libre_wide">
                My Profile
                </li>
            </Link>
            ) : (
            <Link href="/de/sign-up">
                <li className="uppercase hover:border-b xl:text-xl text-white sm:text-base Libre_wide">
                Register
                </li>
            </Link>
            )}
            
                <li className="hover:cursor-pointer" onClick={langHandleNav}>
                  <img src="/images/gear.png" alt="" className="w-7" />
                </li>
                <div  className={
            menuOpen
              ? "fixed left-0 top-0 w-[65%] lg:hidden h-screen bg-[#0A0A0A] p-10 ease-in duration-500 z-1000"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-300 z-1000"
          }>

                </div>
            
          </ul>
        </div>

        <div onClick={handleNav} className="lg:hidden cursor-pointer pl-24">
          <AiOutlineMenu size={25} />
        </div>

        <div
  className={
    menuOpen
      ? "fixed left-0 top-0 w-[65%] lg:hidden h-screen bg-[#0A0A0A] p-10 ease-in duration-500 z-1000"
      : "fixed left-[-100%] top-0 p-10 ease-in duration-300 z-1000"
  }
>
  <div className="flex w-full items-center justify-end z-1000">
    <div onClick={handleNav} className="cursor-pointer">
      <AiOutlineClose size={25} />
    </div>
  </div>

  <div className="flex-col py-4">
    <ul className="flex flex-col gap-4 text-white">
      <Link href={"/de/"}>
        <li onClick={handleNav} className="uppercase hover:border-b Libre_wide">
          Ausstellungen
        </li>
      </Link>
      <Link href={"/de/gallery"}>
        <li onClick={handleNav} className="uppercase hover:border-b Libre_wide">
          KunstHUB
        </li>
      </Link>
      {user ? (
        <Link href="/de/profile/">
          <li onClick={handleNav} className="uppercase hover:border-b Libre_wide">
            My Profile
          </li>
        </Link>
      ) : (
        <Link href="/de/sign-up">
          <li onClick={handleNav} className="uppercase hover:border-b Libre_wide">
            Register
          </li>
        </Link>
      )}
      {/* <li onClick={langHandleNav} className="cursor-pointer">
        <img src="/images/gear.png" alt="" className="w-7" />
      </li> */}
    </ul>
  </div>
</div>

      </div>
    </div>
  )
}
