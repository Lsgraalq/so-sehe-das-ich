"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/firebase/config"
import Navbar from "@/components/navbarDe"
import FooterDe from "@/components/footerDe"
import Loader from "@/components/loader"
import { ChevronDown } from "lucide-react"

interface FAQ {
  id: string
  question: string
  answer: string
  lang: string
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const fetchFAQs = async () => {
      const q = query(collection(db, "faq"), where("lang", "==", "de"))
      const snap = await getDocs(q)
      const list: FAQ[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<FAQ, "id">),
      }))
      setFaqs(list)
      setLoading(false)
    }

    fetchFAQs()
  }, [])

  if (loading) return <Loader />

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <Navbar />
      <div className="md:max-w-[50%] px-10 md:px-0 mx-auto p-6 text-gray-700 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">❓ FAQ</h1>

        <div className="divide-y   rounded-2xl overflow-hidden shadow-lg bg-gray-900/30 backdrop-blur">
          {faqs.map((faq, index) => (
            <div key={faq.id}>
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between p-5 text-left font-medium text-gray-300 hover:bg-gray-900/30 transition-all"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 transform transition-transform duration-200 ${
                    openIndex === index ? "rotate-180 text-orange-300" : "text-gray-500"
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 p-5 " : "max-h-0"
                }`}
              >
                <p className="text-gray-300 leading-relaxed whitespace-pre-line ">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FooterDe />
    </>
  )
}