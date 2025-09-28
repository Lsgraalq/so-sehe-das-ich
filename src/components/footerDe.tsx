import React from 'react'

function FooterDe() {
  return (
    <div className="text-xl px-2 mt-20 mb-7 text-gray-500 lg:px-20" >
        <div className="flex flex-row justify-between mb-7 gap-3">
            <div className="flex flex-col xl:border-r-1 xl:pr-40 border-white ">
                <ul className='text-sm  md:text-lg  xl:text-xl flex flex-col xl:gap-6 gap-1'>
                    <li className=""><a href="/de/profile/edit/">Einstellungen</a></li>
                    <li className=""><a href="/de/contact-us/">Kontakt</a></li>
                    <li className=""><a href="/de/support-us/">Unterstütze uns</a></li>
                    <li className=""><a href="/de/faq/">FAQ</a></li>
                    <li className=""><a href="/de/how-to-participate/">Wie man teilnimmt</a></li>
                </ul>
            </div>
            <div className="flex flex-row md:gap-3 xl:gap-10 md:border-r-1 md:pr-20 md:border-white">
                <div className=""> <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.788329907859!2d11.919315876877697!3d51.48039951267527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a67d325e0153af%3A0x4ac4d32d5080c663!2sNeust%C3%A4dter%20Passage%2013!5e0!3m2!1sru!2sua!4v1749472252311!5m2!1sru!2sua"
       width="80%" height="100%" 
        loading="lazy" className="mx-auto align justify-center hidden md:flex lg:w-100"></iframe></div>
                <div className="flex flex-col xl:gap-6 gap-2">
                    <ul className="text-sm md:text-lg  xl:text-xl flex flex-col xl:gap-6 gap-1">
                        <li><a href="/de/impressum" className="">Impressum</a></li>
                        <li><a href="" className="">AGB</a></li>

                        <li><a href="/de/datenschutzerklarung" className="">Datenshutzerklärung</a></li>
                    </ul>
                    <div className="flex flex-row gap-2">
                        <img src="/images/footer1.png" alt="SODI"  className='w-20 h-auto object-contain xl:w-30'/>
                        <img src="/images/footer2.png" alt="NEZABUTI"  className='w-11 h-auto xl:w-16' />
                    </div>
                </div>
            </div>
            <div className="">
                <ul className="text-sm md:text-lg xl:text-xl flex flex-col xl:gap-6 gap-1">
                    <li className=""><a href="#">Profil</a></li>
                    <li className=""><a href="#">Registrieren</a></li>
                    <li className=""><a href="#">KunstHub</a></li>
                    <li className=""><a href="#">Ausstellungen</a></li>

                </ul>
            </div>
        </div>
        <a href="http://www.merinets.xyz/" className="block tracking-[4] text-gray-500 text-center  md:text-xl text-sm">entwickelt von Merinets</a>
    </div>
  )
}

export default FooterDe