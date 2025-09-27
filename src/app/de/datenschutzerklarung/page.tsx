"use client"
import FooterDe from "@/components/footerDe"
import Navbar from "@/components/navbarDe"


export default function DatenschutzerklaerungPage() {
  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen flex flex-col  text-white pt-10">
     

      <main className="flex-1 max-w-4xl mx-auto p-6  rounded-xl shadow-md my-8">
        <section>
          <h2 className="text-xl font-semibold mt-4 mb-2">Verantwortliche Stelle</h2>
          <p>
            Für die Datenverarbeitung im Zusammenhang mit So Sehe Das Ich ist die Initiative
            Nezabuti, vertreten durch Rostislav Kulikov, Matthias-Grünewald-Str. 6, 06124 Halle
            (Saale), E-Mail: sosehedasich@gmail.com, verantwortlich.
          </p>
          <p>
            Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und behandeln diese
            vertraulich sowie entsprechend den gesetzlichen Datenschutzvorschriften (DSGVO, BDSG).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-6 mb-2">1. Daten auf unserem Server</h2>
          <p>
            Alle von Ihnen auf So-Sehe-Das-Ich.art eingegebenen oder hochgeladenen Daten werden
            auf den Servern unseres Hosting-Dienstleisters Namecheap, Inc. gespeichert …
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-6 mb-2">2. Erhobene personenbezogene Daten</h2>
          <p>
            Bei der Nutzung unserer Plattform und Teilnahme an der Ausstellung können folgende
            personenbezogene Daten erhoben und gespeichert werden: Stammdaten, Identitätsnachweis,
            Werkdaten, Nutzungsdaten …
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-6 mb-2">3. Zweck der Datennutzung</h2>
          <p>
            Wir erheben und verarbeiten Ihre Daten ausschließlich, um Ihnen die Teilnahme an der
            Ausstellung zu ermöglichen und die Verträge abzuwickeln …
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-6 mb-2">4. Aufbewahrung und Löschung</h2>
          <p>
            Wir speichern personenbezogene Daten nur so lange, wie es für die genannten Zwecke
            erforderlich ist …
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-6 mb-2">5. Ihre Rechte als betroffene Person</h2>
          <p>
            Sie haben im Rahmen der DSGVO verschiedene Rechte bezüglich Ihrer bei uns gespeicherten
            personenbezogenen Daten …
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-6 mb-2">6. Datensicherheit</h2>
          <p>
            Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten vor
            unbefugtem Zugriff, Verlust oder Zerstörung zu schützen …
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-6 mb-2">7. Keine Drittanbieter-Profile</h2>
          <p>
            Wir erstellen keine persönlichen Nutzerprofile zu Marketingzwecken und geben keine Daten
            an Social-Media- oder Werbepartner weiter …
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-6 mb-2">8. Änderungen der Datenschutzerklärung</h2>
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen …
          </p>
        </section>

        <p className="mt-6 font-medium">Stand: September 2025</p>
      </main>

   
    </div>
       <FooterDe>
      </FooterDe>
    </>
  )
}
