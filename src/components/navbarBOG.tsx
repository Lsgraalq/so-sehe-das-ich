"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/firebase/config"
import {  useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"


export default function NavbarBOG() {
  const [user] = useAuthState(auth)
  const [userData, setUserData] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)

  const handleNav = () => setMenuOpen(!menuOpen)
  const langHandleNav = () => setLangMenuOpen(!langMenuOpen)
  const navRef = useRef<HTMLDivElement>(null)
  let lastScrollY = 0

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY

      if (currentScroll > lastScrollY) {
        // nach unten scrollen → verstecken
        gsap.to(navRef.current, {
          y: "-100%",
          duration: 0.4,
          ease: "power2.out",
        })
      } else {
        // nach oben scrollen → anzeigen
        gsap.to(navRef.current, {
          y: "0%",
          duration: 0.4,
          ease: "power2.out",
        })
      }

      lastScrollY = currentScroll
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


  return (
    <div  ref={navRef} className="fixed w-full top-0 h-18 shadow-xl z-[100] bg-[url('/images/navbar.png')] min-h-[20vh] bg-cover bg-center bg-no-repeat">
      <div className="flex justify-between items-center h-full w-full contaner md:px-20 px-8 ">
        <Link href={"/de"}>
          <div className="uppercase xl:text-xl sm:text-base">
            <img src="/images/title.png" alt="" className="w-[70%]" />
          </div>
        </Link>

        <div className="hidden lg:flex">
          <ul className="hidden lg:flex gap-20 ">
            <Link href={"/de/ausstellungen"}>
              <li className="uppercase hover:underline xl:text-xl sm:text-base text-white Libre_wide">
                Ausstellungen
              </li>
            </Link>
            <Link href={"/de/gallery"}>
              <li className="uppercase hover:underline xl:text-xl text-white sm:text-base Libre_wide">
                KunstHUB
              </li>
            </Link>

            {user ? (
              <div className="flex flex-row gap-15" >
              <Link href="/de/profile/">
                <li className="uppercase hover:underline xl:text-xl text-white sm:text-base Libre_wide">
                  Profil
                </li>
              </Link>
              <Link href="/de/profile/settings">
                <img src="/images/gir.png" alt="SETTINGS" className="w-6" />
              </Link>
              </div>
            ) : (
              <Link href="/de/sign-up">
                <li className="uppercase hover:underline  xl:text-xl text-white sm:text-base Libre_wide">
                  Registrieren
                </li>
              </Link>
            )}
          </ul>
        </div>

        <div onClick={handleNav} className="lg:hidden cursor-pointer pl-24">
          <AiOutlineMenu size={25} />
        </div>

        <div
          className={
            menuOpen
              ? "fixed left-0 top-0 w-[65%] lg:hidden h-screen bg-[url('/images/navbarMenu.png')] bg-cover bg-center bg-no-repeat p-10 ease-in duration-500 z-1000"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-300 bg-[url('/images/navbarMenu.png')] bg-cover bg-center bg-no-repeat z-1000"
          }
        >
          <div className="flex w-full items-center justify-end z-1000">
            <div onClick={handleNav} className="cursor-pointer">
              <AiOutlineClose size={25} />
            </div>
          </div>

          <div className="flex-col py-4">
            <ul className="flex flex-col gap-4 text-white">
              <Link href={"/de/ausstellungen"}>
                <li onClick={handleNav} className="uppercase hover:underline Libre_wide">
                  Ausstellungen
                </li>
              </Link>
              <Link href={"/de/gallery"}>
                <li onClick={handleNav} className="uppercase hover:underline Libre_wide">
                  KunstHUB
                </li>
              </Link>
              {user ? (
                <div className="flex flex-col gap-4">
                <Link href="/de/profile/"> 
                  <li onClick={handleNav} className="uppercase hover:underline Libre_wide">
                    Profil
                  </li>
                </Link>
                 <Link href="/de/profile/settings/">
                  <li onClick={handleNav} className="uppercase hover:underline Libre_wide">
                    Einstellungen
                  </li>
                </Link>
                </div>
              ) : (
                <Link href="/de/sign-up">
                  <li onClick={handleNav} className="uppercase hover:underline Libre_wide">
                    Registrieren
                  </li>
                </Link>
                
                
                
              )}
              <Link href="/de/support-us">
                  <li onClick={handleNav} className="uppercase hover:underline Libre_wide">
                    Unterstütze uns
                  </li>
                </Link>
              <Link href="/de/faq">
                  <li onClick={handleNav} className="uppercase hover:underline Libre_wide">
                    FAQ
                  </li>
                </Link>
                 
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}
