import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Bell, Shield, Loader2, MessageSquare } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useUserStore } from '../stores/userStore';
import { useUiStore } from '../stores/uiStore';
import * as authApi from '../api/authApi';
import * as feedbackApi from '../api/feedbackApi';
import { healthProfileSchema, healthGoalSchema, changePasswordSchema } from '../utils/validators';

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

function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-3 px-6 py-4 border-b border-[#eaf0e4]">
      <div className="w-8 h-8 rounded-lg bg-[#eaf0e4] flex items-center justify-center">
        <Icon size={16} className="text-[#006e1c]" />
      </div>
      <h3 className="font-bold text-[#171d16] text-sm">{title}</h3>
    </div>
  );
}

function FormField({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-[#3f4a3c]">{label}</label>
      {children}
      {error && <p className="text-[10px] text-[#ba1a1a]">{error}</p>}
    </div>
  );
}

export default function Settings() {
  const { user } = useAuthStore();
  const { profile, healthGoal, isLoading, fetchProfile, updateProfile, fetchGoal, updateGoal } = useUserStore();
  const { showToast } = useUiStore();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbacksLoading, setFeedbacksLoading] = useState(false);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const accountId = user?.id;

  /* ---------- Feedback ---------- */
  const fetchFeedbacks = async () => {
    setFeedbacksLoading(true);
    try {
      const res = await feedbackApi.getMyFeedbacks();
      setFeedbacks(res.data || []);
    } catch (err) {
      if (err.response?.status !== 404) {
        const msg = err.response?.data?.message || err.message || 'Failed to load feedback history';
        showToast(msg, 'error');
      }
    } finally {
      setFeedbacksLoading(false);
    }
  };

  const handleSendFeedback = async () => {
    if (!feedbackContent.trim()) return;
    setSubmittingFeedback(true);
    try {
      await feedbackApi.sendFeedback(feedbackContent.trim());
      showToast('Feedback sent', 'success');
      setFeedbackContent('');
      fetchFeedbacks();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to send feedback';
      showToast(msg, 'error');
    } finally {
      setSubmittingFeedback(false);
    }
  };

  useEffect(() => {
    if (accountId) {
      fetchFeedbacks();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId]);

  useEffect(() => {
    if (accountId) {
      fetchProfile(accountId);
      fetchGoal(accountId);
    }
  }, [accountId, fetchProfile, fetchGoal]);

  /* ---------- Profile Form ---------- */
  const profileForm = useForm({
    resolver: zodResolver(healthProfileSchema),
    values: profile || { fullName: '', age: '', gender: 'male', heightCm: '', weightKg: '', avatarUrl: '' },
  });

  useEffect(() => {
    if (profile) {
      profileForm.reset(profile);
    }
  }, [profile, profileForm]);

  const onProfileSubmit = async (data) => {
    await updateProfile(accountId, data);
  };

  /* ---------- Goal Form ---------- */
  const goalForm = useForm({
    resolver: zodResolver(healthGoalSchema),
    values: healthGoal || {
      goalType: 'maintenance',
      activityLevel: 'moderate',
      targetWeightKg: '',
      dailyCaloriesKcal: 2000,
      proteinGDay: 130,
      carbGDay: 220,
      fatGDay: 65,
    },
  });

  useEffect(() => {
    if (healthGoal) {
      goalForm.reset(healthGoal);
    }
  }, [healthGoal, goalForm]);

  const onGoalSubmit = async (data) => {
    await updateGoal(accountId, data);
  };

  /* ---------- Password Form ---------- */
  const passwordForm = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { oldPassword: '', newPassword: '', confirmNewPassword: '' },
  });

  const onPasswordSubmit = async (data) => {
    try {
      await authApi.changePassword(data);
      showToast('Password changed successfully', 'success');
      passwordForm.reset();
      setShowPasswordForm(false);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to change password';
      showToast(msg, 'error');
    }
  };

  const inputCls =
    'px-3 py-2 rounded-lg border border-[#becab9] text-sm text-[#171d16] bg-white focus:outline-none focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20';
  const selectCls = inputCls + ' cursor-pointer';

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <p className="text-sm text-[#6f7a6b]">Manage your account preferences and goals.</p>

      {/* Profile */}
      <div className="bg-white rounded-xl border border-[#becab9] shadow-[0px_2px_4px_rgba(0,0,0,0.05)] overflow-hidden">
        <SectionHeader icon={User} title="Profile" />
        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="px-6 py-4 space-y-4">
          <FormField label="Full Name" error={profileForm.formState.errors.fullName?.message}>
            <input {...profileForm.register('fullName')} className={inputCls} placeholder="Your full name" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Age" error={profileForm.formState.errors.age?.message}>
              <input type="number" {...profileForm.register('age')} className={inputCls} placeholder="25" />
            </FormField>
            <FormField label="Gender" error={profileForm.formState.errors.gender?.message}>
              <select {...profileForm.register('gender')} className={selectCls}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Height (cm)" error={profileForm.formState.errors.heightCm?.message}>
              <input type="number" {...profileForm.register('heightCm')} className={inputCls} placeholder="170" />
            </FormField>
            <FormField label="Weight (kg)" error={profileForm.formState.errors.weightKg?.message}>
              <input type="number" {...profileForm.register('weightKg')} className={inputCls} placeholder="70" />
            </FormField>
          </div>
          <FormField label="Avatar URL" error={profileForm.formState.errors.avatarUrl?.message}>
            <input {...profileForm.register('avatarUrl')} className={inputCls} placeholder="https://..." />
          </FormField>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#4caf50] hover:bg-[#006e1c] disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 size={16} className="animate-spin" />}
            Save Profile
          </button>
        </form>
      </div>

      {/* Health Goal */}
      <div className="bg-white rounded-xl border border-[#becab9] shadow-[0px_2px_4px_rgba(0,0,0,0.05)] overflow-hidden">
        <SectionHeader icon={Shield} title="Health Goal" />
        <form onSubmit={goalForm.handleSubmit(onGoalSubmit)} className="px-6 py-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Goal Type" error={goalForm.formState.errors.goalType?.message}>
              <select {...goalForm.register('goalType')} className={selectCls}>
                <option value="weight_loss">Weight Loss</option>
                <option value="muscle_gain">Muscle Gain</option>
                <option value="maintenance">Maintenance</option>
                <option value="endurance">Endurance</option>
              </select>
            </FormField>
            <FormField label="Activity Level" error={goalForm.formState.errors.activityLevel?.message}>
              <select {...goalForm.register('activityLevel')} className={selectCls}>
                <option value="sedentary">Sedentary</option>
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="active">Active</option>
                <option value="very_active">Very Active</option>
              </select>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Daily Calories (kcal)" error={goalForm.formState.errors.dailyCaloriesKcal?.message}>
              <input type="number" {...goalForm.register('dailyCaloriesKcal')} className={inputCls} />
            </FormField>
            <FormField label="Target Weight (kg)" error={goalForm.formState.errors.targetWeightKg?.message}>
              <input type="number" {...goalForm.register('targetWeightKg')} className={inputCls} placeholder="Optional" />
            </FormField>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <FormField label="Protein (g/day)" error={goalForm.formState.errors.proteinGDay?.message}>
              <input type="number" {...goalForm.register('proteinGDay')} className={inputCls} />
            </FormField>
            <FormField label="Carbs (g/day)" error={goalForm.formState.errors.carbGDay?.message}>
              <input type="number" {...goalForm.register('carbGDay')} className={inputCls} />
            </FormField>
            <FormField label="Fat (g/day)" error={goalForm.formState.errors.fatGDay?.message}>
              <input type="number" {...goalForm.register('fatGDay')} className={inputCls} />
            </FormField>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#4caf50] hover:bg-[#006e1c] disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 size={16} className="animate-spin" />}
            Save Health Goal
          </button>
        </form>
      </div>

      {/* Notifications (UI-only) */}
      <div className="bg-white rounded-xl border border-[#becab9] shadow-[0px_2px_4px_rgba(0,0,0,0.05)] overflow-hidden">
        <SectionHeader icon={Bell} title="Notifications" />
        <div className="px-6 py-4 space-y-3">
          {[
            { label: 'Meal reminders', defaultOn: true },
            { label: 'Weekly progress report', defaultOn: true },
            { label: 'Recipe suggestions', defaultOn: false },
            { label: 'Hydration reminders', defaultOn: true },
          ].map(({ label, defaultOn }) => (
            <div key={label} className="flex items-center justify-between py-1">
              <span className="text-sm text-[#171d16]">{label}</span>
              <Toggle defaultOn={defaultOn} />
            </div>
          ))}
          <p className="text-[10px] text-[#6f7a6b] pt-1">* Notification preferences are stored locally for now.</p>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl border border-[#becab9] shadow-[0px_2px_4px_rgba(0,0,0,0.05)] overflow-hidden">
        <SectionHeader icon={Shield} title="Account" />
        <div className="px-6 py-4 space-y-4">
          {!showPasswordForm ? (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-[#3f4a3c] hover:bg-[#f0f6ea] transition-colors"
            >
              Change Password
            </button>
          ) : (
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-3">
              <FormField label="Current Password" error={passwordForm.formState.errors.oldPassword?.message}>
                <input type="password" {...passwordForm.register('oldPassword')} className={inputCls} />
              </FormField>
              <FormField label="New Password" error={passwordForm.formState.errors.newPassword?.message}>
                <input type="password" {...passwordForm.register('newPassword')} className={inputCls} />
              </FormField>
              <FormField label="Confirm New Password" error={passwordForm.formState.errors.confirmNewPassword?.message}>
                <input type="password" {...passwordForm.register('confirmNewPassword')} className={inputCls} />
              </FormField>
              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  className="flex-1 bg-[#4caf50] hover:bg-[#006e1c] text-white font-semibold py-2.5 rounded-xl transition-colors"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => { setShowPasswordForm(false); passwordForm.reset(); }}
                  className="flex-1 bg-[#dee4d9] hover:bg-[#becab9] text-[#3f4a3c] font-semibold py-2.5 rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Feedback */}
      <div className="bg-white rounded-xl border border-[#becab9] shadow-[0px_2px_4px_rgba(0,0,0,0.05)] overflow-hidden">
        <SectionHeader icon={MessageSquare} title="Feedback" />
        <div className="px-6 py-4 space-y-4">
          <div className="space-y-2">
            <textarea
              value={feedbackContent}
              onChange={(e) => setFeedbackContent(e.target.value.slice(0, 500))}
              placeholder="Share your thoughts, report bugs, or suggest features..."
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-[#becab9] text-sm text-[#171d16] bg-white focus:outline-none focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 resize-none"
            />
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-[#6f7a6b]">{feedbackContent.length}/500</p>
              <button
                onClick={handleSendFeedback}
                disabled={!feedbackContent.trim() || submittingFeedback}
                className="px-5 py-2 rounded-xl bg-[#4caf50] hover:bg-[#006e1c] disabled:opacity-60 text-white text-sm font-semibold transition-colors flex items-center gap-2"
              >
                {submittingFeedback && <Loader2 size={14} className="animate-spin" />}
                Send Feedback
              </button>
            </div>
          </div>

          <div className="border-t border-[#eaf0e4] pt-4">
            <p className="text-xs font-bold text-[#6f7a6b] uppercase tracking-wider mb-3">History</p>
            {feedbacksLoading ? (
              <div className="flex items-center gap-2 py-2 text-sm text-[#6f7a6b]">
                <Loader2 size={14} className="animate-spin" /> Loading...
              </div>
            ) : feedbacks.length === 0 ? (
              <p className="text-sm text-[#6f7a6b] italic py-1">You haven&apos;t submitted any feedback yet.</p>
            ) : (
              <div className="space-y-3">
                {feedbacks.map((f) => (
                  <div key={f.id} className="flex items-start gap-3 p-3 rounded-xl bg-[#f5fbef]">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#171d16] break-words">{f.content}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          f.status === 'pending' ? 'bg-[#ffecb3] text-[#ff8f00]' :
                          f.status === 'resolved' ? 'bg-[#eaf0e4] text-[#006e1c]' :
                          'bg-[#ffdad6] text-[#ba1a1a]'
                        }`}>{f.status}</span>
                        {f.submittedAt && (
                          <span className="text-[10px] text-[#6f7a6b]">{new Date(f.submittedAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
