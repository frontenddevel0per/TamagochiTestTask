"use client";

import {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  TouchEventHandler,
} from "react";
import Tamagochi from "./components/tamagochi";
import FruitBar from "./components/fruit-bar";
import ProgressBar from "./components/progressbar";

const FRUIT_COSTS = {
  apple: 20,
  banana: 10,
  peach: 5,
};

const INITIAL_FRUIT_COUNTS = {
  apple: 5,
  banana: 5,
  peach: 5,
};

type DraggedFruitType = "banana" | "apple" | "peach" | null;

export default function Home() {
  const [draggedFruit, setDraggedFruit] = useState<DraggedFruitType>(null);
  const [progress, setProgress] = useState(0);
  const [fruitCounts, setFruitCounts] = useState({ ...INITIAL_FRUIT_COUNTS });
  const tamagochiRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    if (draggedFruit) {
      if (tamagochiRef) {
        const changedTouches = e.changedTouches[0];
        const current = tamagochiRef.current;
        const rect = current?.getBoundingClientRect();
        if (
          rect &&
          changedTouches.pageX >= rect.left &&
          changedTouches.pageX <= rect.left + rect.width &&
          changedTouches.pageY >= rect.top &&
          changedTouches.pageY <= rect.top + rect.height
        ) {
          handleFruitDrop();
        } else {
          setDraggedFruit(null);
        }
      }
    }
  };

  const handleFruitDrop = () => {
    if (!draggedFruit || fruitCounts[draggedFruit] <= 0 || progress === 100) {
      return;
    }

    const newProgress = progress + FRUIT_COSTS[draggedFruit];

    if (newProgress > 105) {
      return;
    }

    setProgress(newProgress > 100 ? 100 : newProgress);
    setFruitCounts((prevCounts) => ({
      ...prevCounts,
      [draggedFruit]: prevCounts[draggedFruit] - 1,
    }));

    setDraggedFruit(null);
  };

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress > 0 ? prevProgress - 1 : 0));
    }, 36000);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-items-center justify-start min-h-screen font-sans overflow-hidden"
      onTouchEnd={handleTouchEnd}
    >
      <Tamagochi ref={tamagochiRef} onDropFruit={handleFruitDrop} />
      <FruitBar onDragStartFruit={setDraggedFruit} fruitCounts={fruitCounts} />
      <ProgressBar progress={progress} />
    </div>
  );
}
