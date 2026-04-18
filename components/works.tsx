"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { MouseEvent, PointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import colorspaceName from "@/assets/colorspace/name.svg";
import jumpieLogo from "@/assets/jumpie/logojumpie.svg";
import jumpieName from "@/assets/jumpie/name.svg";
import oncineName from "@/assets/oncine/name.svg";
import oncineSwitch from "@/assets/oncine/switchlogo.svg";
import stellarLogo from "@/assets/stellar/logoStellar.svg";
import stellarName from "@/assets/stellar/name.svg";
import ColourfulText from "./ui/colorful-text";
import { Reveal } from "./ui/reveal";

type WorksProps = {
  titleRevealDelay?: number;
  cardsRevealDelay?: number;
  revealDuration?: number;
};

export const Works = ({
  titleRevealDelay = 0,
  cardsRevealDelay = 0.9,
  revealDuration = 0.95,
}: WorksProps) => {
  const LEFT_BLEED = 0;
  const SPRING = 0.018;
  const EDGE_DAMPING = 0.55;
  const FRICTION = 0.92;
  const RUBBER_BAND = 0.55;

  const cards = [
    {
      id: "stellar",
      className: "text-black",
      background: "linear-gradient(180deg, #FF6D1F 0%, #FF8949 100%)",
      ariaLabel: "Work project Stellar",
    },
    {
      id: "oncine",
      className: "text-white",
      background: "#1F1F1F",
      ariaLabel: "Work project OnCine",
    },
    {
      id: "colorspace",
      className: "text-[#333333]",
      background: "#F4F4F4",
      ariaLabel: "Work project ColorSpace",
    },
    {
      id: "jumpie",
      className: "text-white",
      background: "#6DACDF",
      ariaLabel: "Work project Jumpie",
    },
  ] as const;

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
  const parallaxProgress = (offsetX - LEFT_BLEED) / 120;
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
    nextState.isDragging = true;
    nextState.hasMoved = false;
    nextState.startX = event.clientX;
    nextState.startOffset = offsetRef.current;
    nextState.lastX = event.clientX;
    nextState.lastTime = performance.now();
    nextState.velocity = 0;

    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;

    if (!dragState.isDragging) {
      return;
    }

    const dragDistance = event.clientX - dragState.startX;

    if (Math.abs(dragDistance) > 3) {
      dragState.hasMoved = true;
    }

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

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;

    if (!dragState.isDragging) {
      return;
    }

    dragState.isDragging = false;
    setIsDragging(false);
    startMomentum();

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;

    if (!dragState.hasMoved) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    dragState.hasMoved = false;
  };

  return (
    <section className="mx-auto max-w-4xl pt-10 md:pt-12 md:pb-6">
      <Reveal delay={titleRevealDelay} duration={revealDuration}>
        <h2 className="font-bethany text-2xl text-foreground dark:text-zinc-50">
          Works
        </h2>
      </Reveal>
      <div className="-translate-x-1/2 relative left-1/2 isolate mt-5 w-screen overflow-hidden pt-3">
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
          onClickCapture={handleClickCapture}
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
                index={index}
                stagger={0.2}
                y={56 - index * 10}
                blur={2}
              >
                <motion.button
                  id={card.id}
                  type="button"
                  aria-label={card.ariaLabel}
                  className={`card relative h-104 w-72 overflow-hidden ${card.className}`}
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
                  }}
                >
                  {card.id === "stellar" && (
                    <>
                      <Image
                        src={stellarName}
                        alt="Stellar"
                        className="absolute top-10 left-14 h-auto w-25"
                        priority={false}
                      />
                      <Image
                        src={stellarLogo}
                        alt="Stellar symbol"
                        className="absolute right-0 bottom-0 h-auto w-42"
                        style={parallaxStyle(-12, 6, -1.6)}
                        priority={false}
                      />
                    </>
                  )}

                  {card.id === "oncine" && (
                    <>
                      <Image
                        src={oncineName}
                        alt="OnCine"
                        className="absolute top-10 left-16 h-auto w-24"
                        priority={false}
                      />
                      <Image
                        src={oncineSwitch}
                        alt="OnCine switch"
                        className="absolute bottom-9 left-1/2 h-auto w-28"
                        style={centeredParallaxStyle(-10, 8, 1.2)}
                        priority={false}
                      />
                    </>
                  )}

                  {card.id === "colorspace" && (
                    <>
                      <Image
                        src={colorspaceName}
                        alt="ColorSpace"
                        className="absolute top-10 left-8 h-auto w-37"
                        priority={false}
                      />
                      <div className="absolute bottom-12 left-5">
                        <div className="mx-auto max-w-xs text-center font-bold font-whyte text-[23px] uppercase leading-tight md:text-5xl lg:text-2xl lg:leading-[1.1]">
                          <ColourfulText text="Converta cores com precisão" />
                        </div>
                      </div>
                    </>
                  )}

                  {card.id === "jumpie" && (
                    <>
                      <Image
                        src={jumpieName}
                        alt="Jumpie"
                        className="absolute top-10 left-8 h-auto w-27"
                        priority={false}
                      />
                      <Image
                        src={jumpieLogo}
                        alt="Jumpie logo"
                        className="absolute right-1 bottom-0 h-auto w-24"
                        style={parallaxStyle(-14, 10)}
                        priority={false}
                      />
                    </>
                  )}
                </motion.button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
