import React from 'react'
import Navbar from '@/components/navbarDe'
import FooterDe from '@/components/footerDe'
function page() {
  return (
   <>
   <Navbar></Navbar>
   <div className="h-screen flex flex-col items-center justify-center">
    <h1 className='text-2xl md:text-4xl'>Die Website befindet sich noch in Entwicklung…</h1>
   </div>
    <FooterDe></FooterDe>
   </>
  )
}

export default page