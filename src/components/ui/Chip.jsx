/**
 * Chip / tag badge
 * Props: label, variant ('green' | 'blue' | 'rose' | 'gray')
 */
const variants = {
  green: 'bg-[#94f990] text-[#002204]',
  blue:  'bg-[#d1e4ff] text-[#001d36]',
  rose:  'bg-[#ffd9e2] text-[#3e001c]',
  gray:  'bg-[#dee4d9] text-[#3f4a3c]',
};

const tagColorMap = {
  'Vegan': 'green',
  'Vegetarian': 'green',
  'High Fiber': 'green',
  'High Protein': 'blue',
  'Omega-3': 'blue',
  'Probiotic': 'blue',
  'Gluten-Free': 'gray',
  'Keto': 'rose',
  'Low Carb': 'rose',
  Breakfast: 'gray',
  Lunch: 'gray',
  Dinner: 'gray',
  Snack: 'gray',
};

export default function Chip({ label, variant }) {
  const v = variant ?? tagColorMap[label] ?? 'gray';
  return (
    <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${variants[v]}`}>
      {label}
    </span>
  );
}
