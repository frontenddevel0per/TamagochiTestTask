import Image from "next/image";
import { DragEvent, TouchEvent, forwardRef } from "react";

interface TamagochiProps {
  onDropFruit: () => void;
}

const Tamagochi = forwardRef<HTMLDivElement, TamagochiProps>((props, ref) => {
  const { onDropFruit } = props;

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDropFruit();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDropFruit();
  };

  return (
    <div
      className="items-center justify-items-center w-[200px] h-[250px] mt-[120px] mb-[60px]"
      ref={ref}
      onTouchEnd={handleTouchEnd}
    >
      <Image
        src="/tamagochi.jpg"
        alt="Tamagochi image"
        width={786}
        height={1000}
        className="object-contain"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />
    </div>
  );
});

Tamagochi.displayName = "Tamagochi";
export default Tamagochi;
