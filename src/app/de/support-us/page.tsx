import React from 'react'
import Navbar from '@/components/navbarDe'
import FooterDe from '@/components/footerDe'
function page() {
  return (
   <>
   <Navbar></Navbar>
   <div className="h-screen flex flex-col items-center justify-center">
     <div>
    <h2 className="text-lg font-semibold mb-2">Girocard</h2>
    <p><strong>IBAN:</strong> DE11 8607 0024 0693 8013 00</p>
    <p><strong>BIC:</strong> DEUTDEDBLEG</p>
    <p><strong>Empfänger:</strong> Rostislav Kulikov</p>
  </div>

  <div>
    <h2 className="text-lg font-semibold mb-2">Debitcard</h2>
    <p>5354 8707 0338 8147</p>
    <p><strong>Empfänger:</strong> Rostislav Kulikov</p>
  </div>

  <p className="text-gray-700 italic text-xs">
    *Bitte geben Sie im Verwendungszweck an: “Für die Entwicklung von So Sehe Das Ich”
  </p>
   </div>
    <FooterDe></FooterDe>
   </>
  )
}

export default page