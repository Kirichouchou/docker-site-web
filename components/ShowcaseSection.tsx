"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import Reveal from "./Reveal";
import { useLanguage } from "../contexts/LanguageContext";
import { useContactOverlay } from "./ContactOverlayProvider";

type ShowcaseCopy = {
  headlineLineOne?: string;
  headlineLineTwo?: string;
  partnersHighlight?: string;
  ctaLabel?: string;
  projectName?: string;
  projectDescription?: string;
  projectLinkLabel?: string;
  tags?: string[];
  projects?: ShowcaseProject[];
  mediaPlaceholderLabel?: string;
  mediaPlaceholderNote?: string;
};

type ShowcaseProject = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  tags: string[];
  cta?: {
    label: string;
    href: string;
  };
  media: {
    title: string;
    description: string;
    background: string;
    highlights?: string[];
  };
};

const CARD_ASPECT_RATIO = "891 / 435"; // ~20% shorter height
const CAROUSEL_ASPECT_RATIO = "1.9 / 1"; // tighter wrapper, ~75% less dead space above/below cards
const CARD_TRANSITION_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const CARD_TRANSITION = `transform 0.6s ${CARD_TRANSITION_EASING}, opacity 0.6s ${CARD_TRANSITION_EASING}`;
const CARD_BACKGROUND = "linear-gradient(150deg, rgba(230,233,244,0.78) 0%, rgba(244,247,253,0.92) 52%, rgba(255,255,255,0.98) 100%)";
const NEXT_OVERLAY_GRADIENT =
  "linear-gradient(180deg, rgba(188,194,206,0.9) 0%, rgba(203,208,220,0.72) 20%, rgba(212,218,229,0.44) 32%, rgba(220,225,235,0.24) 42%, rgba(225,230,239,0.1) 50%, rgba(226,231,240,0.04) 56%, rgba(226,231,240,0) 60%, rgba(226,231,240,0) 100%)";
const PREV_OVERLAY_GRADIENT =
  "linear-gradient(0deg, rgba(188,194,206,0.9) 0%, rgba(203,208,220,0.72) 20%, rgba(212,218,229,0.44) 32%, rgba(220,225,235,0.24) 42%, rgba(225,230,239,0.1) 50%, rgba(226,231,240,0.04) 56%, rgba(226,231,240,0) 60%, rgba(226,231,240,0) 100%)";
const NEXT_MASK =
  "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 34%, rgba(0,0,0,0.55) 46%, rgba(0,0,0,0.25) 54%, rgba(0,0,0,0) 60%, rgba(0,0,0,0) 100%)";
const PREV_MASK =
  "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 34%, rgba(0,0,0,0.55) 46%, rgba(0,0,0,0.25) 54%, rgba(0,0,0,0) 60%, rgba(0,0,0,0) 100%)";
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
const ARROW_BUTTON_SIZE_PX = 48;
const ARROW_STACK_GAP_PX = 4;
const ARROW_STACK_HEIGHT_PX = ARROW_BUTTON_SIZE_PX * 2 + ARROW_STACK_GAP_PX;
const INACTIVE_CARD_SCALE = 0.985; // bring overlays closer to the active card
export default function ShowcaseSection() {
  const { dictionary } = useLanguage();
  const copy = (dictionary?.showcase ?? {}) as ShowcaseCopy;

  const fallbackHeadlineLines = [
    "Des expériences digitales",
    "façonnées pour convertir.",
  ] as const;
  const fallbackHeadlineCombined = `${fallbackHeadlineLines[0]} ${fallbackHeadlineLines[1]}`;

  const rawHeadlineLineOne = copy.headlineLineOne?.trim() || undefined;
  const rawHeadlineLineTwo = copy.headlineLineTwo?.trim() || undefined;

  let headlineLineOne = rawHeadlineLineOne ?? fallbackHeadlineLines[0];
  let headlineLineTwo = rawHeadlineLineTwo ?? fallbackHeadlineLines[1];

  if (!rawHeadlineLineTwo && rawHeadlineLineOne) {
    const normalizedLineOne = rawHeadlineLineOne.replace(/\s+/g, " ");
    if (normalizedLineOne === fallbackHeadlineCombined) {
      headlineLineOne = fallbackHeadlineLines[0];
      headlineLineTwo = fallbackHeadlineLines[1];
    } else {
      headlineLineOne = rawHeadlineLineOne;
      headlineLineTwo = fallbackHeadlineLines[1];
    }
  }
  const partnersHighlight = copy.partnersHighlight?.trim() ?? "";
  const hasPartnersHighlight = partnersHighlight.length > 0;
  const ctaLabel = copy.ctaLabel ?? "Reserver un appel";
  const projectName = copy.projectName ?? "Peakfast";
  const projectDescription =
    copy.projectDescription ??
    "Peakfast est un service logistique qui facilite la vie des e-commercants en leur permettant de scaler sans contrainte. Notre mission ? Creer un design a la hauteur de leur promesse et offrir une valeur percue si forte qu'elle les distingue de leurs concurrents.";
  const projectLinkLabel = copy.projectLinkLabel ?? "Voir la version live";
  const tags = copy.tags ?? ["Design", "Landing page", "Full animations", "Service logistique"];
  const { openBooking } = useContactOverlay();
  const fallbackProjects = useMemo<ShowcaseProject[]>(() => {
    const peakfastProject: ShowcaseProject = {
      id: "peakfast",
      name: projectName,
      subtitle: "Logistique acceleree pour e-commercants",
      description: projectDescription,
      testimonial: {
        quote:
          "Avec cette nouvelle experience digitale, nos prospects comprennent en quelques secondes comment Peakfast supprime les frictions logistiques. Les demandes de demo ont litteralement double.",
        author: "Karim Soltani",
        role: "CEO, Peakfast",
      },
      tags,
      cta: {
        label: projectLinkLabel,
        href: "#",
      },
      media: {
        title: "Peakfast V2",
        description: "Tableau de bord logistique en temps reel",
        background: "linear-gradient(135deg, #081733 0%, #0E3A66 46%, #041225 100%)",
        highlights: [
          "Suivi des expeditions minute par minute",
          "Animations micro-interactions personnalisees",
          "Parcours mobile optimise",
        ],
      },
    };

    const novaPulseProject: ShowcaseProject = {
      id: "nova-pulse",
      name: "NovaPulse",
      subtitle: "Accompagnement acquisition pour SaaS B2B",
      description:
        "NovaPulse devait expliquer une offre complexe sans perdre l'attention. Nous avons construit une narration visuelle qui guide l'utilisateur dans leur methode, et revele les resultats des campagnes des la premiere seconde.",
      testimonial: {
        quote:
          "Le message est d'une clarte remarquable. En deux semaines, nous avons gagne trois deals strategiques grace a la nouvelle page. Les prospects arrivent deja convaincus.",
        author: "Meline Dupre",
        role: "Head of Growth, NovaPulse",
      },
      tags: ["Copywriting", "Motion UI", "Data storytelling"],
      cta: {
        label: projectLinkLabel,
        href: "#",
      },
      media: {
        title: "NovaPulse Stories",
        description: "Sequences interactives et analytics",
        background: "linear-gradient(130deg, #140E2A 5%, #2D1B87 55%, #4313C5 100%)",
        highlights: [
          "Storytelling interactif",
          "Systeme de composants sur mesure",
          "Integration analytics en direct",
        ],
      },
    };

    return [peakfastProject, novaPulseProject];
  }, [projectDescription, projectLinkLabel, projectName, tags]);

  const projects = useMemo<ShowcaseProject[]>(() => {
    if (Array.isArray(copy.projects) && copy.projects.length > 0) {
      return copy.projects;
    }
    return fallbackProjects;
  }, [copy.projects, fallbackProjects]);

  const [activeIndex, setActiveIndex] = useState(0);
  const projectCount = projects.length;
  const isCarouselInteractive = projectCount > 1;
  const safeIndex = projectCount > 0 ? Math.min(activeIndex, projectCount - 1) : 0;
  const activeProject = projects[safeIndex] ?? projects[0];
  const activeSlideRef = useRef<HTMLDivElement | null>(null);
  const [carouselHeight, setCarouselHeight] = useState<number | null>(null);
  const arrowVerticalOffset =
    carouselHeight != null
      ? Math.max(0, Math.min(carouselHeight * 0.42, Math.max(0, carouselHeight - 96)))
      : null;
  const carouselVerticalShift =
    carouselHeight != null && arrowVerticalOffset != null
      ? Math.max(0, arrowVerticalOffset + ARROW_STACK_HEIGHT_PX / 2 - carouselHeight / 2)
      : 0;
  const layoutClasses = isCarouselInteractive
    ? "flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,1.2fr)_auto_minmax(0,1fr)] lg:items-stretch lg:gap-12"
    : "flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-stretch lg:gap-12";

  useEffect(() => {
    if (projectCount > 0 && activeIndex >= projectCount) {
      setActiveIndex(0);
    }
  }, [activeIndex, projectCount]);

  const handleNext = () => {
    if (!isCarouselInteractive) return;
    setActiveIndex((prev) => (prev + 1) % projectCount);
  };

  const handlePrev = () => {
    if (!isCarouselInteractive) return;
    setActiveIndex((prev) => (prev - 1 + projectCount) % projectCount);
  };

  useIsomorphicLayoutEffect(() => {
    if (!isCarouselInteractive) {
      setCarouselHeight(null);
      activeSlideRef.current = null;
      return;
    }

    if (typeof window === "undefined") return;

    const element = activeSlideRef.current;
    if (!element) return;

    const updateHeight = () => {
      setCarouselHeight(element.getBoundingClientRect().height);
    };

    updateHeight();

    window.addEventListener("resize", updateHeight);

    let observer: ResizeObserver | undefined;

    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(updateHeight);
      observer.observe(element);
    }

    return () => {
      window.removeEventListener("resize", updateHeight);
      observer?.disconnect();
    };
  }, [isCarouselInteractive, safeIndex]);

  return (
    <section className="bg-[#F2F5FC] px-4 pt-8 pb-10 sm:pt-12 sm:pb-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <Reveal className="max-w-2xl space-y-6">
            <h2 className="font-black leading-[1.05] text-[clamp(2.4rem,5.25vw,3.45rem)] text-[#111111]">
              <span className="block">{headlineLineOne}</span>
              <span className="block text-[#0A304E]">{headlineLineTwo}</span>
            </h2>
            <button
              type="button"
              onClick={openBooking}
              className="inline-flex items-center gap-2 rounded-full bg-[#0A304E] px-7 py-3 text-sm font-semibold text-white shadow-[0_24px_65px_-32px_rgba(10,48,78,0.55)] transition hover:translate-y-[-2px] hover:bg-[#0C3B5F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A304E]"
            >
            {ctaLabel}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </Reveal>
          {hasPartnersHighlight && (
            <Reveal delay={160} className="max-w-sm self-start text-sm font-medium text-[#0A304E]">
              <p className="text-right text-base sm:text-lg text-[#111111]/70">{partnersHighlight}</p>
            </Reveal>
          )}
        </div>
        <Reveal delay={260} className="mt-[55px] sm:mt-[66px]">
          <div className={layoutClasses}>
            <div className="flex flex-col gap-1.5 sm:gap-2 lg:items-start lg:place-self-start">
              <div
                className="group relative mx-auto w-full max-w-[556px] overflow-visible lg:mx-0"
                style={{
                  aspectRatio: CAROUSEL_ASPECT_RATIO,
                  marginTop: carouselVerticalShift > 0 ? `${carouselVerticalShift}px` : undefined,
                }}
              >
                <div
                  className="flex h-full w-full flex-col transition-transform duration-500 ease-out"
                  style={{ transform: `translateY(-${safeIndex * 100}%)` }}
                >
                  {projects.map((project, index) => {
                    const isActive = index === safeIndex;
                    const cardScale = isActive ? 1 : INACTIVE_CARD_SCALE;
                    const cardOpacity = 1;
                    const overlayOpacity = isActive ? 0 : 1;
                    const prevIndex = (safeIndex - 1 + projectCount) % projectCount;
                    const nextIndex = (safeIndex + 1) % projectCount;
                    const isPrevSlide = !isActive && index === prevIndex;
                    const isNextSlide = !isActive && index === nextIndex;
                    const slideNumber = index + 1;

                    let overlayOrientation: "above" | "below" | null = null;
                    if (!isActive) {
                      overlayOrientation = index < safeIndex ? "above" : "below";
                    }

                    const overlayBackground =
                      overlayOrientation === "above"
                        ? PREV_OVERLAY_GRADIENT
                        : overlayOrientation === "below"
                          ? NEXT_OVERLAY_GRADIENT
                          : "transparent";
                    const cardStyle: CSSProperties = {
                      aspectRatio: CARD_ASPECT_RATIO,
                      transform: `scale(${cardScale})`,
                      opacity: cardOpacity,
                      transition: CARD_TRANSITION,
                      transformOrigin: "center",
                    };

                    if (overlayOrientation) {
                      const maskGradient = overlayOrientation === "above" ? PREV_MASK : NEXT_MASK;
                      cardStyle.maskImage = maskGradient;
                      cardStyle.WebkitMaskImage = maskGradient;
                    }

                    return (
                      <div
                        key={project.id}
                        ref={(node) => {
                          if (isActive) {
                            activeSlideRef.current = node;
                          }
                        }}
                        className="portfolio-slide flex h-full w-full max-w-[556px] flex-shrink-0 flex-col items-start"
                        data-slide-index={slideNumber}
                        aria-hidden={!isActive}
                      >
                        <div className="portfolio_card relative w-full max-w-[556px]" style={cardStyle}>
                          <div className="absolute inset-0 overflow-hidden rounded-[32px]" aria-hidden="true">
                            <div
                              className="absolute inset-0 rounded-[32px] transition-opacity duration-500 ease-out"
                              style={{ opacity: overlayOpacity, background: overlayBackground }}
                            />
                            {overlayOrientation === "above" && (
                              <div
                                className="absolute bottom-2 left-1/2 h-[18px] w-[86%] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#B8C0D0]/45 via-[#D5DBE6]/16 to-transparent blur-xl transition-opacity duration-500 ease-out"
                                style={{ opacity: overlayOpacity }}
                              />
                            )}
                            {/* Highlight below intentionally omitted to avoid extra light band */}
                          </div>
                          <div
                            className="relative z-10 flex h-full flex-col justify-between gap-6 rounded-[32px] border bg-white/90 px-8 pt-8 pb-2 text-[#1F2937] shadow-[0_20px_55px_-35px_rgba(15,23,42,0.45)]"
                            style={{
                              background: CARD_BACKGROUND,
                              borderColor: "rgba(255, 255, 255, 0.7)",
                              opacity: isActive ? 1 : 0,
                              transition: "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                            }}
                          >
                            <div className="space-y-6">
                              <div className="space-y-3">
                                <span
                                  className="text-xs font-semibold uppercase tracking-[0.38em] text-transparent select-none"
                                  aria-hidden="true"
                                >
                                  {project.media.title}
                                </span>
                                <h3
                                  className="text-2xl font-semibold leading-tight text-transparent select-none"
                                  aria-hidden="true"
                                >
                                  {project.media.description}
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {isCarouselInteractive && (
                  <div className="absolute top-1/2 right-6 -translate-y-1/2 flex flex-col gap-1 lg:hidden">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-[#0A304E] shadow-[0_10px_30px_-18px_rgba(15,23,42,0.65)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A304E]"
                    >
                      <ChevronUp className="h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">Projet precedent</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-[#0A304E] shadow-[0_10px_30px_-18px_rgba(15,23,42,0.65)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A304E]"
                    >
                      <ChevronDown className="h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">Projet suivant</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            {isCarouselInteractive && (
              <div
                className="hidden flex-col items-center gap-1 lg:flex lg:self-start lg:justify-start"
                style={
                  carouselHeight
                    ? {
                        height: `${carouselHeight}px`,
                        paddingTop: arrowVerticalOffset != null ? `${arrowVerticalOffset}px` : undefined,
                      }
                    : undefined
                }
              >
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#0A304E] shadow-[0_12px_36px_-22px_rgba(15,23,42,0.65)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A304E]"
                >
                  <ChevronUp className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Projet precedent</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#0A304E] shadow-[0_12px_36px_-22px_rgba(15,23,42,0.65)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A304E]"
                >
                  <ChevronDown className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Projet suivant</span>
                </button>
              </div>
            )}

            {activeProject && (
              <div className="flex flex-col gap-6 lg:pt-2">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A304E]/10 text-[#0A304E]">
                    <span className="text-lg font-black" aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-semibold text-[#111111]">{activeProject.name}</h3>
                    <p className="text-sm font-medium text-[#0A304E]/80">{activeProject.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[#374151]">{activeProject.description}</p>
                {activeProject.cta && (
                  <a
                    href={activeProject.cta.href}
                    className="inline-flex items-center gap-2 self-start text-sm font-semibold text-[#0A304E] transition hover:text-[#0A304E]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A304E]"
                  >
                    {activeProject.cta.label}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeProject.tags.map((label) => (
                    <span
                      key={label}
                      className="rounded-full border border-black/10 px-4 py-1 text-xs font-semibold text-[#0A304E]/80"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}







