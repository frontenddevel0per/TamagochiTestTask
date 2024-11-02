"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, TouchEvent, useState } from "react";

interface FruitProps {
  image: ImageType;
  onDragStartFruit: Dispatch<SetStateAction<ImageType | null>>;
  count: number;
}

type ImageType = "banana" | "apple" | "peach";

export default function Fruit({ image, onDragStartFruit, count }: FruitProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    onDragStartFruit(image);
    setIsDragging(true);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setPosition({ x: touch.clientX - 39, y: touch.clientY - 39 });
    onDragStartFruit(image);
    setIsDragging(true);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (isDragging) {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - 39,
        y: touch.clientY - 39,
      });
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="items-center justify-items-center w-[78px] h-[100px] flex flex-col justify-between">
      <Image
        src={`/${image}.png`}
        alt={`${image} image`}
        width={78}
        height={78}
        className={`touch-none ${
          count === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
        } transition-opacity duration-300`}
        style={
          isDragging
            ? {
                position: "absolute",
                left: position.x,
                top: position.y,
                touchAction: "none",
              }
            : {
                position: "relative",
              }
        }
        draggable
        onDragStart={handleDragStart}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <p className="w-[34px] h-[22px] text-center bg-[#2d2d2d] rounded-[8px] text-white text-[20px] align-middle leading-[20px] mt-auto transition-all duration-300 ease-in-out">
        {count}
      </p>
    </div>
  );
}
