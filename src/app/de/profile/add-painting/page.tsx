"use client";

import { useState } from "react";
import { db, storage, auth } from "@/firebase/config";
import { collection, addDoc, Timestamp, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import NavbarDe from "@/components/navbarDe";
import FooterDe from "@/components/footerDe";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import ImageUploaderWrapper from "@/components/ImageUploaderWrapper"


const materialOptions = [
  "Leinwand", "Papier", "Karton", "Stoff", "Holz", "Gips",
  "Leinwandpapier", "MDF-Platten", "Pergament", "Kunststoff", "Ton",
  "Wachs", "Stein", "Metall", "Beton", "Plastilin", "Modelliermasse",
  "Polymer Clay", "Keramik", "Leder", "Glas"
];

const paintOptions = [
  "Ölfarben", "Acrylfarben", "Gouachefarben", "Aquarellfarben", "Lackfarben",
  "Tusche", "Enkaustik", "Sprühfarben", "Kaseinfarben", "Airbrushfarben",
  "Alkydfarben", "Freskotechnik"
];

export default function AddArtPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [forSale, setForSale] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [resetTrigger, setResetTrigger] = useState(false)
  
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedPaints, setSelectedPaints] = useState<string[]>([]);
  const [year, setYear] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [inAuction, setInAuction] = useState<boolean>(false);
  const [width, setWidth] = useState<number | null>(null);
  const [creationDate, setCreationDate] = useState<Date | null>(null);

  // toggle-функции
  const handleToggle = (list: string[], setList: any, value: string) => {
    setList((prev: string[]) =>
      prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return alert("Sie müssen eingeloggt sein.");
    if (!imageFile) return alert("Bitte wählen Sie ein Bild aus.");

    setLoading(true);
    try {
      const imageRef = ref(
        storage,
        `arts/${auth.currentUser.uid}/${imageFile.name}`
      );
      const uploadTask = uploadBytesResumable(imageRef, imageFile);

      uploadTask.on("state_changed", (snapshot) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(percent));
      });

      await new Promise<void>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          reject,
          async () => {
            const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

            // получаем username
            let username = "";
            const snap = await getDoc(
              doc(db, "users", auth.currentUser!.uid)
            );
            if (snap.exists()) username = snap.data().username ?? "";

            // сохраняем картину
            await addDoc(collection(db, "arts"), {
              title,
              description,
              userId: auth.currentUser!.uid,
              authorUsername: username,
              canvasType: selectedMaterials,
              paints: selectedPaints,
              creationDate: creationDate
                ? Timestamp.fromDate(creationDate)
                : null,
              height,
              width,
              price: forSale ? price : null,
              forSale,
              imageUrl,
              createdAt: Timestamp.now(),
              inAuction,
            });
           
            alert("Das Kunstwerk wurde erfolgreich hinzugefügt!");
            setTitle("");
            setDescription("");
            setPrice(null);
            setForSale(false);
            setResetTrigger((prev) => !prev);
            setProgress(0);
            setLoading(false);
            setSelectedMaterials([]);
            setSelectedPaints([]);
            setYear(null);
            setHeight(null);
            setWidth(null);
            setCreationDate(null);
            resolve();

          }
        );
      });
    } catch (err) {
      console.error(err);
      alert("Fehler beim Hochladen.");
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarDe />
      
      <div className="md:max-w-[75%] px-5 mx-auto p-6 flex flex-col space-y-4 text-white pt-20">
        <h1 className="text-2xl font-bold">Kunstwerk hinzufügen</h1>
        <form onSubmit={handleSubmit} className="space-y-6 mx-auto ">
            <ImageUploaderWrapper onFileSelect={setImageFile} resetTrigger={resetTrigger} />

            
          <input
            type="text"
            placeholder="Titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3  rounded bg-[#FAF3F3] text-gray-500 focus:outline-none focus:border-0"
            required
          />

          <textarea
            placeholder="Beschreibung"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3  rounded bg-[#FAF3F3] text-gray-500 focus:outline-none focus:border-0"
            required
          />

          <div>
            <label className="font-semibold">Materialart:</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {materialOptions.map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() =>
                    handleToggle(selectedMaterials, setSelectedMaterials, m)
                  }
                  className={`px-3 py-1 rounded transition-all duration-300 ease-in-out transform ${
                    selectedMaterials.includes(m)
                      ? "bg-[#8828ee] text-white scale-105 shadow-[0_0_10px_#e41717aa]"
                      : "bg-[#9773BD] text-white"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold">Farbart:</label>
           <div className="flex flex-wrap gap-2 mt-2">
  {paintOptions.map((p) => (
    <button
      type="button"
      key={p}
      onClick={() => handleToggle(selectedPaints, setSelectedPaints, p)}
      className={`px-3 py-1 rounded transition-all duration-300 ease-in-out transform
        ${
          selectedPaints.includes(p)
            ? "bg-[#e41717] text-white scale-105 shadow-[0_0_10px_#e41717aa]"
            : "bg-[#E24C4C] text-white"
        }`}
    >
      {p}
    </button>
  ))}
</div>

          </div>

          <div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Entstehungsdatum:</label>
              <DatePicker
                selected={creationDate}
                onChange={(date: Date | null) => setCreationDate(date)}
                dateFormat="dd.MM.yyyy"
                className="w-full p-3  rounded bg-[#FAF3F3] text-gray-500 focus:outline-none focus:border-0"
                placeholderText="Datum wählen"
                showYearDropdown
                scrollableYearDropdown
              />
            </div>
          </div>
          {!inAuction && (
<div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={forSale}
              onChange={(e) => setForSale(e.target.checked)}
            />
            <label>Zum Verkauf</label>
          </div>
          )}
          

          {forSale && (
            <input
              type="number"
              placeholder="Preis (€)"
              value={price ?? ""}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full p-3  rounded bg-[#FAF3F3] text-gray-500 focus:outline-none focus:border-0"
              required={forSale}
            />
          )}

          {!forSale && (
            <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={inAuction}
              onChange={(e) => setInAuction(e.target.checked)}
            />
            <label>Nimmt an der Auktion teilf</label>
          </div>

          )}
          

          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="font-semibold">Höhe (cm):</label>
              <input
                type="number"
                placeholder="z.B. 80"
                value={height ?? ""}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full p-3  rounded bg-[#FAF3F3] text-gray-500 focus:outline-none focus:border-0"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="font-semibold">Breite (cm):</label>
              <input
                type="number"
                placeholder="z.B. 60"
                value={width ?? ""}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full p-3  rounded bg-[#FAF3F3] text-gray-500 focus:outline-none focus:border-0"
                required
              />
            </div>
          </div>

         

         
         <div className="w-full text-center pt-10">
          <button
            type="submit"
            className="min-w-[30%]  bg-gradient-to-r from-[#FEC97C] to-[#E35A5A] text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? `Lädt... ${progress}%` : "Kunstwerk hinzufügen"}
          </button>
         </div>
          
        </form>
      </div>
      <FooterDe />
    </>
  );
}
