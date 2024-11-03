"use client";

import {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  TouchEventHandler,
  MouseEventHandler,
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
  const [draggedFruit, setDraggedFruit] = useState<DraggedFruitType>(null); // фрукт, который в данный момент перетаскивается
  const [progress, setProgress] = useState(0); // переменная для шкалы прогресса снизу
  const [fruitCounts, setFruitCounts] = useState({ ...INITIAL_FRUIT_COUNTS }); // изначальный счетчик с фруктами
  const tamagochiRef: MutableRefObject<HTMLDivElement | null> = useRef(null); // ссылка на элемент с тамагочи

  // Функция - проверка на то, находится ли курсор/тач над элементом
  const isWithinBounds = (
    rect: DOMRect,
    pageX: number,
    pageY: number
  ): boolean => {
    return (
      pageX >= rect.left &&
      pageX <= rect.left + rect.width &&
      pageY >= rect.top &&
      pageY <= rect.top + rect.height
    );
  };

  // функция, которая проверяет находился ли курсор над тамагочей и был ли фрукт записан
  const handleEndEvent = (pageX: number, pageY: number) => {
    if (draggedFruit && tamagochiRef?.current) {
      const rect = tamagochiRef.current.getBoundingClientRect();
      if (rect && isWithinBounds(rect, pageX, pageY)) {
        handleFruitDrop();
      } else {
        setDraggedFruit(null);
      }
    }
  };

  // хэндл для ивента, когда юзер поднимает палец
  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    const changedTouch = e.changedTouches[0];
    handleEndEvent(changedTouch.pageX, changedTouch.pageY);
  };

  // хэндл для ивента, когда юзер отпускает ЛКМ
  const handleMouseUp: MouseEventHandler<HTMLImageElement> = (e) => {
    handleEndEvent(e.pageX, e.pageY);
  };

  // Функция зачисления энергии за фрукты
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

  // useEffect для постепенного уменьшения энергии
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress > 0 ? prevProgress - 1 : 0));
    }, 36000);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-items-center justify-start font-sans overflow-hidden bg-white h-full"
      onTouchEnd={handleTouchEnd}
      onMouseUp={handleMouseUp}
    >
      <Tamagochi ref={tamagochiRef} />
      <FruitBar onDragStartFruit={setDraggedFruit} fruitCounts={fruitCounts} />
      <ProgressBar progress={progress} />
    </div>
  );
}
