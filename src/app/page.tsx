"use client"
import Navbar from "@/components/navbarDe";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ReactLenis, useLenis } from 'lenis/react'
import { useRef } from "react";
import { useRouter } from 'next/navigation'
gsap.registerPlugin(useGSAP); 
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
import Loader from "@/components/loader";


export default function Home() {
  const lenisRef = useRef<any>(null);
  const router = useRouter()
   useGSAP(() => {
    router.push('/de')
    // создаём smoother, если ещё не создавали
   

    
  }, []);
    


  return (
  <>
<Loader></Loader>
  </>
  );
}

