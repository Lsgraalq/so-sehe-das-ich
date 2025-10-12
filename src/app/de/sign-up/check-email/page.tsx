import React from 'react'
import Navbar from '@/components/navbarDe'
import FooterDe from '@/components/footerDe'


function page() {
  return (
    <>
    <Navbar></Navbar>
    <div className="pt-20 h-screen flex items-center justify-center flex-col gap-20">
    <div className="text-center text-2xl md:text-4xl">Eine Bestätigungs-E-Mail wurde an Ihre E-Mail-Adresse gesendet.</div>
    <a href="/de/sign-in" className="">
       <button
      type="submit"
      className="w-full py-2 px-4 bg-gradient-to-r from-[#FEC97C] to-[#E35A5A]  text-white font-semibold rounded transition-all"
    >
      Ich habe sie bereits bestätigt
    </button>
    </a>
   
    </div>
    <FooterDe></FooterDe>
    </>
  )
}

export default page