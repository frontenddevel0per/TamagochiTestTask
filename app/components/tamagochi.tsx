import Image from "next/image";
import { forwardRef } from "react";

const Tamagochi = forwardRef<HTMLDivElement, object>((props, ref) => {
  return (
    <div
      className="items-center justify-items-center w-[200px] h-[250px] mt-[120px] mb-[60px]"
      ref={ref}
    >
      <Image
        src="/tamagochi.jpg"
        alt="Tamagochi image"
        width={786}
        height={1000}
        className="object-contain"
      />
    </div>
  );
});

Tamagochi.displayName = "Tamagochi";
export default Tamagochi;
