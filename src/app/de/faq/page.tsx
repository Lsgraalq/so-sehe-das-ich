"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, query, where, } from "firebase/firestore"
import { db } from "@/firebase/config"
import Navbar from '@/components/navbarDe'
import FooterDe from '@/components/footerDe'
import Loader from "@/components/loader"


interface FAQ {
  id: string
  question: string
  answer: string
  lang: string
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const fetchFAQs = async () => {
    const q = query(
      collection(db, "faq"),
      where("lang", "==", "de")   
    )
    const snap = await getDocs(q)
    const list: FAQ[] = snap.docs.map(d => ({
      id: d.id,
      ...(d.data() as Omit<FAQ, "id">)
    }))
    setFaqs(list)
    setLoading(false)
  }

  fetchFAQs()
}, [])


  if (loading) return <Loader></Loader>

  return (
       <>
   <Navbar></Navbar>
<div className="max-w-3xl mx-auto p-6 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">❓ FAQ</h1>
      <div className="space-y-4">
        {faqs.map(faq => (
          <div key={faq.id} className="bg-gray-900 p-4 rounded-lg shadow">
            <h2 className="font-semibold text-lg">{faq.question}</h2>
            <p className="text-gray-300">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
    <FooterDe></FooterDe>
   </>
    
  )
}
