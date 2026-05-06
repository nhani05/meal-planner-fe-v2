import { mockUser } from '../data/mockData';
import { User, Bell, Shield, Palette, ChevronRight } from 'lucide-react';

const sections = [
  {
    title: 'Profile',
    icon: User,
    fields: [
      { label: 'Full Name', value: mockUser.name, type: 'text' },
      { label: 'Email', value: mockUser.email, type: 'email' },
      { label: 'Health Goal', value: mockUser.goal, type: 'select', options: ['Weight Loss', 'Muscle Gain', 'Maintenance', 'Endurance'] },
      { label: 'Daily Calorie Target', value: String(mockUser.dailyCalories), type: 'number' },
    ],
  },
  {
    title: 'Notifications',
    icon: Bell,
    toggles: [
      { label: 'Meal reminders', defaultOn: true },
      { label: 'Weekly progress report', defaultOn: true },
      { label: 'Recipe suggestions', defaultOn: false },
      { label: 'Hydration reminders', defaultOn: true },
    ],
  },
];

function Toggle({ defaultOn }) {
  return (
    <div
      className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${
        defaultOn ? 'bg-[#4caf50]' : 'bg-[#dee4d9]'
      }`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
          defaultOn ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </div>
  );
}

export default function Settings() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <p className="text-sm text-[#6f7a6b]">Manage your account preferences and goals.</p>

      {sections.map(({ title, icon: Icon, fields, toggles }) => (
        <div key={title} className="bg-white rounded-xl border border-[#becab9] shadow-[0px_2px_4px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-[#eaf0e4]">
            <div className="w-8 h-8 rounded-lg bg-[#eaf0e4] flex items-center justify-center">
              <Icon size={16} className="text-[#006e1c]" />
            </div>
            <h3 className="font-bold text-[#171d16] text-sm">{title}</h3>
          </div>

          <div className="px-6 py-4 space-y-4">
            {fields?.map(({ label, value, type, options }) => (
              <div key={label} className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#3f4a3c]">{label}</label>
                {type === 'select' ? (
                  <select
                    defaultValue={value}
                    className="px-3 py-2 rounded-lg border border-[#becab9] text-sm text-[#171d16] bg-white focus:outline-none focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20"
                  >
                    {options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input
                    type={type}
                    defaultValue={value}
                    className="px-3 py-2 rounded-lg border border-[#becab9] text-sm text-[#171d16] focus:outline-none focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20"
                  />
                )}
              </div>
            ))}

            {toggles?.map(({ label, defaultOn }) => (
              <div key={label} className="flex items-center justify-between py-1">
                <span className="text-sm text-[#171d16]">{label}</span>
                <Toggle defaultOn={defaultOn} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Danger zone */}
      <div className="bg-white rounded-xl border border-[#becab9] shadow-[0px_2px_4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-[#eaf0e4]">
          <div className="w-8 h-8 rounded-lg bg-[#ffdad6] flex items-center justify-center">
            <Shield size={16} className="text-[#ba1a1a]" />
          </div>
          <h3 className="font-bold text-[#171d16] text-sm">Account</h3>
        </div>
        <div className="px-6 py-4 space-y-2">
          {['Change Password', 'Export My Data', 'Delete Account'].map((action) => (
            <button
              key={action}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                action === 'Delete Account'
                  ? 'text-[#ba1a1a] hover:bg-[#ffdad6]'
                  : 'text-[#3f4a3c] hover:bg-[#f0f6ea]'
              }`}
            >
              {action}
              <ChevronRight size={14} />
            </button>
          ))}
        </div>
      </div>

      <button className="w-full bg-[#4caf50] hover:bg-[#006e1c] text-white font-semibold py-3 rounded-xl transition-colors">
        Save Changes
      </button>
    </div>
  );
}
