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
  
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedPaints, setSelectedPaints] = useState<string[]>([]);
  const [year, setYear] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
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
              authorId: auth.currentUser!.uid,
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
            });
           
            alert("Das Kunstwerk wurde erfolgreich hinzugefügt!");
            setTitle("");
            setDescription("");
            setPrice(null);
            setForSale(false);
            setImageFile(null);
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
      <div className="max-w-2xl mx-auto p-6 bg-black rounded-xl shadow-md space-y-4 text-white pt-20">
        <h1 className="text-2xl font-bold">Kunstwerk hinzufügen</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded bg-zinc-900 text-white"
            required
          />

          <textarea
            placeholder="Beschreibung"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded bg-zinc-900 text-white"
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
                  className={`px-3 py-1 rounded ${
                    selectedMaterials.includes(m)
                      ? "bg-purple-600 text-white"
                      : "bg-purple-300 text-black"
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
                  onClick={() =>
                    handleToggle(selectedPaints, setSelectedPaints, p)
                  }
                  className={`px-3 py-1 rounded ${
                    selectedPaints.includes(p)
                      ? "bg-red-600 text-white"
                      : "bg-red-400 text-black"
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
                className="w-full p-2 border rounded bg-zinc-900 text-white"
                placeholderText="Datum wählen"
                showYearDropdown
                scrollableYearDropdown
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={forSale}
              onChange={(e) => setForSale(e.target.checked)}
            />
            <label>Zum Verkauf</label>
          </div>

          {forSale && (
            <input
              type="number"
              placeholder="Preis (€)"
              value={price ?? ""}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full p-2 border rounded bg-zinc-900 text-white"
              required={forSale}
            />
          )}

          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="font-semibold">Höhe (cm):</label>
              <input
                type="number"
                placeholder="z.B. 80"
                value={height ?? ""}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full p-2 border rounded bg-zinc-900 text-white"
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
                className="w-full p-2 border rounded bg-zinc-900 text-white"
                required
              />
            </div>
          </div>

          <div>
            <label>Bild hochladen:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files && setImageFile(e.target.files[0])
              }
              required
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
                         file:rounded file:border-0 file:text-sm
                         file:font-semibold file:bg-orange-500 file:text-white
                         hover:file:bg-orange-600"
            />
          </div>

          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="preview"
              className="w-full max-h-64 object-contain rounded"
            />
          )}

          {loading && (
            <div className="w-full bg-gray-700 rounded h-4">
              <div
                className="bg-blue-600 h-4 rounded"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

         
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#FEC97C] to-[#E35A5A] text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? `Lädt... ${progress}%` : "Kunstwerk hinzufügen"}
          </button>
        </form>
      </div>
      <FooterDe />
    </>
  );
}
