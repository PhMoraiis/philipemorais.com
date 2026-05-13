"use client";
import { type PanInfo, motion } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";

interface Card {
  id: number;
  src: string;
  title: string;
  subtitle: string;
  zIndex: number;
}

interface ImgStackProps {
  images: Array<string | { src: string; title?: string; subtitle?: string }>;
}

export default function ImgStack({ images }: ImgStackProps) {
  const [cards, setCards] = useState<Card[]>(
    images.map((image, index) => {
      const photo = typeof image === "string" ? { src: image } : image;

      return {
        id: index,
        src: photo.src,
        title: photo.title ?? `Moment ${index + 1}`,
        subtitle: photo.subtitle ?? "Photography",
        zIndex: 50 - index * 10,
      };
    }),
  );
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const minDragDistance: number = 50;

  const getCardStyles = (index: number) => {
    // Keep cards mostly straight with subtle offsets.
    const rotationPattern = [0, -2, 1.6, -1.2, 1];
    const xPattern = [0, -10, -18, -24, -30];
    const yPattern = [0, -7, -13, -18, -22];

    return {
      x: xPattern[index] ?? index * -6,
      y: yPattern[index] ?? index * -4,
      rotate: rotationPattern[index] ?? (index % 2 === 0 ? 1 : -1),
      scale: 1,
      transition: { duration: 0.4 },
    };
  };

  const handleDragStart = (_: unknown, info: PanInfo) => {
    dragStartPos.current = { x: info.point.x, y: info.point.y };
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const dragDistance = Math.sqrt(
      (info.point.x - dragStartPos.current.x) ** 2 +
        (info.point.y - dragStartPos.current.y) ** 2,
    );

    if (isAnimating) return;

    if (dragDistance < minDragDistance) {
      // Let Motion handle the snap-back automatically by not doing anything
      return;
    }

    setIsAnimating(true);

    // Move card to back and reassign proper z-index values
    setCards((prevCards) => {
      const newCards = [...prevCards];
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      const cardToMove = newCards.shift()!; // Remove first card
      newCards.push(cardToMove); // Add to end

      // Reassign z-index values to maintain proper stacking order
      return newCards.map((card, index) => ({
        ...card,
        zIndex: 50 - index * 10, // Top card gets 50, next gets 40, etc.
      }));
    });

    // Brief delay to allow the position change to register
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <div className="relative flex h-88 w-88 items-center justify-center sm:h-96 sm:w-96">
        {cards.map((card: Card, index: number) => {
          const isTopCard = index === 0;
          const cardStyles = getCardStyles(index);
          const canDrag = isTopCard && !isAnimating;

          return (
            <motion.div
              key={card.id}
              className="absolute w-64 origin-bottom-center cursor-grab overflow-hidden rounded-2xl border border-zinc-400 bg-white shadow-xl active:cursor-grabbing dark:border-zinc-200"
              style={{
                zIndex: card.zIndex,
                aspectRatio: "4/5",
              }}
              animate={cardStyles}
              drag={canDrag}
              dragElastic={0.2}
              dragConstraints={{
                left: -140,
                right: 140,
                top: -140,
                bottom: 140,
              }}
              dragSnapToOrigin={true}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              whileHover={
                isTopCard
                  ? {
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }
                  : {}
              }
              whileDrag={{
                scale: 1.1,
                rotate: 0,
                zIndex: 100,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transition: { duration: 0.1 },
              }}
            >
              <Image
                src={card.src}
                alt={card.title}
                fill
                className="pointer-events-none rounded-lg object-cover"
                sizes="(max-width: 768px) 100vw, 200px"
                draggable={false}
              />
            </motion.div>
          );
        })}
      </div>

      {cards[0] ? (
        <div className="mt-4 text-center">
          <p className="font-bethany text-md text-zinc-700 tracking-tight dark:text-zinc-100">
            {cards[0].title}
          </p>
          <p className="mt-1 font-dmsans font-normal text-[#F9581C] text-sm dark:text-[#F9581C]">
            {cards[0].subtitle}
          </p>
        </div>
      ) : null}
    </div>
  );
}
