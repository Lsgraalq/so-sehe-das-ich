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
      <img src="/images/sdvg.png" alt="" className="w-[40%] md:w-[30%] xl:w-[25%] 2xl:w-[20%] absolute left-5"/>
      <div className="w-[75%] mx-auto flex flex-col justify-center h-screen ">
        <h1 className="inline-block  text-4xl w-full text-center font-bold pb-20 md:text-5xl">
          SO SEHE DAS 
          <img src="/images/ich.png" alt="ICH" className="h-[1em] inline-block mb-2 ml-2"/>
        </h1> 
        <p className="text-center text-lg leading-7.5 xl:leading-10 text-gray-200 md:text-2xl "> - ist eine offene Ausstellung, bei der wirklich jeder Künstlerin die Möglichkeit hat, seine Weltanschauung, seine Erfahrungen und seine Emotionen mit der Öffentlichkeit zu teilen. Jeder darf mitmachen - egal ob Schülerin oder Rentnerin, jede Stimme zählt, jeder hat das Recht auf Selbstausdruck!
        </p>
      </div>
      <img src="/images/asd.png" alt="" className="w-[40%] md:w-[30%] xl:w-[25%] 2xl:w-[20%] bottom-10 right-5 absolute "/>
    </section>
    <section className="h-screen">
      <div className="relative h-screen">
        <img src="/images/ass.png" alt=""  className="absolute left-5 w-[20%] sm:w-[15%] md:w-[12%] lg:w-[8%] lg:left-20"/>
        <div className="w-[80%] lg:w-[60%] mx-auto ">
          <div className="flex flex-col gap-15  h-[80vh] justify-center pb-20 text-center md:text-left">
            <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">Worum geht es in dieser Ausstellung?</h1>
            <img src="/images/fuckedtext.png" alt="" className="lg:w-[50%]"/>
          <p className="text-lg leading-7.5 text-left text-gray-200 lg:text-2xl md:text-xl xl:leading-10 xl:w-[50%]">Das Besondere an unserer Ausstellung ist, dass sie tausende Perspektiven miteinander verbindet. Künstlerinnen jeder Stilrichtung können ihre Werke präsentieren – sei es ein Gemälde, eine Skulptur, ein DIY-Projekt, ein Hoodie-Print oder eine Postkarte für Mama. Du gibst das Thema vor – du bist derdie Schöpfer*in.
          </p>
          </div>
        </div>
        <img src="/images/tsp.png" alt="" className="absolute sm:w-[80%] right-0 md:w-[60%] lg:w-[50%] bottom-30 z-[-1]"/>
      </div>
      
    
     
    </section>
    <section className="h-screen ">
    <div className="relative h-screen w-full p-0 m-0">
    <div className="w-[80%] mx-auto ">
        <div className="flex flex-col w-[90%] gap-5  h-[80vh] justify-center lg:w-[70%]">
          <h1 className="text-xl md:text-3xl lg:text-4xl xl:text:5xl 2xl:text-6xl font-bold">Warum sollte ich teilnehmen?</h1>
          <p className="leading-7 text-base md:text-lg lg:text-xl lg:leading-9">Jeder hat seine eigene Motivation. Ursprünglich wurde diese Ausstellung ins Leben gerufen, um Kunststudentinnen eine Plattform zu geben, auf der sie Anerkennung, Erfahrung und ein starkes Portfolio aufbauen können. Doch schnell wurde klar, dass nicht nur Studierende daran interessiert sind – jetzt kann jeder mitmachen.</p>
          <p className="leading-7 text-base md:text-lg lg:text-xl lg:leading-9"> Unsere Webseite ist so gestaltet, dass du einfach einen Link zu deinem Profil in dein Portfolio aufnehmen kannst. Arbeitgeberinnen oder Hochschulen können sich so all deine Werke auf einen Blick ansehen. <br /><br /> Und das ist noch nicht alles: Du kannst deine Werke auch verkaufen! Wenn du bereit bist, dich von einem Werk zu trennen, kannst du es entweder zu einem festen Preis anbieten oder dein Glück beim Auktionssystem versuchen – vielleicht findet sich ein Käufer, der dein Werk schätzt!</p>
        </div>
    </div>
    <img src="/images/eye.png" alt="" className="absolute z-[-1] bottom-40 right-0 w-[70%] lg:w-[30%] lg:top-90 md:w-[40%] xl:w-[20%]" />
    <img src="/images/pinis.png" alt="" className="absolute z-[-1] top-20  right-10 w-[30%] md:w-[20%] xl:w-[10%] " />
    <img src="/images/eyes.png" alt="" className="absolute z-[-1] top-100 left-5 2xl:left-[140vh] xl:top-75 " />
   </div>
    </section>
    <section className="min-h-screen w-[80%] mx-auto">
      <div className="flex flex-col lg:flex-row gap-20 ">
       
          <img src="/images/people.png" alt="" className="lg:max-w-[50%] xl:max-w-[35%] md:max-w-[60%] max-w-[80%] mx-auto  2xl:px-10" />
       
        
        <div className="flex flex-col lg:w-1/2 mx-auto gap-10">
          <div className="flex flex-col " >
            <h1 className="w-full text-xl md:text-3xl lg:text-4xl xl:text:5xl 2xl:text-6xl font-bold  inline-block">Wie  <img src="/images/kaun.png" alt="" className="h-[1.5em] inline-block mb-2" /> ich teilnehmen?           </h1>
             
         
          </div>
          <p className="leading-6.5 text-base md:text-lg xl:text-xl xl:leading-9">Um an So Sehe Das Ich teilzunehmen, musst du ein wenig Zeit investieren, um deine Werke zu registrieren. Die Registrierung und Teilnahme sind vollkommen kostenlos. Zuerst erstellst du ein Konto und füllst dein Profil aus. Danach kannst du deine Werke hochladen – du brauchst lediglich ein Foto des Werks und ein paar Angaben dazu. Das wiederholst du für alle Werke, die du ausstellen möchtest. Dann gehst du zum Tab „Ausstellungen“, wählst die Ausstellung aus, an der du teilnehmen willst, klickst auf „Registrieren“ und folgst den weiteren Anweisungen auf dem Bildschirm.</p>
          
          
        <p className="leading-6 text-base md:text-lg xl:text-xl xl:leading-9 italic font-bold">Detaillierte Infos zur Registrierung und Tipps zur Werkseingabe findest du auf der Seite „Wie registriere ich mich für die Ausstellung?“</p>
        </div>
      </div>
    </section>
    <section className="h-screen bg-[#FEC97C]">
      <div className="w-[80%] mx-auto">
        <div className="mx-auto w-full flex flex-row justify-between px-10">
          <h1 className="text-[#0A0A0A] font-bold text-[40vh]">14</h1>
          <h1 className="text-[#0A0A0A]  text-[40vh]">|</h1>
          <h1 className="text-[#E24C4C] font-bold text-[40vh]">18</h1>
        </div>
        <div className="w-[80%] mx-auto">
          <div className="">
            <h1>Wer darf teilnehmen?</h1>
          </div>
          <div className="flex flex-col md:flex-row">
              <div className="">
                <p className="">Teilnehmen kann jeder ab 14</p>
                 <img src="/images/line.png" alt="" className="lg:max-w-[50%] xl:max-w-[35%] md:max-w-[60%] max-w-[80%] mx-auto  2xl:px-10" />
              </div>
              <div className="">
                <p className="">Verkaufen dürfen ihre Werke allerdings nur Künstlerinnen ab 18 Jahren.</p>
              </div>
          </div>
        </div>
        
       
      </div>
    </section>
  </>
  );
}
