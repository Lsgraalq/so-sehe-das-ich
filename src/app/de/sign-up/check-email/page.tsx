import React from 'react'
import Navbar from '@/components/navbarDe'
import FooterDe from '@/components/footerDe'


function page() {
  return (
    <>
    <Navbar></Navbar>
    <div className="pt-20 h-screen flex items-center justify-center ">
    <div className="text-center text-2xl md:text-4xl">Eine Bestätigungs-E-Mail wurde an Ihre E-Mail-Adresse gesendet.</div>
    </div>
    <FooterDe></FooterDe>
    </>
  )
}

export default page