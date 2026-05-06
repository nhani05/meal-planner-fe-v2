/**
 * Circular progress ring for calorie tracking
 * Props: current, target, size, strokeWidth
 */
export default function CalorieRing({ current, target, size = 140, strokeWidth = 10 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(1, current / target);
  const offset = circumference - pct * circumference;
  const over = current > target;
  const color = over ? '#ba1a1a' : '#4caf50';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#eaf0e4"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold text-[#171d16]">{current}</span>
        <span className="text-[10px] text-[#6f7a6b]">/ {target} kcal</span>
        <span className="text-[10px] font-semibold mt-0.5" style={{ color }}>
          {Math.round((1 - pct) * target)} left
        </span>
      </div>
    </div>
  );
}
