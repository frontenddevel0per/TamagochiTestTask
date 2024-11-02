import Image from "next/image";
import { Dispatch, SetStateAction, TouchEvent } from "react";

interface FruitProps {
  image: ImageType;
  onDragStartFruit: Dispatch<SetStateAction<ImageType | null>>;
  count: number;
}

type ImageType = "banana" | "apple" | "peach";

export default function Fruit({ image, onDragStartFruit, count }: FruitProps) {
  const handleDragStart = () => {
    onDragStartFruit(image);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDragStartFruit(image);
  };

  return (
    <div
      className="items-center justify-items-center w-[78px] h-[100px] flex flex-col justify-between"
      draggable
      onDragStart={handleDragStart}
      onTouchStart={handleTouchStart}
    >
      <Image
        src={`/${image}.png`}
        alt={`${image} image`}
        width={78}
        height={78}
        className={`touch-none ${
          count === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
        } transition-opacity duration-300`}
      />
      <p className="w-[34px] h-[26px] text-center bg-[#2d2d2d] rounded-[8px] text-white text-[20px] align-middle leading-[20px]">
        {count}
      </p>
    </div>
  );
}
