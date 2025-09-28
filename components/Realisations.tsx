"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Realisations = () => {
  const swiperImagesRef = useRef<any>(null);
  const swiperDetailsRef = useRef<any>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tween = gsap.from(".realisations-container img", {
      scrollTrigger: {
        trigger: ".realisations-container",
        start: "top 80%",
        toggleActions: "play none none reset",
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.1,
    });

    const imagesSwiper = swiperImagesRef.current?.swiper;
    const detailsSwiper = swiperDetailsRef.current?.swiper;
    let offFns: Array<() => void> = [];
    if (imagesSwiper && detailsSwiper) {
      const onImagesChange = () => detailsSwiper.slideTo(imagesSwiper.activeIndex, 0);
      const onDetailsChange = () => imagesSwiper.slideTo(detailsSwiper.activeIndex, 0);
      imagesSwiper.on("slideChange", onImagesChange);
      detailsSwiper.on("slideChange", onDetailsChange);
      offFns = [
        () => imagesSwiper.off("slideChange", onImagesChange),
        () => detailsSwiper.off("slideChange", onDetailsChange),
      ];
    }

    return () => {
      offFns.forEach((fn) => fn());
      tween?.kill();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section className="realisations-container flex gap-4 h-[80vh] overflow-hidden">
      {/* Slider images */}
      <Swiper
        ref={swiperImagesRef}
        modules={[Navigation]}
        direction="vertical"
        slidesPerView="auto"
        centeredSlides
        speed={800}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="flex-1"
      >
        <SwiperSlide>
          <img src="/images/projet1.jpg" alt="Projet 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/projet2.jpg" alt="Projet 2" />
        </SwiperSlide>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </Swiper>

      {/* Slider descriptions */}
      <Swiper
        ref={swiperDetailsRef}
        modules={[Navigation]}
        direction="vertical"
        slidesPerView="auto"
        centeredSlides
        allowTouchMove={false}
        speed={0}
        className="flex-1"
      >
        <SwiperSlide>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Projet 1</h3>
            <p>Description du projet 1…</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Projet 2</h3>
            <p>Description du projet 2…</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Realisations;
