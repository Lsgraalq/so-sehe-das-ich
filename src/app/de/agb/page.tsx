import React from 'react'
import Navbar from '@/components/navbarDe'
import FooterDe from '@/components/footerDe'
function page() {
  return (
   <>
   <Navbar></Navbar>
   <div className="min-h-screen flex flex-col items-center justify-center pt-20">
    <div className="max-w-4xl mx-auto p-6  text-white leading-relaxed">
  <h1 className="text-2xl font-bold mb-6 text-center">Allgemeine Geschäftsbedingungen (AGB)</h1>

  <h2 className="text-xl font-semibold mt-4">1. Geltungsbereich</h2>
  <p>
    Diese AGB gelten für die Teilnahme an der Ausstellung „So Sehe Das Ich“ sowie für den Verkauf von
    Kunstwerken im Rahmen dieser Ausstellung, durchgeführt von der Initiative Nezabuti (nachfolgend
    „Veranstalter“ genannt). Mit der Anmeldung auf So-Sehe-Das-Ich.art und der Teilnahme an der Ausstellung
    erkennt der/die Künstler*in sowie der/die Käufer*in diese Bedingungen an.
  </p>

  <h2 className="text-xl font-semibold mt-4">2. Registrierung als Künstler*in</h2>
  <p>
    Die Anmeldung zur Teilnahme steht ausschließlich volljährigen Personen offen. Der/die Künstler*in muss bei
    der Registrierung korrekte persönliche Daten (vollständiger Name, Anschrift, Kontaktdaten) angeben und ein
    gültiges Ausweisdokument (z.B. Personalausweis oder Reisepass) hochladen. Mit der Registrierung bestätigt
    der/die Künstler*in die Volljährigkeit. Die übermittelten Daten werden vertraulich behandelt und nur für die
    Organisation der Ausstellung verwendet.
  </p>

  <h2 className="text-xl font-semibold mt-4">3. Ausstellung und Dauer</h2>
  <p>
    Der/die Künstler*in stellt sein/ihr Kunstwerk für die gesamte Dauer der Ausstellung „So Sehe Das Ich“ zur
    Verfügung. Das Kunstwerk darf vor dem offiziellen Ende nicht zurückgezogen werden. Die genaue Dauer wird
    vom Veranstalter bekannt gegeben. Nicht verkaufte Werke werden nach Ausstellungsende zurückgegeben und
    müssen vom Künstler zeitnah abgeholt werden.
  </p>

  <h2 className="text-xl font-semibold mt-4">4. Verkauf von Kunstwerken</h2>
  <p>
    Der Verkauf erfolgt ausschließlich vor Ort während der Ausstellung. Der Veranstalter vermittelt den Verkauf
    (Kommissionsverkauf), erhält 40% Provision und zahlt 60% an den/die Künstler*in. Bezahlung durch Käufer
    erfolgt bar oder per Karte. Käufer müssen volljährig sein.
  </p>

  <h2 className="text-xl font-semibold mt-4">5. Auszahlung an Künstler*innen</h2>
  <p>
    Der Anteil von 60% wird innerhalb von 14 Tagen nach Ende der Ausstellung auf das angegebene Konto (IBAN)
    überwiesen. Der Veranstalter erstellt eine Abrechnung mit Verkaufspreis und Provision.
  </p>

  <h2 className="text-xl font-semibold mt-4">6. Kein Widerrufs- oder Rückgaberecht</h2>
  <p>
    Da der Verkauf im Rahmen einer physischen Ausstellung erfolgt, besteht kein gesetzliches Widerrufsrecht.
    Rückgabe oder Umtausch sind ausgeschlossen, außer bei versteckten Mängeln. In diesem Fall gelten die
    gesetzlichen Gewährleistungsrechte.
  </p>

  <h2 className="text-xl font-semibold mt-4">7. Haftung und Versicherung</h2>
  <p>
    Der Veranstalter behandelt die Werke sorgfältig, übernimmt jedoch keine Haftung für Verlust, Diebstahl oder
    Schäden. Künstler*innen sind für Versicherung selbst verantwortlich. Die Haftung des Veranstalters ist auf
    Vorsatz oder grobe Fahrlässigkeit beschränkt. Für Verletzungen von Leben, Körper und Gesundheit gilt die
    gesetzliche Haftung.
  </p>

  <h2 className="text-xl font-semibold mt-4">8. Rechte am Kunstwerk</h2>
  <p>
    Der/die Künstler*in versichert, Urheber*in und Eigentümer*in des eingereichten Werks zu sein. Ansprüche
    Dritter sind ausgeschlossen. Bei Forderungen Dritter stellt der/die Künstler*in den Veranstalter frei.
  </p>

  <h2 className="text-xl font-semibold mt-4">9. Datenschutz</h2>
  <p>
    Personenbezogene Daten werden gemäß unserer Datenschutzerklärung verarbeitet und nicht an unberechtigte
    Dritte weitergegeben. Alle Beteiligten stimmen der elektronischen Speicherung zu.
  </p>

  <h2 className="text-xl font-semibold mt-4">10. Sonstiges</h2>
  <p>
    Es gilt das Recht der Bundesrepublik Deutschland. Sollte eine Bestimmung unwirksam sein, bleibt die
    Wirksamkeit der übrigen Regelungen unberührt. Änderungen bedürfen der Schriftform.
  </p>

  <p className="mt-6 italic">
    Diese AGB sollen einen fairen Ausgleich der Interessen aller Beteiligten sicherstellen und basieren auf den
    in Deutschland geltenden gesetzlichen Bestimmungen.
  </p>
</div>

   </div>
    <FooterDe></FooterDe>
   </>
  )
}

export default page