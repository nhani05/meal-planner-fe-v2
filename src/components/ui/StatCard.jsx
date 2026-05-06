/**
 * Reusable stat card for dashboard metrics
 * Props: title, value, subtitle, icon, trend, trendUp
 */
export default function StatCard({ title, value, subtitle, icon: Icon, trend, trendUp, accent = '#4caf50' }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-[0px_2px_4px_rgba(0,0,0,0.05)] border border-[#becab9] hover:shadow-[0px_4px_12px_rgba(0,0,0,0.08)] transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${accent}20` }}
        >
          {Icon && <Icon size={20} style={{ color: accent }} />}
        </div>
        {trend !== undefined && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              trendUp
                ? 'bg-[#eaf0e4] text-[#006e1c]'
                : 'bg-[#ffdad6] text-[#ba1a1a]'
            }`}
          >
            {trendUp ? '▲' : '▼'} {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-[#171d16]">{value}</p>
      <p className="text-sm font-medium text-[#171d16] mt-0.5">{title}</p>
      {subtitle && <p className="text-xs text-[#6f7a6b] mt-1">{subtitle}</p>}
    </div>
  );
}
