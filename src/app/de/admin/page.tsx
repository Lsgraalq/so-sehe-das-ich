import React from 'react'
import NavbarBOG from '@/components/navbarBOG'
import FooterBOG from '@/components/footerBOG'
import AdminGuard from '@/components/AdminGuard'

function page() {
  return (
    <>
    <AdminGuard></AdminGuard>
    <NavbarBOG></NavbarBOG>
    <div className="flex flex-row w-full pt-50">
      <div className="flex flex-col ">
        <img src="/images/1.png" alt="christ" className='h-[25vh]'/>
        <img src="/images/2.png" alt="christ"className='h-[25vh]' />
        <img src="/images/3.png" alt="christ" className='h-[25vh]'/>
        <img src="/images/4.png" alt="christ" className='h-[25vh]'/>
        

      </div>
      <div className="min-h-screen  flex flex-col gap-y-10 md:min-w-[80%] px-10 mx-auto md:px-0 bg-[url('/images/backgroundLOL.png')] bg-cover bg-center bg-no-repeat">
      <a href="/de/ausstellungen/add" className="text-blue-400 text-bold text-2xl hover:underline hover:cursor-pointer"> - ausstellungen add</a>
      <a href="/de/faq/edit" className="text-blue-400 text-bold text-2xl hover:underline hover:cursor-pointer"> - faq edit + add</a>
      <div className="flex px-0 md:px-10 flex-col gap-y-5">
         <h2 className='md:text-white text-red-600 text-4xl'>Info</h2>
      <p className="md:text-white text-red-600 text-2xl font-bold">To edit Ausstellung <br /> <span className='2xl:text-red-600'>go on Ausstellung page and edit url to [ausstellungId]/edit</span></p>
           <p className="md:text-white text-red-600 text-2xl font-bold">что бы дать админку зайди в firebase console <br /> <span className='2xl:text-red-600'>зайди в раздел Firestore Database найди аккаунт нужны в списке документов нажми add field, поле назови isAdmin и поставь type boolean, со значением true, если неправильно напишешь isAdmin - ничего работаь не будет</span></p>
      </div>
     
      </div>
      <div className="flex flex-col">
        <img src="/images/5.png" alt="christ" className='h-[25vh]'/>
        <img src="/images/6.png" alt="christ" className='h-[25vh]'/>
        <img src="/images/7.png" alt="christ" className='h-[25vh]'/>
        <img src="/images/8.png" alt="christ" className='h-[25vh]'/>
        

      </div>
    </div>
    <FooterBOG></FooterBOG>
    </>
  )
}

export default page