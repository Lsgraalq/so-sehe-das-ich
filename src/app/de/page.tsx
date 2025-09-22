"use client"
import Navbar from "@/components/navbarDe";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ReactLenis } from 'lenis/react'
import { useRef } from "react";
import FooterDe from "@/components/footerDe";


gsap.registerPlugin(useGSAP); 
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
    const lenisRef = useRef<any>(null);

   useGSAP(() => {
    
    // создаём smoother, если ещё не создавали
   

    
  }, []);
    
 
  

  return (
  <>
  
    <ReactLenis
  root
  options={{
    anchors: true,
    duration: 1.5,
    wheelMultiplier: 0.8,
    touchMultiplier: 0.7, 
    smoothWheel: true,
    autoRaf: true,
  }}
  ref={lenisRef}
>
   <div id="smooth-wrapper">
    
    <div id="smooth-content"
    >
    <section className=" header pb-30 w-full h-screen bg-center bg-cover bg-no-repeat" 
  style={{ backgroundImage: "url('/images/hero.png')" }}>
     
      
    </section>
    <section className="min-h-[100vh] section-two relative parent  "  >
      
      <img src="/images/sdvg.png" alt="" className="w-[40%] md:w-[30%] xl:w-[25%] 2xl:w-[20%] absolute left-5 md:top-20 top-10 child-parallax object-cover " />
      <div className="w-[75%] mx-auto flex flex-col justify-center h-screen " >
        <h1 className="inline-block  text-4xl w-full text-center font-bold pb-20 md:text-5xl">
          SO SEHE DAS 
          <img src="/images/ich.png" alt="ICH" className="h-[1em] inline-block mb-2 ml-2"/>
        </h1> 
        <p className="text-center text-lg leading-7.5 xl:leading-10 text-gray-200 md:text-2xl "> - ist eine offene Ausstellung, bei der wirklich jeder Künstlerin die Möglichkeit hat, seine Weltanschauung, seine Erfahrungen und seine Emotionen mit der Öffentlichkeit zu teilen. Jeder darf mitmachen - egal ob Schülerin oder Rentnerin, jede Stimme zählt, jeder hat das Recht auf Selbstausdruck!
        </p>
      </div>
      <img src="/images/asd.png" alt="" className="w-[40%] md:w-[30%] xl:w-[25%] 2xl:w-[20%] bottom-10 md:bottom-0 right-5 absolute child-parallax object-cover" />
   
   </section>
    <section className="min-[100vh]  pb-5"  >
       
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
    <section className=" min-h-[100vh]  "  >
      
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
    <img src="/images/eyes.png" alt="" className="absolute z-[-1] top-100 right-80 xl:top-75 " />
   </div>
   
    </section>
    <section className="min-h-screen w-[80%] mx-auto"  >
      <div className="flex flex-col lg:flex-row gap-20 ">
       
          <img src="/images/people.png" alt="" className="lg:max-w-[50%] xl:max-w-[35%] md:max-w-[60%] max-w-[80%] mx-auto  2xl:px-10" />
       
        
        <div className="flex flex-col lg:w-1/2 mx-auto gap-10 pb-5">
          <div className="flex flex-col " >
            <h1 className="w-full text-xl md:text-3xl lg:text-4xl xl:text:5xl 2xl:text-6xl font-bold  inline-block">Wie  <img src="/images/kaun.png" alt="" className="h-[1.5em] inline-block mb-2" /> ich teilnehmen?           </h1>
             
         
          </div>
          <p className="leading-6.5 text-base md:text-lg xl:text-xl xl:leading-9">Um an So Sehe Das Ich teilzunehmen, musst du ein wenig Zeit investieren, um deine Werke zu registrieren. Die Registrierung und Teilnahme sind vollkommen kostenlos. Zuerst erstellst du ein Konto und füllst dein Profil aus. Danach kannst du deine Werke hochladen – du brauchst lediglich ein Foto des Werks und ein paar Angaben dazu. Das wiederholst du für alle Werke, die du ausstellen möchtest. Dann gehst du zum Tab „Ausstellungen“, wählst die Ausstellung aus, an der du teilnehmen willst, klickst auf „Registrieren“ und folgst den weiteren Anweisungen auf dem Bildschirm.</p>
          
          
        <p className="leading-6 text-base md:text-lg xl:text-xl xl:leading-9 italic font-bold">Detaillierte Infos zur Registrierung und Tipps zur Werkseingabe findest du auf der Seite „Wie registriere ich mich für die Ausstellung?“</p>
        </div>
      </div>
    </section>
    <section className="h-screen bg-[#FEC97C]"  >
      <div className="w-[80%] mx-auto">
        <div className="mx-auto w-full flex lg:flex-row flex-col justify-between px-10 lg:pb-10">
          <h1 className="text-[#0A0A0A] font-bold md:text-[23vh] text-[19vh] border-b-10 lg:border-b-0 mx-auto xl:text-[26vh] 2xl:text-[35vh]">14</h1>
          <h1 className="text-[#0A0A0A]  md:text-[25vh] hidden lg:flex lg:text-[26vh] xl:text-[35vh]">|</h1>
          <h1 className="text-[#E24C4C] font-bold md:text-[23vh] text-[19vh] mx-auto xl:text-[26vh] 2xl:text-[35vh]">18</h1>
        </div>
        <div className="lg:w-[80%] w-[100%] mx-auto  ">
          <div className="text-[#0A0A0A]">
            <h1 className="w-full text-center lg:text-6xl text-3xl font-bold uppercase pb-5 lg:pb-20">Wer darf teilnehmen?</h1>
          </div>
          <div className="flex flex-col lg:flex-row text-[#0A0A0A] gap-10 lg:gap-30">
              <div className="flex flex-col text-center">
                <p className="text-2xl lg:text-3xl  lg:font-bold uppercase lg:pb-7">Teilnehmen kann jeder ab 14</p>
                <img src="/images/line.png" alt="" className="sm:w-[60%] md:w-[50%] mx-auto lg:w-[100%]" />
              </div>
              <div className="text-center pb-5">
                <p className="text-2xl lg:text-3xl lg:font-bold uppercase">Verkaufen dürfen ihre Werke allerdings nur Künstlerinnen ab 18 Jahren.</p>
              </div>
          </div>
        </div>
        
       
      </div>
    </section>
    <section className="h-screen bg-[#FEC97C] text-[#0A0A0A]"  >
      <div className="w-[80%] h-screen lg:flex lg:flex-row relative mx-auto ">
        <div className="flex flex-col gap-10 justify-center h-screen lg:w-1/2">
          <h1 className="w-full  lg:text-6xl text-3xl font-bold uppercase text-left">Wo finden die Ausstellungen statt?</h1>
          <span className=" text-2xl lg:text-3xl  uppercase">Derzeit werden wir ausschließlich von <p className="font-bold">Passage 13</p> unterstützt, die uns ihre</span>
          <p className="text-2xl lg:text-3xl  uppercase">In Zukunft hoffen wir, auch von anderen ehrenamtlichen Organisationen Unterstützung zu erhalten, um unsere Ausstellungen an weiteren Orten oder sogar in anderen Städten durchführen zu können!</p>
        </div>
        <div className="lg:w-1/2 flex items-center justify-center"> <img src="/images/penis.png" alt="" className="hidden lg:flex" /> </div>
      </div>
    </section>
    <section className="h-screen flex  justify-center items-center"  >
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.788329907859!2d11.919315876877697!3d51.48039951267527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a67d325e0153af%3A0x4ac4d32d5080c663!2sNeust%C3%A4dter%20Passage%2013!5e0!3m2!1sru!2sua!4v1749472252311!5m2!1sru!2sua"
       width="80%" height="80%" 
        loading="lazy" className="mx-auto align justify-center "></iframe>
    </section>
    <section className="min-h-screen"  >
      <div className="w-[80%] mx-auto pb-10">
        <div className="w-full ">
          <h1 className="inline-block  text-4xl w-full text-center font-bold pb-5 md:text-6xl uppercase"> <img src="/images/niger.png" alt="" className="inline-block h-[3em] mb-9 mr-3" />organisiert die Ausstellung?</h1>
        </div>
        <div className="text-center">
          <h1 className="text-2xl w-full text-center font-bold pb-10 md:text-3xl">Die Ausstellung wird von der engagierten Freiwilligengruppe Caseus organisiert.</h1>
        </div>
        <div className="flex flex-row w-[80%] mx-auto">
          <div className="flex flex-col 2xl:w-[75%]">
            <div className="flex flex-col md:flex-row">
               <img src="/images/casusus.png" alt="" className="p-15 max-w-[30vh] mx-auto object-contain" />
             <span className="text-center m-auto md:text-left  md:text-lg"> <p className="font-bold uppercase md:text-xl ">Caseus Studio</p> Unser Schwerpunkt liegt im Bereich Video. Seit einem Jahr produzieren wir Filme, Interviews, 
             soziale Kurzfilme, Fotoprojekte und mehr. Kürzlich haben wir uns erweitert und ein eigenes journalistisches Subprojekt gegründet: nezabuti.
            </span>
            </div>
            <div className="flex  flex-col md:flex-row">
               <img src="/images/nenenene.png" alt="" className=" p-15  max-w-[30vh] mx-auto md:mx-0" />
              <span className="text-center mt-auto mb-auto md:text-left md:text-lg"> <p className="font-bold uppercase md:text-xl ">Nezabuti</p>  - beschäftigt sich mit Journalismus, dokumentiert verschiedenste Events und führt Interviews durch.
              </span>
            </div>
          </div>
          <div className="hidden lg:flex 2xl:w-[25%]">
             <img src="/images/helloworld.png" alt="" className="object-contain" />
          </div>
        </div>
       
      </div>
       
       
       
       

    </section>
    </div>
    </div>
    <Navbar></Navbar>
     <FooterDe></FooterDe>
    
    
     </ReactLenis>
  </>
  );
}
