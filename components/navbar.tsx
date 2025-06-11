"use client";
import React from "react";
import { Inter} from "next/font/google";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react"

const Libre_wide = Inter({
  weight: '600',
  subsets: ["latin"],
});


export default function Navbar ({ visible = true }: { visible?: boolean }) {
   
    
    const  [menuOpen, setMenuOpen] = useState(false)
    const handleNav = () => {
        setMenuOpen(!menuOpen);


    }

   

    return (
    
    <div className="fixed w-full top-0 h-18 shadow-xl z-[1] bg-[#0A0A0A]">
        <div className="flex justify-between items-center h-full w-full  contaner md:px-20 px-8">
            <Link href={'/'}>
            <div className=" uppercase xl:text-xl sm:text-base ">
                <img src="/images/title.png" alt="" className="w-[70%]"/>
            </div>
            </Link>
            <div className="hidden lg:flex ">
                <ul className="hidden lg:flex gap-20">
                    <Link href={'/'}>
                        <li className=" uppercase hover:border-b xl:text-xl sm:text-base text-white Libre_wide">
                               Ausstellungen
                        </li>
                    </Link>
                     <Link href={'/services'}>
                        <li className=" uppercase hover:border-b xl:text-xl text-white sm:text-base Libre_wide">
                                KunstHUB
                        </li>
                    </Link>
                     <Link href={'/kontakt'}>
                        <li className=" uppercase hover:border-b xl:text-xl text-white  sm:text-base  Libre_wide">
                               Register
                        </li>
                    </Link>
                     
                    {/* <Link href={'/form'}>
                        <li className=" flex justify-center pt-1 uppercase hover:border-b xl:text-xl hover:bg-gray-600 duration-300 sm:text-base Libre_wide h-8 rounded-full py-0 px-4 w-51 cursor-pointer tracking-wider btn bg-black text-white">
                                Get started
                        </li>
                    </Link> */}
                </ul>


            </div>
            <div onClick={handleNav}  className="lg:hidden cursor-pointer pl-24">
                <AiOutlineMenu size={25} />
            </div>
            <div className={
                menuOpen
                ? "fixed left-0 top-0 w-[65%] lg:hidden h-screen bg-[#0A0A0A] p-10 ease-in duration-500 z-1000" 
                : "fixed left-[-100%] top-0 p-10 ease-in duration-300 z-1000"
            }>
                <div className="flex w-full items-center justify-end z-1000">
                    <div onClick={handleNav} className="cursor-pointer">
                        <AiOutlineClose size={25} /> 
                    </div>
                    
                </div>
                <div className="flex-col py-4 ">
                       <ul className="">
                    <Link href={'/'}>
                        <li onClick={() => setMenuOpen(false)} className="py-4 cursor-pointer uppercase">
                                Start
                        </li>
                    </Link>
                     <Link href={'/services'}>
                        <li onClick={() => setMenuOpen(false)} className="py-4 cursor-pointer uppercase">
                                Services
                        </li>
                    </Link>
                     <Link href={'/kontakt'}>
                        <li onClick={() => setMenuOpen(false)} className="py-4 cursor-pointer uppercase">
                               Kontakt
                        </li>
                    </Link>
                     <Link href={'/about'}>
                        <li onClick={() => setMenuOpen(false)} className="py-4 cursor-pointer uppercase">
                                about us
                        </li>
                    </Link>
                    <Link href={'/form'}>
                        <li onClick={() => setMenuOpen(false)} className="py-4 cursor-pointer uppercase">
                                Get started
                        </li>
                    </Link>
                </ul> 
                    </div>
            </div>
        </div>
    </div>


    )
}