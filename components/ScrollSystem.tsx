"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSystem() {
  useEffect(() => {
    // 1) Scroll fluide
    const lenis = new Lenis({ lerp: 0.13 as any });

    // 2) Boucle de rendu
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // 3) Synchroniser Lenis et ScrollTrigger
    const onLenisScroll = () => ScrollTrigger.update();
    // @ts-ignore lenis event api signature
    lenis.on("scroll", onLenisScroll);

    // 4) Nettoyage
    return () => {
      // @ts-ignore
      lenis.off?.("scroll", onLenisScroll);
      lenis.destroy();
      cancelAnimationFrame(rafId);
      // Ne pas tuer tous les ScrollTriggers globaux si d'autres pages en ont
      // ScrollTrigger.killAll(); // à éviter globalement
      ScrollTrigger.refresh();
    };
  }, []);

  return null;
}

