"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay, Navigation, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-fade"

export default function Carousel({ images }: { images: string[] }) {
  return (
    <Swiper
      modules={[Pagination, Autoplay, Navigation, EffectFade]}
      pagination={{
        clickable: true,
        bulletClass: "swiper-pagination-bullet !bg-gray-400", // базовые точки
        bulletActiveClass: "swiper-pagination-bullet-active !bg-red-500", // активная точка
      }}
      navigation
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop
      effect="fade"
      speed={700}
      className="shadow-lg "
    >
      {images.map((url, i) => (
        <SwiperSlide key={i}>
          <img
            src={url}
            alt={`carousel-${i}`}
            className="w-full h-[89vh] object-cover "
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
