import React from 'react'
import Navbar from '@/components/navbarDe'
import FooterDe from '@/components/footerDe'
import { db } from "@/firebase/config"
import { doc, getDoc } from "firebase/firestore"



type Props = {
  params: Promise<{ id: string }>  
}

type Author = {
    username : string;

};

async function  ArtPage({ params }: Props) {
    const { id } = await params

    const artRef = doc(db, "arts", id)
    
    const snapshot = await getDoc(artRef)

    if (!snapshot.exists()) {
        return <div>Картина не найдена</div>
    }

    const art = snapshot.data()

    const authorRef = doc(db, "users", art.authorId)
    const snapshotAuthor = await getDoc(authorRef)
     if (!snapshotAuthor.exists()) {
        return <div>Картина не найдена</div>
    }
    const Author = snapshotAuthor.data()



    return (
    <>
    <Navbar></Navbar>           
    <div className="pt-25 flex flex-col gap-10">
        <div className="max-w-[80%]  md:max-w-[70%] xl:max-w-[60%]  mx-auto  relative">
            <div className="flex absolute bg-[#E35A5A] md:w-60 md:h-10  end-0 right-[-30] top-[-20] rounded-lg w-40 h-9">
                <p className="flex mx-auto items-center md:text-xl xl:text-2xl italic">Status</p>
            </div>
            <img src="/images/artinfomazok2.png" alt=" mazok" className='absolute left-[-20]  top-[-15] max-w-[15%] md:left-[-40] md:top-[-40] xl:max-w-[15%] xl:top-[-30] xl:left-[-70]' />
            <img src={art.imageUrl} alt="PHOTO"  className='w-full h-full object-cover mx-auto rounded-xl'/>
            <img src="/images/artinfomazok.png" alt="" className='absolute right-[-20] bottom-[-15] max-w-[15%] 
md:right-[-40] md:bottom-[-40] 
xl:max-w-[15%] xl:bottom-[-30] xl:right-[-70]'/>
        </div>
        <div className="text-xl flex flex-col gap-3 sm:min-w-[80%] sm:mx-auto min-w-[80%] mx-auto md:tetx-xl xl:text-xl">
            
            
            <h1 className="font-bold">{art.title}</h1>
            <p className="">Автор : <a href={"/de/artist/" + art.authorId} className="underline">{Author.username}</a></p>
            <span className="italic text-[#B3ABBE]">{art.description}</span>
            <h6 className="">Материал: <p className="p-1 bg-[#9773BD] inline-block rounded-sm">{art.canvasType}</p> </h6>
            <h6 className="">Краски: <p className="p-1 bg-[#E24C4C] inline-block rounded-sm">{art.paints?.join(" ")}</p></h6>
            {art.price && (
                <p className="">Цена: {art.price} €</p>
            )}
            <h6 className="italic font-semibold">Выставка: ICH SEHE DAS ICH 1</h6>
            <h6 className="">Участие в аукционе: {art.auction}</h6>
            <h6 className="">Размер: <p className="p-1 bg-green-600 inline-block rounded-sm">{art.height}см</p>  x <p className="p-1 bg-blue-600 inline-block rounded-sm">{art.width}см</p></h6>
            
          
        </div>
    </div>
    <FooterDe></FooterDe>
    </>
  )
}

export default ArtPage