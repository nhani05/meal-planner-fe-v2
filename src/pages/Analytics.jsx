import NutritionBar from '../components/ui/NutritionBar';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from 'recharts';
import { useTranslation } from 'react-i18next';

const mockWeeklyCalories = [
  { day: 'Mon', calories: 1800 },
  { day: 'Tue', calories: 1750 },
  { day: 'Wed', calories: 1900 },
  { day: 'Thu', calories: 1850 },
  { day: 'Fri', calories: 1700 },
  { day: 'Sat', calories: 2000 },
  { day: 'Sun', calories: 1650 },
];

const mockNutrition = {
  protein: { current: 100, target: 130 },
  carbs: { current: 150, target: 220 },
  fat: { current: 40, target: 65 },
};

const mockUser = { streak: 0 };

export default function Analytics() {
  const { t } = useTranslation();
  const { protein, carbs, fat } = mockNutrition;
  const radarData = [
    { subject: t('dashboard.protein'), A: 85 },
    { subject: t('dashboard.carbs'), A: 78 },
    { subject: t('dashboard.fat'), A: 68 },
    { subject: t('analyticsPage.fiber'), A: 60 },
    { subject: t('analyticsPage.vitamins'), A: 72 },
    { subject: t('analyticsPage.hydration'), A: 75 },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: t('analyticsPage.avgDailyCalories'), value: '1,834', sub: t('analyticsPage.thisWeek'), color: '#4caf50' },
          { label: t('analyticsPage.goalAdherence'), value: '87%', sub: t('analyticsPage.last7Days'), color: '#0061a4' },
          { label: t('analyticsPage.bestStreak'), value: `${mockUser.streak} ${t('dashboard.days')}`, sub: t('analyticsPage.currentStreak'), color: '#a63360' },
        ].map(({ label, value, sub, color }) => (
          <div key={label} className="bg-white rounded-xl border border-[#becab9] shadow-[0px_2px_4px_rgba(0,0,0,0.05)] p-5 text-center">
            <p className="text-2xl font-bold" style={{ color }}>{value}</p>
            <p className="text-sm font-medium text-[#171d16] mt-1">{label}</p>
            <p className="text-xs text-[#6f7a6b]">{sub}</p>
          </div>
        ))}
      </div>

      {/* Area chart */}
      <div className="bg-white rounded-xl border border-[#becab9] shadow-[0px_2px_4px_rgba(0,0,0,0.05)] p-6">
        <h3 className="font-bold text-[#171d16] text-sm mb-4">{t('analyticsPage.calorieTrend')}</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={mockWeeklyCalories}>
            <defs>
              <linearGradient id="calGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4caf50" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#eaf0e4" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6f7a6b' }} axisLine={false} tickLine={false} />
            <YAxis hide domain={[1400, 2200]} />
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid #becab9', borderRadius: 8, fontSize: 12 }}
            />
            <Area
              type="monotone"
              dataKey="calories"
              stroke="#4caf50"
              strokeWidth={2.5}
              fill="url(#calGrad)"
              dot={{ fill: '#4caf50', strokeWidth: 2, r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Macro progress + radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-[#becab9] shadow-[0px_2px_4px_rgba(0,0,0,0.05)] p-6 space-y-4">
          <h3 className="font-bold text-[#171d16] text-sm">{t('analyticsPage.macroBreakdown')}</h3>
          <NutritionBar label={t('dashboard.protein')} current={protein.current} target={protein.target} color="#4caf50" />
          <NutritionBar label={t('dashboard.carbohydrates')} current={carbs.current} target={carbs.target} color="#33a0fd" />
          <NutritionBar label={t('dashboard.fat')} current={fat.current} target={fat.target} color="#f26f9d" />
        </div>

        <div className="bg-white rounded-xl border border-[#becab9] shadow-[0px_2px_4px_rgba(0,0,0,0.05)] p-6">
          <h3 className="font-bold text-[#171d16] text-sm mb-4">{t('analyticsPage.nutritionScore')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#eaf0e4" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#6f7a6b' }} />
              <Radar dataKey="A" stroke="#4caf50" fill="#4caf50" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
