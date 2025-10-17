"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
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
const CARD_TRANSITION_DURATION_S = 0.8;
const CARD_TRANSITION = `transform ${CARD_TRANSITION_DURATION_S}s ${CARD_TRANSITION_EASING}, opacity ${CARD_TRANSITION_DURATION_S}s ${CARD_TRANSITION_EASING}`;
const CARD_BACKGROUND = "linear-gradient(150deg, rgba(230,233,244,0.78) 0%, rgba(244,247,253,0.92) 52%, rgba(255,255,255,0.98) 100%)";
const NEXT_OVERLAY_GRADIENT =
  "linear-gradient(180deg, rgba(188,194,206,0.78) 0%, rgba(203,208,220,0.62) 13%, rgba(212,218,229,0.46) 24%, rgba(220,225,235,0.3) 35%, rgba(225,230,239,0.16) 45%, rgba(226,231,240,0.08) 55%, rgba(226,231,240,0) 70%)";
const PREV_OVERLAY_GRADIENT =
  "linear-gradient(0deg, rgba(188,194,206,0.78) 0%, rgba(203,208,220,0.62) 13%, rgba(212,218,229,0.46) 24%, rgba(220,225,235,0.3) 35%, rgba(225,230,239,0.16) 45%, rgba(226,231,240,0.08) 55%, rgba(226,231,240,0) 70%)";
const NEXT_MASK =
  "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 24%, rgba(0,0,0,0.45) 52%, rgba(0,0,0,0.12) 74%, rgba(0,0,0,0) 100%)";
const PREV_MASK =
  "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 24%, rgba(0,0,0,0.45) 52%, rgba(0,0,0,0.12) 74%, rgba(0,0,0,0) 100%)";
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
const ARROW_BUTTON_SIZE_PX = 48;
const ARROW_STACK_GAP_PX = 4;
const ARROW_STACK_HEIGHT_PX = ARROW_BUTTON_SIZE_PX * 2 + ARROW_STACK_GAP_PX;
const INACTIVE_CARD_SCALE = 1;
const INACTIVE_CARD_Y_OFFSET_PX = 0;
const ACTIVE_CARD_SCALE_X = 1.1662;
const ACTIVE_CARD_SCALE_Y = 1.3519;
const OVERLAY_HORIZONTAL_SHIFT_PERCENT = 0;
const INACTIVE_CARD_X_OFFSET_PERCENT = ((ACTIVE_CARD_SCALE_X - 1) / 2) * 100;
const DETAIL_EXIT_DURATION_MS = 360;
const DETAIL_EXIT_STAGGER_MS = 60;
const DETAIL_EXIT_LINE_STAGGER_MS = 38;
const DETAIL_ENTRY_DURATION_MS = 520;
const DETAIL_ENTRY_STAGGER_MS = 80;
const DETAIL_ENTRY_LINE_STAGGER_MS = 110;
const DETAIL_ENTRY_BASE_DELAY_MS = 100;
const DETAIL_PLACEHOLDER_FADE_DELAY_MS = 180;
const DETAIL_TIMELINE_EASE = "power3.out";

export default function ShowcaseSection() {
  const { dictionary } = useLanguage();
  const copy = (dictionary?.showcase ?? {}) as ShowcaseCopy;
  const testimonialsEnabled = false; // toggle to re-enable testimonial bubbles later

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
  const [displayedProject, setDisplayedProject] = useState<ShowcaseProject | null>(activeProject ?? null);
  const detailCardRef = useRef<HTMLDivElement | null>(null);
  const activeSlideRef = useRef<HTMLDivElement | null>(null);
  const cardContentRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const previousActiveCardIdRef = useRef<string | null>(projects[safeIndex]?.id ?? null);
  // PATCH: on mesure la hauteur sur un wrapper non-transformé pour éviter les "sauts"
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const placeholderRef = useRef<HTMLDivElement | null>(null);
  const pendingEntryProjectRef = useRef<ShowcaseProject | null>(null);
  const exitTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const entryTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const entryDelayTimeoutRef = useRef<number | null>(null);
  const [carouselHeight, setCarouselHeight] = useState<number | null>(null);
  const arrowVerticalOffset =
    carouselHeight != null
      ? Math.max(0, Math.min(carouselHeight * 0.42, Math.max(0, carouselHeight - 96)))
      : null;
  const carouselVerticalShift =
    carouselHeight != null && arrowVerticalOffset != null
      ? Math.max(0, arrowVerticalOffset + ARROW_STACK_HEIGHT_PX / 2 - carouselHeight / 2) + 100
      : 100;
  const layoutClasses = isCarouselInteractive
    ? "flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,1.2fr)_auto_minmax(0,1fr)] lg:items-stretch lg:gap-12"
    : "flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-stretch lg:gap-12";
  const detailProject = displayedProject ?? activeProject;
  const detailDescriptionLines = useMemo(() => {
    if (!detailProject?.description) return [];
    const trimmed = detailProject.description.trim();
    if (!trimmed) return [];
    const segments = trimmed.split(/(?<=[\.!?])\s+(?=[\p{Lu}0-9])/u);
    return segments.length ? segments : [trimmed];
  }, [detailProject?.description]);
  useEffect(() => {
    if (projectCount > 0 && activeIndex >= projectCount) {
      setActiveIndex(0);
    }
  }, [activeIndex, projectCount]);

  useEffect(() => {
    if (placeholderRef.current) {
      gsap.set(placeholderRef.current, { opacity: 0 });
    }
  }, []);

  useEffect(() => {
    return () => {
      exitTimelineRef.current?.kill();
      entryTimelineRef.current?.kill();
      if (entryDelayTimeoutRef.current !== null) {
        window.clearTimeout(entryDelayTimeoutRef.current);
      }
    };
  }, []);

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

    // PATCH: mesure stable sur le wrapper (sans scale/transform)
    const element = wrapperRef.current;
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
    // PATCH: ne pas recalculer à chaque changement de slide
  }, [isCarouselInteractive]);

  useEffect(() => {
    const cardMap = cardContentRefs.current;
    const currentProject = projects[safeIndex];
    const currentId = currentProject?.id ?? null;
    const previousId = previousActiveCardIdRef.current;

    if (!currentId) {
      previousActiveCardIdRef.current = null;
      return;
    }

    const enteringNode = cardMap.get(currentId) ?? null;
    const leavingNode =
      previousId && previousId !== currentId ? cardMap.get(previousId) ?? null : null;

    if (enteringNode) {
      enteringNode.classList.remove("portfolio_card-content--leaving");
      enteringNode.classList.add("portfolio_card-content--entering");
      enteringNode.addEventListener(
        "animationend",
        () => {
          enteringNode.classList.remove("portfolio_card-content--entering");
        },
        { once: true },
      );
    }

    if (leavingNode) {
      leavingNode.classList.remove("portfolio_card-content--entering");
      leavingNode.classList.add("portfolio_card-content--leaving");
      leavingNode.addEventListener(
        "animationend",
        () => {
          leavingNode.classList.remove("portfolio_card-content--leaving");
        },
        { once: true },
      );
    }

    previousActiveCardIdRef.current = currentId;
  }, [projects, safeIndex]);

useEffect(() => {
  if (!activeProject) return;

  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!displayedProject || reduceMotion) {
    exitTimelineRef.current?.kill();
    entryTimelineRef.current?.kill();
    if (entryDelayTimeoutRef.current !== null) {
      window.clearTimeout(entryDelayTimeoutRef.current);
      entryDelayTimeoutRef.current = null;
    }
    pendingEntryProjectRef.current = null;
    setDisplayedProject(activeProject);
    if (placeholderRef.current) {
      gsap.set(placeholderRef.current, { opacity: 0 });
    }
    return;
  }

  if (activeProject.id === displayedProject.id) return;

  const card = detailCardRef.current;
  const placeholder = placeholderRef.current;

  if (!card) {
    setDisplayedProject(activeProject);
    if (placeholder) {
      gsap.set(placeholder, { opacity: 0 });
    }
    return;
  }

  exitTimelineRef.current?.kill();
  entryTimelineRef.current?.kill();
  if (entryDelayTimeoutRef.current !== null) {
    window.clearTimeout(entryDelayTimeoutRef.current);
    entryDelayTimeoutRef.current = null;
  }

  pendingEntryProjectRef.current = null;
  if (placeholder) {
    gsap.set(placeholder, { opacity: 0 });
  }

  const itemEls = Array.from(card.querySelectorAll<HTMLElement>("[data-animate-item]"));
  const lineEls = Array.from(card.querySelectorAll<HTMLElement>("[data-animate-line]"));

  if (itemEls.length === 0 && lineEls.length === 0) {
    if (placeholder) {
      gsap.set(placeholder, { opacity: 1 });
    }
    pendingEntryProjectRef.current = activeProject;
    entryDelayTimeoutRef.current = window.setTimeout(() => {
      setDisplayedProject(activeProject);
      entryDelayTimeoutRef.current = null;
    }, DETAIL_PLACEHOLDER_FADE_DELAY_MS / 2);
    return;
  }

  const exitTimeline = gsap.timeline({
    defaults: {
      ease: DETAIL_TIMELINE_EASE,
    },
    onComplete: () => {
      if (placeholder) {
        gsap.to(placeholder, { opacity: 1, duration: 0.18, ease: "power1.out" });
      }
      pendingEntryProjectRef.current = activeProject;
      entryDelayTimeoutRef.current = window.setTimeout(() => {
        setDisplayedProject(activeProject);
        entryDelayTimeoutRef.current = null;
      }, DETAIL_PLACEHOLDER_FADE_DELAY_MS / 2);
      if (exitTimelineRef.current === exitTimeline) {
        exitTimelineRef.current = null;
      }
    },
  });

  if (itemEls.length > 0) {
    exitTimeline.to(itemEls, {
      opacity: 0,
      y: -28,
      filter: "blur(6px)",
      duration: DETAIL_EXIT_DURATION_MS / 1000,
      stagger: { each: DETAIL_EXIT_STAGGER_MS / 1000 },
    }, 0);
  }

  if (lineEls.length > 0) {
    exitTimeline.to(lineEls, {
      opacity: 0,
      y: -24,
      filter: "blur(5px)",
      duration: (DETAIL_EXIT_DURATION_MS - 40) / 1000,
      stagger: { each: DETAIL_EXIT_LINE_STAGGER_MS / 1000 },
    }, Math.max(0, (DETAIL_EXIT_DURATION_MS - 240) / 1000));
  }

  exitTimelineRef.current = exitTimeline;

  return () => {
    exitTimeline.kill();
    if (exitTimelineRef.current === exitTimeline) {
      exitTimelineRef.current = null;
    }
  };
}, [activeProject?.id, displayedProject?.id]);

useLayoutEffect(() => {
  const nextProject = pendingEntryProjectRef.current;
  if (!nextProject) return;
  if (!displayedProject || displayedProject.id !== nextProject.id) return;

  pendingEntryProjectRef.current = null;

  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    if (placeholderRef.current) {
      gsap.set(placeholderRef.current, { opacity: 0 });
    }
    return;
  }

  const card = detailCardRef.current;
  const placeholder = placeholderRef.current;

  if (!card) {
    if (placeholder) {
      gsap.set(placeholder, { opacity: 0 });
    }
    return;
  }

  const itemEls = Array.from(card.querySelectorAll<HTMLElement>("[data-animate-item]"));
  const lineEls = Array.from(card.querySelectorAll<HTMLElement>("[data-animate-line]"));

  gsap.set(itemEls, { opacity: 0, y: 32, filter: "blur(10px)" });
  gsap.set(lineEls, { opacity: 0, y: 36, filter: "blur(8px)" });
  if (placeholder) {
    gsap.set(placeholder, { opacity: 1 });
  }

  entryTimelineRef.current?.kill();
  if (entryDelayTimeoutRef.current !== null) {
    window.clearTimeout(entryDelayTimeoutRef.current);
    entryDelayTimeoutRef.current = null;
  }

  const entryTimeline = gsap.timeline({
    defaults: {
      ease: DETAIL_TIMELINE_EASE,
    },
  });

  if (placeholder) {
    entryTimeline.to(
      placeholder,
      {
        opacity: 0,
        duration: 0.28,
        ease: "power1.out",
      },
      Math.max(0, (DETAIL_ENTRY_BASE_DELAY_MS - 60) / 1000),
    );
  }

  if (itemEls.length > 0) {
    entryTimeline.to(itemEls, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: DETAIL_ENTRY_DURATION_MS / 1000,
      stagger: { each: DETAIL_ENTRY_STAGGER_MS / 1000 },
    }, DETAIL_ENTRY_BASE_DELAY_MS / 1000);
  }

  if (lineEls.length > 0) {
    entryTimeline.to(lineEls, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: (DETAIL_ENTRY_DURATION_MS - 40) / 1000,
      stagger: { each: DETAIL_ENTRY_LINE_STAGGER_MS / 1000 },
    }, DETAIL_ENTRY_BASE_DELAY_MS / 1000 + 0.12);
  }

  entryTimeline.eventCallback("onComplete", () => {
    if (placeholder) {
      gsap.set(placeholder, { opacity: 0 });
    }
    if (entryTimelineRef.current === entryTimeline) {
      entryTimelineRef.current = null;
    }
  });

  entryTimelineRef.current = entryTimeline;

  if (entryTimeline.totalDuration() === 0 && placeholder) {
    gsap.set(placeholder, { opacity: 0 });
  }

  return () => {
    entryTimeline.kill();
    if (entryTimelineRef.current === entryTimeline) {
      entryTimelineRef.current = null;
    }
    if (placeholder) {
      gsap.set(placeholder, { opacity: 0 });
    }
  };
}, [displayedProject?.id]);

  return (
    <section className="bg-[#F2F5FC] px-4 pt-2 pb-12 sm:pt-6 sm:pb-16">
      <div className="mx-auto flex w-full max-w-[1145px] flex-col gap-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <Reveal className="relative z-10 mt-[clamp(2.5rem,7vw,6rem)] max-w-2xl space-y-6">
            <h2 className="font-black leading-[1.05] text-[clamp(2.4rem,5.25vw,3.45rem)] text-[#111111]">
              <span className="block">{headlineLineOne}</span>
              <span className="block text-[#0A304E]">{headlineLineTwo}</span>
            </h2>
            <button
              type="button"
              onClick={openBooking}
              className="inline-flex items-center gap-2 rounded-full bg-[#0A304E] px-7 py-3 text-sm font-semibold text-white shadow-[0_20px_55px_-32px_rgba(10,48,78,0.55)] transition hover:translate-y-[-2px] hover:bg-[#0C3B5F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A304E]"
            >
            {ctaLabel}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </Reveal>
          {hasPartnersHighlight && (
            <Reveal delay={160} className="relative z-0 max-w-sm self-start text-sm font-medium text-[#0A304E]">
              <p className="text-right text-base sm:text-lg text-[#111111]/70">{partnersHighlight}</p>
            </Reveal>
          )}
        </div>
        <Reveal delay={260} className="mt-[5%]">
          <div className={layoutClasses}>
            <div className="flex flex-col gap-1.5 sm:gap-2 lg:items-start lg:place-self-start">
              <div
                ref={wrapperRef} // PATCH: wrapper de mesure non-transformé
                className="group relative mx-auto w-full max-w-[556px] overflow-visible lg:mx-0 lg:max-w-[620px]"
                style={{
                  aspectRatio: CAROUSEL_ASPECT_RATIO,
                  marginTop: carouselVerticalShift > 0 ? `${carouselVerticalShift}px` : undefined,
                }}
              >
                <div
                  className="flex h-full w-full flex-col transition-transform duration-500 ease-out"
                  style={{ transform: `translateY(calc(-${safeIndex * 100}% + 15%))` }}
                >
                  {projects.map((project, index) => {
                    const isActive = index === safeIndex;
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
                    // PATCH: rapprochement visuel via un léger translateY des inactives
                    const translateY =
                      isPrevSlide ? INACTIVE_CARD_Y_OFFSET_PX
                      : isNextSlide ? -INACTIVE_CARD_Y_OFFSET_PX
                      : 0;

                    const cardStyle: CSSProperties = {
                      aspectRatio: CARD_ASPECT_RATIO,
                      transform: isActive
                        ? `scaleX(${ACTIVE_CARD_SCALE_X}) scaleY(${ACTIVE_CARD_SCALE_Y})`
                        : `translateX(${INACTIVE_CARD_X_OFFSET_PERCENT}%) translateY(${translateY}px) scale(${INACTIVE_CARD_SCALE})`,
                      opacity: cardOpacity,
                      pointerEvents: isActive ? "auto" : "none",
                      transition: CARD_TRANSITION,
                      transformOrigin: isActive ? "left center" : "center",
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
                        className="portfolio-slide flex h-full w-full max-w-[556px] flex-shrink-0 flex-col items-start lg:max-w-[620px]"
                        data-slide-index={slideNumber}
                        aria-hidden={!isActive}
                        style={{ pointerEvents: isActive ? "auto" : "none" }}
                      >
                        <div className="portfolio_card relative w-full max-w-[556px] lg:max-w-[620px]" style={cardStyle}>
                          <div
                            className="absolute inset-0 overflow-hidden rounded-[32px]"
                            aria-hidden="true"
                            style={{ pointerEvents: "none" }}
                          >
                            <div
                              className="absolute inset-0 rounded-[32px] transition-opacity duration-500 ease-out"
                              style={{
                                opacity: overlayOpacity,
                                background: overlayBackground,
                                transform:
                                  OVERLAY_HORIZONTAL_SHIFT_PERCENT !== 0
                                    ? `translateX(${OVERLAY_HORIZONTAL_SHIFT_PERCENT}%)`
                                    : undefined,
                                transformOrigin: "center",
                              }}
                            />
                            {/* Soft halos intentionally removed to minimise gap perception */}
                            {/* Highlight below intentionally omitted to avoid extra light band */}
                          </div>
                          <div
                            ref={(node) => {
                              if (node) {
                                cardContentRefs.current.set(project.id, node);
                              } else {
                                cardContentRefs.current.delete(project.id);
                              }
                            }}
                            className="portfolio_card-content relative z-10 flex h-full flex-col justify-between gap-6 rounded-[32px] border bg-white/90 px-8 pt-8 pb-2 text-[#1F2937] shadow-[0_17px_47px_-35px_rgba(15,23,42,0.45)]"
                            style={{
                              background: CARD_BACKGROUND,
                              borderColor: "rgba(255, 255, 255, 0.7)",
                              opacity: isActive ? 1 : 0,
                              transition:
                                `opacity ${CARD_TRANSITION_DURATION_S}s ${CARD_TRANSITION_EASING}, transform 0.85s ${CARD_TRANSITION_EASING}, filter 0.85s ${CARD_TRANSITION_EASING}`,
                              willChange: "transform, opacity, filter",
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
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-[#0A304E] shadow-[0_8px_26px_-18px_rgba(15,23,42,0.65)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A304E]"
                    >
                      <ChevronUp className="h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">Projet precedent</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-[#0A304E] shadow-[0_8px_26px_-18px_rgba(15,23,42,0.65)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A304E]"
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
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#0A304E] shadow-[0_10px_31px_-22px_rgba(15,23,42,0.65)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A304E]"
                >
                  <ChevronUp className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Projet precedent</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#0A304E] shadow-[0_10px_31px_-22px_rgba(15,23,42,0.65)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A304E]"
                >
                  <ChevronDown className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Projet suivant</span>
                </button>
              </div>
            )}

            {detailProject && (
              <div className="detail-card-stack relative" style={{ marginTop: '80px' }}>
                <div
                  ref={placeholderRef}
                  className="detail-placeholder pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/55 via-white/35 to-white/0 backdrop-blur-[6px]"
                  aria-hidden="true"
                  style={{ opacity: 0 }}
                />
                <div
                  ref={detailCardRef}
                  className="detail-card relative z-10 flex flex-col gap-6 lg:pt-2"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A304E]/10 text-[#0A304E]"
                      data-animate-item
                      data-animate-order="0"
                    >
                      <span className="text-lg font-black" aria-hidden="true" />
                    </div>
                    <div className="space-y-1">
                      <h3
                        data-animate-item
                        data-animate-order="1"
                        className="text-2xl font-semibold text-[#111111]"
                      >
                        {detailProject.name}
                      </h3>
                      <p
                        data-animate-item
                        data-animate-order="2"
                        className="text-sm font-medium text-[#0A304E]/80"
                      >
                        {detailProject.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-[6px] text-sm leading-relaxed text-[#374151]">
                    {detailDescriptionLines.map((line, idx) => (
                      <span
                        key={`desc-line-${idx}`}
                        data-animate-line
                        data-animate-line-order={String(idx)}
                        className="block"
                      >
                        {line}
                      </span>
                    ))}
                  </div>
                  {testimonialsEnabled && detailProject.testimonial && (
                    <figure
                      data-animate-item
                      data-animate-order="4"
                      className="rounded-3xl border border-black/5 bg-white/80 p-5 text-[#0A304E] shadow-[0_15px_37px_-32px_rgba(15,23,42,0.35)] backdrop-blur-[2px]"
                    >
                      <blockquote className="text-sm italic leading-relaxed text-[#0A304E]/90">
                        « {detailProject.testimonial.quote} »
                      </blockquote>
                      <figcaption className="mt-3 flex flex-wrap items-center gap-x-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#0A304E]/70">
                        {detailProject.testimonial.author}
                        <span className="text-[0.7rem] font-medium normal-case tracking-normal text-[#0A304E]/55">
                          {detailProject.testimonial.role}
                        </span>
                      </figcaption>
                    </figure>
                  )}
                  {detailProject.cta && (
                    <a
                      data-animate-item
                      data-animate-order="5"
                      href={detailProject.cta.href}
                      className="inline-flex items-center gap-2 self-start text-sm font-semibold text-[#0A304E] transition hover:text-[#0A304E]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A304E]"
                    >
                      {detailProject.cta.label}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {detailProject.tags.map((label, idx) => (
                      <span
                        key={label}
                        data-animate-line
                        data-animate-line-order={String(detailDescriptionLines.length + idx)}
                        className="rounded-full border border-black/10 px-4 py-1 text-xs font-semibold text-[#0A304E]/80"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}







