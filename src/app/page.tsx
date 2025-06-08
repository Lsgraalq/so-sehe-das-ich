"use client"
import Image from "next/image";
import Navbar from "../../components/navbar";
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP); 


export default function Home() {

   const container = useRef(null);

    useGSAP(() => {
        
        
    });
    


  return (
  <>
  
    <section className=" header pb-30 w-full h-screen bg-center bg-cover bg-no-repeat"
  style={{ backgroundImage: "url('/images/hero.png')" }}>
      <Navbar></Navbar>
      
    </section>
    <section className="h-screen section-two relative ">
      <img src="/images/sdvg.png" alt="" className="w-[20%] absolute left-25"/>
      <div className="container flex  items-center">
        <h1 className="inline-block align-middle xl:text-6xl text-center font-bold">
          SO SEHE DAS 
          <img src="/images/ich.png" alt="ICH" className="h-[1em] inline-block mb-4 ml-4"/>
        </h1>
      </div>
      <img src="/images/asd.png" alt="" className="w-[20%] bottom-0 right-25 absolute "/>
    </section>
    <section className="h-screen">
    <h2 className="box">asdasdasdasd</h2>
    </section>
    <section className="h-screen">
    <h2 className="">asdasdasdasd</h2>
    </section>
  </>
  );
}
