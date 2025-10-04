"use client"

import { useEffect, useState } from "react"
import { db } from "@/firebase/config"
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"
import Navbar from "@/components/navbarDe"
import FooterDe from "@/components/footerDe"
import AdminGuard from "@/components/AdminGuard"

interface FAQ {
  id: string
  question: string
  answer: string
  lang: string
}

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  const fetchFAQs = async () => {
    const q = query(collection(db, "faq"), where("lang", "==", "de"))
    const snap = await getDocs(q)
    setFaqs(snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<FAQ, "id">) })))
  }

  useEffect(() => {
    fetchFAQs()
  }, [])

  const handleAdd = async () => {
    if (!question || !answer) return
    await addDoc(collection(db, "faq"), { question, answer, lang: "de" })
    setQuestion("")
    setAnswer("")
    fetchFAQs()
  }

  const handleUpdate = async (id: string, newQ: string, newA: string) => {
    await updateDoc(doc(db, "faq", id), { question: newQ, answer: newA })
    fetchFAQs()
  }

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "faq", id))
    fetchFAQs()
  }

  return (
    <>
      <Navbar />
      <AdminGuard />
      <div className="max-w-3xl mx-auto p-6 text-white">
        <h1 className="text-3xl font-bold mb-6">⚙️ FAQ Admin (Deutsch)</h1>

        {/* Добавление нового */}
        <div className="space-y-2 mb-6">
          <input
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Frage"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />
          <textarea
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            placeholder="Antwort"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />
          <button onClick={handleAdd} className="px-4 py-2 bg-green-600 rounded">
            + Hinzufügen
          </button>
        </div>

        {/* Список с редактированием */}
        <div className="space-y-4">
          {faqs.map(faq => (
            <div key={faq.id} className="bg-gray-900 p-4 rounded-lg space-y-2">
              <input
                defaultValue={faq.question}
                onBlur={e => handleUpdate(faq.id, e.target.value, faq.answer)}
                className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              />
              <textarea
                defaultValue={faq.answer}
                onBlur={e => handleUpdate(faq.id, faq.question, e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              />
              <button
                onClick={() => handleDelete(faq.id)}
                className="px-4 py-2 bg-red-600 rounded"
              >
                🗑 Löschen
              </button>
            </div>
          ))}
        </div>
      </div>
      <FooterDe />
    </>
  )
}
