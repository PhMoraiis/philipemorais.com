"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type {
  ClipboardEvent,
  DragEvent,
  MouseEvent,
  PointerEvent,
} from "react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  ViewTransition,
} from "react";
import colorspaceName from "@/assets/colorspace/name.svg";
import jumpieLogo from "@/assets/jumpie/logojumpie.svg";
import jumpieName from "@/assets/jumpie/name.svg";
import oncineName from "@/assets/oncine/name.svg";
import stellarLogo from "@/assets/stellar/logoStellar.svg";
import stellarName from "@/assets/stellar/name.svg";
import { projects } from "@/lib/projects";
import { Reveal } from "./ui/reveal";

type WorksProps = {
  titleRevealDelay?: number;
  cardsRevealDelay?: number;
  revealDuration?: number;
  skipRevealAnimation?: boolean;
};

export const Works = ({
  titleRevealDelay = 0,
  cardsRevealDelay = 0.9,
  revealDuration = 0.95,
  skipRevealAnimation = false,
}: WorksProps) => {
  const LEFT_BLEED = 0;
  const SPRING = 0.018;
  const EDGE_DAMPING = 0.55;
  const FRICTION = 0.92;
  const RUBBER_BAND = 0.55;

  const cards = projects.map((project) => ({
    id: project.slug,
    className: project.textClassName,
    background: project.background,
    ariaLabel: `Work project ${project.title}`,
    href: `/work/${project.slug}`,
  }));

  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const outerWidthRef = useRef(0);
  const minOffsetRef = useRef(0);
  const maxOffsetRef = useRef(LEFT_BLEED);
  const offsetRef = useRef(LEFT_BLEED);
  const animationFrameRef = useRef<number | null>(null);
  const dragStateRef = useRef({
    isDragging: false,
    hasMoved: false,
    startX: 0,
    startOffset: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });

  const [offsetX, setOffsetX] = useState(LEFT_BLEED);
  const [isDragging, setIsDragging] = useState(false);
  const [shouldSkipRevealAnimation] = useState(() => {
    if (skipRevealAnimation) {
      return true;
    }

    if (typeof window === "undefined") {
      return false;
    }

    const shouldSkip = sessionStorage.getItem("skip_home_reveal") === "1";

    if (shouldSkip) {
      sessionStorage.removeItem("skip_home_reveal");
    }

    return shouldSkip;
  });
  const parallaxProgress = Math.max(
    -1,
    Math.min(1, (offsetX - LEFT_BLEED) / 120),
  );
  const parallaxValue = (value: number) =>
    Number((parallaxProgress * value).toFixed(3));

  const parallaxStyle = (x: number, y = 0, rotate = 0) => ({
    transform: `translate3d(${parallaxValue(x)}px, ${parallaxValue(y)}px, 0px) rotate(${parallaxValue(rotate)}deg)`,
  });

  const centeredParallaxStyle = (x: number, y = 0, rotate = 0) => ({
    transform: `translate3d(calc(-50% + ${parallaxValue(x)}px), ${parallaxValue(y)}px, 0px) rotate(${parallaxValue(rotate)}deg)`,
  });

  const cancelAnimation = useCallback(() => {
    if (animationFrameRef.current === null) {
      return;
    }

    cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = null;
  }, []);

  const setOffset = useCallback((value: number) => {
    offsetRef.current = value;
    setOffsetX(value);
  }, []);

  const clampOffset = useCallback((value: number) => {
    const min = minOffsetRef.current;
    const max = maxOffsetRef.current;

    if (value < min) {
      return min;
    }

    if (value > max) {
      return max;
    }

    return value;
  }, []);

  const applyRubberBand = useCallback((value: number) => {
    const min = minOffsetRef.current;
    const max = maxOffsetRef.current;

    if (value >= min && value <= max) {
      return value;
    }

    const dimension = Math.max(1, outerWidthRef.current);
    const anchor = value > max ? max : min;
    const delta = value - anchor;
    const rubberDelta =
      (delta * RUBBER_BAND * dimension) /
      (dimension + RUBBER_BAND * Math.abs(delta));
    return anchor + rubberDelta;
  }, []);

  const startMomentum = useCallback(() => {
    cancelAnimation();

    const step = (time: number) => {
      const state = dragStateRef.current;

      if (state.isDragging) {
        animationFrameRef.current = null;
        return;
      }

      const dt = Math.min(32, Math.max(1, time - state.lastTime));
      state.lastTime = time;

      const min = minOffsetRef.current;
      const max = maxOffsetRef.current;
      const offset = offsetRef.current;
      const clamped = clampOffset(offset);
      const displacement = offset - clamped;

      if (displacement !== 0) {
        state.velocity += -displacement * SPRING * (dt / 16);
        state.velocity *= EDGE_DAMPING ** (dt / 16);
      } else {
        state.velocity *= FRICTION ** (dt / 16);
      }

      const nextOffset = offset + state.velocity * dt;

      // When returning from an overscrolled position, don't allow the spring to
      // cross past the bound and settle "inside" the range.
      if (displacement > 0 && nextOffset <= max) {
        setOffset(max);
        state.velocity = 0;
        animationFrameRef.current = null;
        return;
      }

      if (displacement < 0 && nextOffset >= min) {
        setOffset(min);
        state.velocity = 0;
        animationFrameRef.current = null;
        return;
      }

      setOffset(nextOffset);

      const nextClamped = clampOffset(nextOffset);
      const nextDisplacement = nextOffset - nextClamped;
      const isAtRest =
        Math.abs(state.velocity) < 0.015 && Math.abs(nextDisplacement) < 0.5;

      if (isAtRest) {
        setOffset(nextClamped);
        state.velocity = 0;
        animationFrameRef.current = null;
        return;
      }

      if (nextOffset > max && state.velocity > 0) {
        state.velocity *= 0.92;
      } else if (nextOffset < min && state.velocity < 0) {
        state.velocity *= 0.92;
      }

      animationFrameRef.current = requestAnimationFrame(step);
    };

    dragStateRef.current.lastTime = performance.now();
    animationFrameRef.current = requestAnimationFrame(step);
  }, [cancelAnimation, clampOffset, setOffset]);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;

    if (!outer || !inner) {
      return;
    }

    const syncBounds = () => {
      const maxOffset = LEFT_BLEED;
      const minOffset = Math.min(
        maxOffset,
        maxOffset + outer.clientWidth - inner.scrollWidth,
      );

      maxOffsetRef.current = maxOffset;
      minOffsetRef.current = minOffset;
      outerWidthRef.current = outer.clientWidth;
      setOffset(clampOffset(offsetRef.current));
    };

    syncBounds();

    const observer = new ResizeObserver(syncBounds);
    observer.observe(outer);
    observer.observe(inner);

    return () => {
      observer.disconnect();
      cancelAnimation();
    };
  }, [cancelAnimation, clampOffset, setOffset]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const nextState = dragStateRef.current;
    cancelAnimation();
    outerWidthRef.current = event.currentTarget.clientWidth;
    nextState.hasMoved = false;
    nextState.startX = event.clientX;
    nextState.startOffset = offsetRef.current;
    nextState.lastX = event.clientX;
    nextState.lastTime = performance.now();
    nextState.velocity = 0;

    nextState.isDragging = true;
    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;

    if (!dragState.isDragging) {
      return;
    }

    const dragDistance = event.clientX - dragState.startX;

    const now = performance.now();
    const dt = Math.max(1, now - dragState.lastTime);
    const dx = event.clientX - dragState.lastX;
    const instantVelocity = dx / dt;
    dragState.velocity = dragState.velocity * 0.75 + instantVelocity * 0.25;
    dragState.lastX = event.clientX;
    dragState.lastTime = now;

    const rawOffset = dragState.startOffset + dragDistance;
    setOffset(applyRubberBand(rawOffset));
  };

  const stopDragging = () => {
    const dragState = dragStateRef.current;

    if (!dragState.isDragging) {
      return;
    }

    const shouldTreatAsClick = !dragState.hasMoved;

    dragState.isDragging = false;
    setIsDragging(false);
    startMomentum();
    if (shouldTreatAsClick) {
      dragState.hasMoved = false;
    }
  };

  const blockContextMenu = (event: MouseEvent<HTMLElement | SVGElement>) => {
    event.preventDefault();
  };

  const blockNativeDrag = (event: DragEvent<HTMLElement | SVGElement>) => {
    event.preventDefault();
  };

  const blockClipboard = (event: ClipboardEvent<HTMLElement>) => {
    event.preventDefault();
  };

  return (
    <section className="mx-auto max-w-4xl pt-10 md:pt-12 md:pb-6">
      <Reveal
        delay={titleRevealDelay}
        duration={revealDuration}
        instant={shouldSkipRevealAnimation}
      >
        <h2 className="font-bethany text-2xl text-foreground dark:text-zinc-50">
          Works
        </h2>
      </Reveal>
      <div className="-translate-x-1/2 relative left-1/2 isolate mt-5 w-screen overflow-hidden pt-3 pl-4">
        <div
          ref={outerRef}
          className="pointer-events-auto mx-auto w-full max-w-4xl"
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "pan-y",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
        >
          <div
            ref={innerRef}
            className="inline-flex select-none gap-8 whitespace-nowrap transition-none will-change-transform"
            style={{
              transform: `translate3d(${offsetX}px, 0px, 0px)`,
            }}
          >
            {cards.map((card, index) => (
              <Reveal
                key={card.id}
                className="shrink-0"
                delay={cardsRevealDelay}
                duration={revealDuration}
                instant={shouldSkipRevealAnimation}
                index={index}
                stagger={0.2}
                y={56 - index * 10}
                blur={2}
              >
                <Link
                  href={card.href}
                  aria-label={card.ariaLabel}
                  transitionTypes={["nav-forward"]}
                  draggable={false}
                  className="block"
                  onContextMenu={blockContextMenu}
                  onDragStartCapture={blockNativeDrag}
                  onCopy={blockClipboard}
                  onCut={blockClipboard}
                >
                  <ViewTransition>
                    <motion.div
                      id={card.id}
                      draggable={false}
                      className={`card relative h-104 w-72 overflow-hidden rounded-sm ${card.className}`}
                      whileHover={isDragging ? undefined : { y: -6 }}
                      transition={{
                        type: "spring",
                        stiffness: 240,
                        damping: 22,
                        mass: 0.7,
                      }}
                      style={{
                        cursor: isDragging ? "grabbing" : "pointer",
                        willChange: "transform",
                        background: card.background,
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        WebkitTouchCallout: "none",
                      }}
                    >
                      {card.id === "stellar" && (
                        <>
                          <Image
                            src={stellarName}
                            alt="Stellar"
                            className="absolute top-10 left-10 h-auto w-28"
                            draggable={false}
                            onDragStart={blockNativeDrag}
                            onContextMenu={blockContextMenu}
                            priority={false}
                          />
                          <Image
                            src={stellarLogo}
                            alt="Stellar symbol"
                            className="absolute right-4 bottom-0 h-auto w-36"
                            style={parallaxStyle(-12, 6, -1.6)}
                            draggable={false}
                            onDragStart={blockNativeDrag}
                            onContextMenu={blockContextMenu}
                            priority={false}
                          />
                        </>
                      )}

                      {card.id === "oncine" && (
                        <>
                          {/* Animated gray gradient background */}
                          <motion.div
                            className="absolute inset-0"
                            animate={{
                              background: [
                                "linear-gradient(135deg, #1F1F1F 0%, #3a3a3a 50%, #1F1F1F 100%)",
                                "linear-gradient(135deg, #2e2e2e 0%, #4a4a4a 50%, #252525 100%)",
                                "linear-gradient(135deg, #1a1a1a 0%, #383838 50%, #2a2a2a 100%)",
                                "linear-gradient(135deg, #1F1F1F 0%, #3a3a3a 50%, #1F1F1F 100%)",
                              ],
                            }}
                            transition={{
                              duration: 6,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                          />
                          <Image
                            src={oncineName}
                            alt="OnCine"
                            className="absolute top-10 left-10 h-auto w-20"
                            draggable={false}
                            onDragStart={blockNativeDrag}
                            onContextMenu={blockContextMenu}
                            priority={false}
                          />
                          {/* Inline SVG switch with animated circle */}
                          <div
                            className="absolute bottom-0 left-1/2 h-auto w-36"
                            style={centeredParallaxStyle(-10, 8, 1.2)}
                          >
                            {/** biome-ignore lint/a11y/noSvgWithoutTitle: <ignore> */}
                            <svg
                              width="123"
                              height="208"
                              viewBox="0 0 123 208"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              onDragStart={blockNativeDrag}
                              onContextMenu={blockContextMenu}
                            >
                              <g filter="url(#filter0_d_oncine)">
                                <g filter="url(#filter1_dii_oncine)">
                                  <rect
                                    x="18.3374"
                                    y="18.6906"
                                    width="64.8066"
                                    height="149.971"
                                    rx="32.4033"
                                    fill="#D8D8D8"
                                  />
                                </g>
                                <g filter="url(#filter2_dii_oncine)">
                                  <circle
                                    cx="50.3367"
                                    cy={(() => {
                                      // cy min (top) ≈ 51.09, cy center ≈ 90.04, cy max (bottom) ≈ 136.26
                                      // parallaxProgress is negative when dragging left, ~0 at rest
                                      // left drag → circle goes down (50% → 100%)
                                      // right drag → circle goes up (50% → 0%)
                                      const CY_MIN = 51.09;
                                      const CY_CENTER = 90.043;
                                      const CY_MAX = 136.26;
                                      // clamp to [-1, 0] range (left drag only in practice)
                                      const p = Math.max(
                                        -1,
                                        Math.min(1, parallaxProgress),
                                      );
                                      if (p <= 0) {
                                        // drag left: center → bottom (50% → 100%)
                                        return (
                                          CY_CENTER + -p * (CY_MAX - CY_CENTER)
                                        );
                                      }
                                      // drag right: center → top (50% → 0%)
                                      return (
                                        CY_CENTER - p * (CY_CENTER - CY_MIN)
                                      );
                                    })()}
                                    r="27.6531"
                                    fill="url(#paint0_linear_oncine)"
                                  />
                                </g>
                              </g>
                              <defs>
                                <filter
                                  id="filter0_d_oncine"
                                  x="9.245"
                                  y="12.108"
                                  width="82.9914"
                                  height="168.156"
                                  filterUnits="userSpaceOnUse"
                                  colorInterpolationFilters="sRGB"
                                >
                                  <feFlood
                                    floodOpacity="0"
                                    result="BackgroundImageFix"
                                  />
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                  />
                                  <feOffset dy="2.50982" />
                                  <feGaussianBlur stdDeviation="4.5462" />
                                  <feComposite in2="hardAlpha" operator="out" />
                                  <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_oncine"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_oncine"
                                    result="shape"
                                  />
                                </filter>
                                <filter
                                  id="filter1_dii_oncine"
                                  x="0.000237465"
                                  y="-1.62125e-05"
                                  width="122.081"
                                  height="207.245"
                                  filterUnits="userSpaceOnUse"
                                  colorInterpolationFilters="sRGB"
                                >
                                  <feFlood
                                    floodOpacity="0"
                                    result="BackgroundImageFix"
                                  />
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                  />
                                  <feOffset dx="10.2999" dy="9.94648" />
                                  <feGaussianBlur stdDeviation="14.3185" />
                                  <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0.169167 0 0 0 0 0.169167 0 0 0 0 0.169167 0 0 0 0.646 0"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_oncine"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_oncine"
                                    result="shape"
                                  />
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                  />
                                  <feOffset dx="5.85949" dy="5.65844" />
                                  <feGaussianBlur stdDeviation="4.07282" />
                                  <feComposite
                                    in2="hardAlpha"
                                    operator="arithmetic"
                                    k2="-1"
                                    k3="1"
                                  />
                                  <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0.970171 0 0 0 0 0.970171 0 0 0 0 0.970171 0 0 0 1 0"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in2="shape"
                                    result="effect2_innerShadow_oncine"
                                  />
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                  />
                                  <feOffset dx="-5.85949" dy="-5.65844" />
                                  <feGaussianBlur stdDeviation="4.07282" />
                                  <feComposite
                                    in2="hardAlpha"
                                    operator="arithmetic"
                                    k2="-1"
                                    k3="1"
                                  />
                                  <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0.690411 0 0 0 0 0.690411 0 0 0 0 0.690411 0 0 0 1 0"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in2="effect2_innerShadow_oncine"
                                    result="effect3_innerShadow_oncine"
                                  />
                                </filter>
                                <filter
                                  id="filter2_dii_oncine"
                                  x="7.93529"
                                  y="8"
                                  width="84.8028"
                                  height="185"
                                  filterUnits="userSpaceOnUse"
                                  colorInterpolationFilters="sRGB"
                                >
                                  <feFlood
                                    floodOpacity="0"
                                    result="BackgroundImageFix"
                                  />
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                  />
                                  <feOffset dy="7.37415" />
                                  <feGaussianBlur stdDeviation="7.37415" />
                                  <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0.08 0 0 0 0 0.08 0 0 0 0 0.08 0 0 0 0.4465 0"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_oncine"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_oncine"
                                    result="shape"
                                  />
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                  />
                                  <feOffset dy="3.26101" />
                                  <feGaussianBlur stdDeviation="1.63051" />
                                  <feComposite
                                    in2="hardAlpha"
                                    operator="arithmetic"
                                    k2="-1"
                                    k3="1"
                                  />
                                  <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0.5112 0 0 0 0 0.5112 0 0 0 0 0.5112 0 0 0 1 0"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in2="shape"
                                    result="effect2_innerShadow_oncine"
                                  />
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                  />
                                  <feOffset dy="-3.26101" />
                                  <feGaussianBlur stdDeviation="1.63051" />
                                  <feComposite
                                    in2="hardAlpha"
                                    operator="arithmetic"
                                    k2="-1"
                                    k3="1"
                                  />
                                  <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0.261 0 0 0 0 0.261 0 0 0 0 0.261 0 0 0 1 0"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in2="effect2_innerShadow_oncine"
                                    result="effect3_innerShadow_oncine"
                                  />
                                </filter>
                                <linearGradient
                                  id="paint0_linear_oncine"
                                  x1="50.3367"
                                  y1="62.3899"
                                  x2="50.3367"
                                  y2="117.696"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stopColor="#7B7B7B" />
                                  <stop offset="1" stopColor="#4A4A4A" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                        </>
                      )}

                      {card.id === "colorspace" && (
                        <div>
                          <Image
                            src={colorspaceName}
                            alt="ColorSpace"
                            className="absolute top-10 left-8 h-auto w-32 brightness-0"
                            draggable={false}
                            onDragStart={blockNativeDrag}
                            onContextMenu={blockContextMenu}
                            priority={false}
                          />
                          <div
                            className="absolute bottom-24"
                            style={{
                              left: "50%",
                              ...centeredParallaxStyle(-8, 6, 0.8),
                              width: "calc(100% - 3rem)",
                            }}
                          >
                            <div className="mx-auto max-w-xs whitespace-normal text-center font-bold font-whyte text-[23px] text-black uppercase leading-tight lg:text-2xl lg:leading-[1.1]">
                              Converta cores com precisão
                            </div>
                          </div>
                        </div>
                      )}

                      {card.id === "jumpie" && (
                        <>
                          <Image
                            src={jumpieName}
                            alt="Jumpie"
                            className="absolute top-10 left-8 h-auto w-24"
                            draggable={false}
                            onDragStart={blockNativeDrag}
                            onContextMenu={blockContextMenu}
                            priority={false}
                          />
                          <Image
                            src={jumpieLogo}
                            alt="Jumpie logo"
                            className="-translate-x-1/12 absolute bottom-4 left-1/2 h-auto w-20"
                            style={parallaxStyle(-14, 10)}
                            draggable={false}
                            onDragStart={blockNativeDrag}
                            onContextMenu={blockContextMenu}
                            priority={false}
                          />
                        </>
                      )}
                    </motion.div>
                  </ViewTransition>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
