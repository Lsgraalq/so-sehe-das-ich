"use client"
import FooterDe from "@/components/footerDe"
import Navbar from "@/components/navbarDe"


export default function DatenschutzerklaerungPage() {
  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen flex flex-col  text-white pt-10">
     

     <div className="max-w-4xl mx-auto p-6 bg-black rounded-2xl text-white leading-relaxed">
  <h1 className="text-2xl font-bold mb-6 text-center">Datenschutzerklärung</h1>

  <h2 className="text-xl font-semibold mt-4">Verantwortliche Stelle</h2>
  <p>
    Für die Datenverarbeitung im Zusammenhang mit So Sehe Das Ich ist die Initiative Nezabuti,
    vertreten durch Rostislav Kulikov, Matthias-Grünewald-Str. 6, 06124 Halle (Saale),
    E-Mail: sosehedasich@gmail.com, verantwortlich. Wir nehmen den Schutz Ihrer persönlichen Daten
    sehr ernst und behandeln diese vertraulich sowie entsprechend den gesetzlichen Datenschutzvorschriften
    (DSGVO, BDSG).
  </p>

  <h2 className="text-xl font-semibold mt-4">1. Daten auf unserem Server</h2>
  <p>
    Alle von Ihnen auf So-Sehe-Das-Ich.art eingegebenen oder hochgeladenen Daten werden auf den
    Servern unseres Hosting-Dienstleisters Namecheap, Inc. (USA) gespeichert. Mit Namecheap haben wir
    einen Vertrag zur Auftragsverarbeitung geschlossen, der die Einhaltung der EU-Datenschutzstandards
    sicherstellt. Weitere Informationen finden Sie in der Datenschutzrichtlinie von Namecheap.
  </p>

  <h2 className="text-xl font-semibold mt-4">2. Erhobene personenbezogene Daten</h2>
  <ul className="list-disc list-inside ml-4">
    <li><strong>Stammdaten:</strong> Name, Kontaktdaten (E-Mail, Telefonnummer, Adresse).</li>
    <li><strong>Identitätsnachweis:</strong> Hochgeladene Ausweisdokumente zur Verifikation der Identität.</li>
    <li><strong>Werkdaten:</strong> Informationen zu registrierten Kunstwerken (Titel, Beschreibung, Fotos).</li>
    <li><strong>Nutzungsdaten:</strong> Technische Daten wie IP-Adresse, Browsertyp, Zugriffszeit. Keine Cookies oder externe Tracker im Einsatz.</li>
  </ul>
  <p>
    Wir geben keine Daten ohne Ihre Einwilligung weiter, außer wenn dies zur Vertragserfüllung oder
    gesetzlich erforderlich ist.
  </p>

  <h2 className="text-xl font-semibold mt-4">3. Zweck der Datennutzung</h2>
  <p>
    Wir verarbeiten Ihre Daten ausschließlich, um die Teilnahme an der Ausstellung und die Abwicklung
    von Verträgen zu ermöglichen: Registrierung, Verkaufstransaktionen, Verwaltung Ihres Kontos,
    Kommunikation mit Ihnen sowie Erfüllung rechtlicher Pflichten.
  </p>

  <h2 className="text-xl font-semibold mt-4">4. Aufbewahrung und Löschung</h2>
  <p>
    Daten werden nur so lange gespeichert, wie es für die genannten Zwecke erforderlich ist. Bei
    Löschung Ihres Kontos werden die Daten entfernt, vorbehaltlich gesetzlicher Aufbewahrungsfristen
    (z.B. Abrechnungsdaten).
  </p>

  <h2 className="text-xl font-semibold mt-4">5. Ihre Rechte</h2>
  <p>
    Sie haben nach DSGVO insbesondere das Recht auf:
  </p>
  <ul className="list-disc list-inside ml-4">
    <li>Auskunft über gespeicherte Daten</li>
    <li>Berichtigung falscher Daten</li>
    <li>Löschung („Recht auf Vergessenwerden“)</li>
    <li>Einschränkung der Verarbeitung</li>
    <li>Datenübertragbarkeit</li>
    <li>Widerruf erteilter Einwilligungen</li>
  </ul>
  <p>
    Zur Ausübung Ihrer Rechte kontaktieren Sie uns unter sosehedasich@gmail.com. Zudem haben Sie das
    Recht auf Beschwerde bei einer Datenschutz-Aufsichtsbehörde.
  </p>

  <h2 className="text-xl font-semibold mt-4">6. Datensicherheit</h2>
  <p>
    Wir setzen technische und organisatorische Maßnahmen ein, um Ihre Daten zu schützen.
    Die Übertragung erfolgt verschlüsselt (HTTPS). Ein absoluter Schutz im Internet kann jedoch nicht
    garantiert werden.
  </p>

  <h2 className="text-xl font-semibold mt-4">7. Keine Drittanbieter-Profile</h2>
  <p>
    Es werden keine Nutzerprofile zu Marketingzwecken erstellt. Wir geben keine Daten an
    Social-Media- oder Werbepartner weiter. Sie erhalten nur Informationen zur Ausstellung.
  </p>

  <h2 className="text-xl font-semibold mt-4">8. Änderungen der Datenschutzerklärung</h2>
  <p>
    Wir behalten uns vor, diese Erklärung bei Bedarf anzupassen. Die aktuelle Version ist jederzeit
    auf So-Sehe-Das-Ich.art einsehbar. Wesentliche Änderungen werden wir rechtzeitig mitteilen.
  </p>

  <p className="mt-6 italic">
    Stand: September 2025. Diese Datenschutzerklärung erläutert, wie wir Ihre Daten verarbeiten,
    basierend auf DSGVO und BDSG, angepasst an das Projekt „So Sehe Das Ich“.
  </p>
</div>


   
    </div>
       <FooterDe>
      </FooterDe>
    </>
  )
}
