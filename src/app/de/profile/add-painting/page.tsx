"use client";

import { useState } from "react";
import { db, storage, auth } from "@/firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const canvasOptions = [
  "Leinwand", "Papier", "Karton", "Stoff", "Holz", "Gips",
  "Leinwandpapier", "MDF-Platten", "Pergament", "Kunststoff", "Ton",
  "Wachs", "Stein", "Metall", "Beton", "Plastilin", "Modelliermasse",
  "Polymer Clay", "Keramik", "Leder", "Glas"
];

const paintOptions = [
  "Ölfarben", "Acrylfarben", "Gouachefarben", "Aquarellfarben", "Tusche",
  "Enkaustik", "Sprühfarben", "Kaseinfarben", "Lackfarben", "Alkydfarben",
  "Freskotechnik", "Airbrushfarben"
];

export default function AddArtPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [exhibition, setExhibition] = useState("");
  const [canvasType, setCanvasType] = useState("");
  const [selectedPaints, setSelectedPaints] = useState<string[]>([]);
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [forSale, setForSale] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePaintToggle = (paint: string) => {
    setSelectedPaints(prev =>
      prev.includes(paint) ? prev.filter(p => p !== paint) : [...prev, paint]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return alert("Вы должны войти в аккаунт");
    if (!imageFile) return alert("Выберите изображение");

    setLoading(true);
    try {
      // Загрузка картинки в Firebase Storage
      const imageRef = ref(storage, `arts/${auth.currentUser.uid}/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      // Добавление документа в Firestore
      await addDoc(collection(db, "arts"), {
        title,
        description,
        exhibition,
        authorId: auth.currentUser.uid,
        canvasType,
        paints: selectedPaints,
        height,
        width,
        price,
        forSale,
        imageUrl,
        createdAt: Timestamp.now()
      });

      alert("Картина успешно добавлена!");
      // Очистка формы
      setTitle("");
      setDescription("");
      setExhibition("");
      setCanvasType("");
      setSelectedPaints([]);
      setHeight(0);
      setWidth(0);
      setPrice(0);
      setForSale(true);
      setImageFile(null);
    } catch (err) {
      console.error(err);
      alert("Ошибка при добавлении картины");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4 text-black">
      <h1 className="text-2xl font-bold">Добавить картину</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Название"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          placeholder="Описание"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Выставка"
          value={exhibition}
          onChange={e => setExhibition(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <div>
          <label className="font-semibold">Тип холста:</label>
          <select
            value={canvasType}
            onChange={e => setCanvasType(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Выберите тип</option>
            {canvasOptions.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Краски:</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {paintOptions.map(p => (
              <button
                type="button"
                key={p}
                onClick={() => handlePaintToggle(p)}
                className={`px-3 py-1 rounded ${
                  selectedPaints.includes(p) ? "bg-red-500 text-white" : "bg-gray-200"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Высота см"
            
            onChange={e => setHeight(Number(e.target.value))}
            className="w-1/2 p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Ширина см"
            
            onChange={e => setWidth(Number(e.target.value))}
            className="w-1/2 p-2 border rounded"
            required
          />
        </div>

        <input
          type="number"
          placeholder="цена"
          
          onChange={e => setPrice(Number(e.target.value))}
          className="w-full p-2 border rounded"
          required
        />

        <div className="flex items-center gap-2">
          <label>Продается:</label>
          <input
            type="checkbox"
            checked={forSale}
            onChange={e => setForSale(e.target.checked)}
          />
        </div>

        <div>
          <label className="text-black">Изображение:</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => e.target.files && setImageFile(e.target.files[0])}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Сохраняем..." : "Добавить картину"}
        </button>
      </form>
    </div>
  );
}
