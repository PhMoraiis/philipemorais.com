"use client";

import type { MouseEvent, PointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export const Works = () => {
  const LEFT_BLEED = 0;
  const SPRING = 0.018;
  const EDGE_DAMPING = 0.55;
  const FRICTION = 0.92;
  const RUBBER_BAND = 0.55;

  const cards = [
    { id: "0", className: "bg-[#F2F0E5] text-black" },
    { id: "1", className: "bg-[#1F1F1F] text-white" },
    { id: "2", className: "bg-[#7CCAA0] text-white" },
    { id: "3", className: "bg-[#F4F592] text-[#333333]" },
  ];

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
    <section className="mx-auto max-w-4xl pt-10 md:pt-12">
      <h2 className="text-lg">Work</h2>
      <div className="-translate-x-1/2 relative left-1/2 isolate mt-6 w-screen overflow-hidden">
        <div
          ref={outerRef}
          className="mx-auto w-full max-w-4xl"
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            pointerEvents: "all",
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
            className="inline-flex select-none gap-8 whitespace-nowrap will-change-transform"
            style={{
              transform: `translate3d(${offsetX}px, 0px, 0px)`,
              transition: "none",
              userSelect: "none",
              display: "inline-flex",
            }}
          >
            {cards.map((card, index) => (
              <button
                key={card.id}
                id={card.id}
                type="button"
                aria-label={`Work project ${index + 1}`}
                className={`card h-104 w-72 shrink-0 ${card.className}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
