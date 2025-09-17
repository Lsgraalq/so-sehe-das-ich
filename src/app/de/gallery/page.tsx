"use client";

import { useEffect, useState } from "react";
import { fetchArt } from "@/utils/fetchArts";
import React from 'react'
import Navbar from '@/components/navbarDe'
import FooterDe from '@/components/footerDe'
import {Art} from "@/utils/fetchArts";
function ArtGallery() {
    const [arts, setArts] = useState<Art[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArts = async () => {
      const data = await fetchArt();
      setArts(data);
      setLoading(false);
    };
    loadArts();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Загрузка...</p>;
  return (
    <>
    <Navbar></Navbar>
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Art Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {arts.map((art) => (
          <a
          href={'/de/gallery/arts/' + art.id}
            key={art.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={art.imageUrl}
              alt={art.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{art.title}</h2>
              {art.description && (
                <p className="text-gray-600 mt-2">{art.description}</p>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
    <FooterDe></FooterDe>
    </>
  )
}

export default ArtGallery