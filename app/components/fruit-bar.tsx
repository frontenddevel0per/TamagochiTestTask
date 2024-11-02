import { Dispatch, SetStateAction } from "react";
import Fruit from "./fruit";

type ImageType = "banana" | "apple" | "peach";

interface FruitbarProps {
  onDragStartFruit: Dispatch<SetStateAction<ImageType | null>>;
  fruitCounts: {
    apple: number;
    banana: number;
    peach: number;
  };
}

export default function FruitBar({
  onDragStartFruit,
  fruitCounts,
}: FruitbarProps) {
  return (
    <div className="flex justify-center space-x-[24px]">
      <Fruit
        image="apple"
        onDragStartFruit={onDragStartFruit}
        count={fruitCounts.apple}
      />
      <Fruit
        image="banana"
        onDragStartFruit={onDragStartFruit}
        count={fruitCounts.banana}
      />
      <Fruit
        image="peach"
        onDragStartFruit={onDragStartFruit}
        count={fruitCounts.peach}
      />
    </div>
  );
}
