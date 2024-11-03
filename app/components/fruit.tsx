"use client";

import Image from "next/image";
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  TouchEvent,
  useState,
} from "react";

interface FruitProps {
  image: ImageType;
  onDragStartFruit: Dispatch<SetStateAction<ImageType | null>>;
  count: number;
}

type ImageType = "banana" | "apple" | "peach";

export default function Fruit({ image, onDragStartFruit, count }: FruitProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Обновление позиции фрукта
  const updatePosition = (x: number, y: number) => {
    setPosition({ x: x - 39, y: y - 39 });
  };

  // Общий хэндл для нажатия
  const handleStart = (x: number, y: number) => {
    updatePosition(x, y);
    onDragStartFruit(image);
    setIsDragging(true);
  };

  // Общий хэндл движения
  const handleMove = (x: number, y: number) => {
    if (isDragging) {
      updatePosition(x, y);
    }
  };

  // Хэндл нажатия пальца по картинке
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e.touches[0];
    handleStart(clientX, clientY);
  };

  // Хэндл движения тачем с картинкой
  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e.touches[0];
    handleMove(clientX, clientY);
  };

  // Хэндл нажатия ЛКМ по картинке
  const handleMouseDown: MouseEventHandler<HTMLImageElement> = (e) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  // Хэндл движения мышки с картинкой
  const handleMouseMove: MouseEventHandler<HTMLImageElement> = (e) => {
    handleMove(e.clientX, e.clientY);
  };

  // Хэндл окончания drag-n-drop
  const handleEnd = () => setIsDragging(false);

  // Хэндл поднятия ЛКМ
  const handleMouseUp: MouseEventHandler<HTMLImageElement> = (e) => {
    e.preventDefault();
    handleEnd();
  };

  // Хэндл поднятия пальца
  const handleTouchEnd = handleEnd;

  return (
    <div className="items-center justify-items-center w-[78px] h-[100px] flex flex-col justify-between touch-none">
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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <p className="w-[34px] h-[22px] text-center bg-[#2d2d2d] rounded-[8px] text-white text-[20px] align-middle leading-[20px] mt-auto transition-all duration-300 ease-in-out">
        {count}
      </p>
    </div>
  );
}
