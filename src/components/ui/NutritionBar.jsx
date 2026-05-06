/**
 * Macro / calorie progress bar
 * Props: label, current, target, color, unit
 */
export default function NutritionBar({ label, current, target, color = '#4caf50', unit = 'g' }) {
  const pct = Math.min(100, Math.round((current / target) * 100));
  const over = current > target;

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-[#171d16]">{label}</span>
        <span className="text-xs text-[#6f7a6b] tabular-nums">
          <span className="font-semibold" style={{ color }}>{current}{unit}</span>
          <span> / {target}{unit}</span>
        </span>
      </div>
      <div className="h-2 bg-[#eaf0e4] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            backgroundColor: over ? '#ba1a1a' : color,
          }}
        />
      </div>
      <p className="text-[10px] text-[#6f7a6b] text-right">{pct}%{over ? ' — over target!' : ''}</p>
    </div>
  );
}
