"use client"
import React from "react"
import FooterDe from "@/components/footerDe"
import Navbar from "@/components/navbarDe"

export default function KommissionsvertragPage() {
  return (
    <> <Navbar></Navbar> 
    <div className="bg-black text-white min-h-screen p-8 pt-25">
      <div className="max-w-3xl mx-auto space-y-6 leading-relaxed">
        <h1 className="text-2xl font-bold">Kommissionsvertrag</h1>

        <p>
          zwischen<br />
          der Initiative Nezabuti, vertreten durch Rostislav Kulikov<br />
          (Matthias-Grünewald-Straße 6, 06124 Halle (Saale), Deutschland,<br />
          E-Mail: sosehedasich@gmail.com, Tel.: +49 176 68188204)
        </p>

        <p>– nachfolgend „Veranstalter“ genannt –</p>

        <p>
          und dem/der registrierten Künstler*in auf der Plattform<br />
          So Sehe Das Ich (so-sehe-das-ich.art)
        </p>

        <p>– nachfolgend „Künstler*in“ genannt –</p>

        <p>wird folgender Kommissionsvertrag geschlossen:</p>

        <hr className="border-gray-700" />

        <h2 className="text-xl font-semibold">§1 Gegenstand der Vereinbarung</h2>
        <p>
          Der/die Künstlerin nimmt an der offenen Kunstausstellung „So Sehe Das Ich“ teil,
          organisiert von der Initiative Nezabuti. Im Rahmen dieser Ausstellung stellt der/die
          Künstlerin eines oder mehrere Kunstwerke zum Verkauf zur Verfügung.
        </p>
        <p>
          Die Ausstellung dient ausschließlich der Präsentation und Vermittlung von Kunstwerken.
          Ein Anspruch auf Verkauf oder bestimmte Platzierung besteht nicht.
        </p>

        <hr className="border-gray-700" />

        <h2 className="text-xl font-semibold">§2 Verkaufsbedingungen</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Der Verkauf erfolgt ausschließlich vor Ort in der Galerie während der Ausstellung.</li>
          <li>Die Bezahlung durch Käufer*innen erfolgt in bar oder per EC-/Kreditkarte direkt an der Kasse des Veranstalters.</li>
          <li>Der Veranstalter verkauft die Werke im eigenen Namen, aber auf Rechnung des/der Künstler*in (Kommissionsverkauf).</li>
          <li>Der Veranstalter behält eine Provision in Höhe von 40 % des erzielten Verkaufspreises ein. Der/die Künstler*in erhält 60 % des Verkaufserlöses.</li>
          <li>Die Auszahlung an den/die Künstler*in erfolgt innerhalb von 14 Tagen nach Ende der Ausstellung auf das vom Künstler bei der Registrierung angegebene IBAN-Konto.</li>
        </ol>

        <hr className="border-gray-700" />

        <h2 className="text-xl font-semibold">§3 Dauer der Vereinbarung</h2>
        <p>
          Diese Vereinbarung gilt für die Dauer der Ausstellung und endet automatisch mit dem
          Abschluss der Veranstaltung oder dem Verkauf des Kunstwerks.
        </p>
        <p>
          Nicht verkaufte Kunstwerke werden nach Ausstellungsende an den/die Künstlerin zurückgegeben.
          Der/die Künstlerin verpflichtet sich, das Werk zeitnah nach Ende der Ausstellung abzuholen.
        </p>

        <hr className="border-gray-700" />

        <h2 className="text-xl font-semibold">§4 Verantwortung und Haftung</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Der Veranstalter verpflichtet sich, die Kunstwerke mit der gebotenen Sorgfalt zu behandeln.</li>
          <li>Der Veranstalter übernimmt keine Haftung für Verlust, Diebstahl oder Beschädigung der Werke, es sei denn, der Schaden wurde vorsätzlich oder grob fahrlässig verursacht.</li>
          <li>Eine Versicherung der Werke erfolgt nicht durch den Veranstalter. Der/die Künstler*in ist selbst verantwortlich, sein/ihr Werk zu versichern.</li>
        </ol>

        <hr className="border-gray-700" />

        <h2 className="text-xl font-semibold">§5 Urheberrecht und Rechte Dritter</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Der/die Künstlerin versichert, Urheberin und rechtmäßige/r Eigentümer*in des ausgestellten Kunstwerks zu sein und dass durch die Ausstellung oder den Verkauf keine Rechte Dritter verletzt werden.
          </li>
          <li>
            Der/die Künstler*in räumt dem Veranstalter das Recht ein, Abbildungen des Kunstwerks im Rahmen der Öffentlichkeitsarbeit (Website, Social Media, Presseberichte) unentgeltlich zu verwenden.
          </li>
        </ol>

        <hr className="border-gray-700" />

        <h2 className="text-xl font-semibold">§6 Datenschutz</h2>
        <p>
          Die Verarbeitung personenbezogener Daten (Name, Kontakt, IBAN, Altersnachweis etc.)
          erfolgt ausschließlich gemäß der Datenschutzerklärung der Initiative Nezabuti
          und nur zum Zweck der Ausstellung und Abrechnung.
        </p>

        <hr className="border-gray-700" />

        <h2 className="text-xl font-semibold">§7 Schlussbestimmungen</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Änderungen oder Ergänzungen dieses Vertrags bedürfen der Textform (§126b BGB).</li>
          <li>Es gilt das Recht der Bundesrepublik Deutschland.</li>
          <li>Gerichtsstand ist Halle (Saale).</li>
          <li>Sollte eine Bestimmung dieses Vertrags unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.</li>
        </ol>

        <hr className="border-gray-700" />

        <h2 className="text-xl font-semibold">Zustimmungserklärung</h2>
        <p>
          Durch das Setzen des entsprechenden Häkchens im Online-Registrierungsformular erklärt der/die Künstler*in, dass er/sie die Bedingungen dieses Kommissionsvertrags gelesen und verstanden hat und diesen rechtsverbindlich zustimmt.
        </p>
        <p>
          Eine gesonderte Unterschrift ist gemäß §126b BGB nicht erforderlich.
        </p>
      </div>
    </div>
<FooterDe></FooterDe></>
  )
}
