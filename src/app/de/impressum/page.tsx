"use client"
import FooterDe from "@/components/footerDe"
import Navbar from "@/components/navbarDe"


export default function DatenschutzerklaerungPage() {
  return (
    <>
    <Navbar></Navbar>
    <main className="max-w-3xl mx-auto p-6 space-y-4 pt-40">
      <h1 className="text-2xl font-bold">Impressum</h1>
      <p>So-Sehe-Das-Ich.art (Projekt der Initiative Nezabuti)</p>

      <h2 className="text-lg font-semibold mt-4">Verantwortlich gemäß § 5 DDG und § 18 MStV</h2>
      <dl className="mt-2 space-y-2">
        <div className="grid grid-cols-[120px_1fr] gap-2">
          <dt className="font-medium">Name:</dt>
          <dd>Rostislav Kulikov</dd>
        </div>
        <div className="grid grid-cols-[120px_1fr] gap-2">
          <dt className="font-medium">Anschrift:</dt>
          <dd>Matthias-Grünewald-Straße 6, 06124 Halle (Saale), Deutschland</dd>
        </div>
        <div className="grid grid-cols-[120px_1fr] gap-2">
          <dt className="font-medium">Kontakt:</dt>
          <dd>
            E-Mail: <a href="mailto:sosehedasich@gmail.com" className="underline">sosehedasich@gmail.com</a> – Telefon: <a href="tel:+4917668188204" className="underline">+49 176 68188204</a>
          </dd>
        </div>
      </dl>

      <p className="text-sm text-gray-600">
        Hinweis: Dieses Impressum erfüllt die gesetzlichen Vorgaben und enthält den Namen des Betreibers, eine ladungsfähige Adresse und Kontaktinformationen
      </p>
       </main>
       <FooterDe>
      </FooterDe>
    </>
  )
}
