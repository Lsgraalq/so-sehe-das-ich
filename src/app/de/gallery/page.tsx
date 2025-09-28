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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentArts = arts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(arts.length / itemsPerPage);
  const maxButtons = 3;
  const pageNumbers = [];

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const loadArts = async () => {
      const data = await fetchArt();
      setArts(data);
      setLoading(false);
    };
    loadArts();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Wird geladen...</p>;
  return (
    <>
    <Navbar></Navbar>
    {/* small screen */}
      <div className="flex md:hidden h-screen bg-[url('/images/kunsthubsmall.png')] bg-cover bg-center">
        <div className=" flex flex-col h-screen justify-center gap-5">
          <h1 className="text-left mx-auto  text-6xl font-bold flex flex-col">KUNST <p className="flex">HUB <img src="/images/kunsthubeye.png" alt="Auge" className="flex md:hidden" /></p></h1>
          
          <h2 className="text-sm text-center mx-auto font-bold max-w-[80%]">
            Dies ist die Galerie. Hier finden Sie alle Kunstwerke, die jemals auf unseren Ausstellungen präsentiert oder einfach auf die Website hochgeladen wurden.
          </h2>
        </div>
    </div>

    {/* big screen */}
    <div className=" md:flex hidden h-screen bg-[url('/images/kunsthubphoto.png')] bg-cover bg-center">
        <div className="w-full flex flex-col h-screen justify-center gap-5">
          <h1 className="text-center mx-auto  text-6xl font-bold flex flex-col md:text-[60px] xl:text-[100px]">KUNSTHUB</h1>
          
          <h2 className="text-center mx-auto font-semibold max-w-[80%] text-3xl">
            Dies ist die Galerie. Hier finden Sie alle Kunstwerke, die jemals auf unseren Ausstellungen präsentiert oder einfach auf die Website hochgeladen wurden.
          </h2>
        </div>
    </div>
    <div className="p-6 max-w-5xl xl:max-w-[90%] mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 xl:gap-10">
        {currentArts.map((art) => (
          <a
            href={'/de/gallery/arts/' + art.id}
            key={art.id}
            className="rounded-sm overflow-hidden"
          >
            <img
              src={art.imageUrl}
              alt={art.title}
              className="w-full h-64 object-cover"
            />
            <div className="pt-4 pl-0.5">
              <h2 className="text-lg font-semibold">{art.title}</h2>
              <p className="text-gray-600 mt-2">{art.height}cm x {art.width}cm</p>
              <p className="text-gray-600">Autor: {art.authorUsername}</p>
            </div>
          </a>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-[#E24C4C] text-white rounded hover:bg-[#f46969]"
        >
          {'<'}
        </button>

        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage (num)}
            className={`px-4 py-2 rounded ${currentPage === num ? 'bg-[#9773BD] text-white' : 'bg-[#9773BD] text-gray-400'}`}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-[#FEC97C] text-white rounded hover:bg-[#f9d5a0]"
        >
          {'>'}
        </button>
      </div>
    </div>
    <FooterDe></FooterDe>
    </>
  )
}

export default ArtGallery
