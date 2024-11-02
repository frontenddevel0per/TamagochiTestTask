interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-[36px]">
      <div className="border-4 border-[#2d2d2d] rounded-[40px] w-[350px] h-[66px] bg-white overflow-hidden relative">
        <div
          className="h-full bg-[#abef60] transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
        <p className="absolute inset-0 flex items-center justify-center text-[#2d2d2d] font-bold text-[28px]">
          {progress}%
        </p>
      </div>
    </div>
  );
}
