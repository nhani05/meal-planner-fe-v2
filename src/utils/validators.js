import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(4, 'Username must be at least 4 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z
  .object({
    username: z.string().min(4, 'Username must be at least 4 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    passwordConfirm: z.string().min(6, 'Confirm password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(6, 'OTP must be at least 6 characters'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, 'Old password must be at least 6 characters'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    confirmNewPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

export const healthProfileSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  age: z.coerce.number().int().min(1, 'Age must be at least 1').max(120, 'Age must be at most 120'),
  gender: z.enum(['male', 'female', 'other']),
  heightCm: z.coerce.number().min(50, 'Height must be at least 50 cm').max(300, 'Height must be at most 300 cm'),
  weightKg: z.coerce.number().min(20, 'Weight must be at least 20 kg').max(500, 'Weight must be at most 500 kg'),
  avatarUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export const healthGoalSchema = z.object({
  goalType: z.enum(['weight_loss', 'muscle_gain', 'maintenance', 'endurance']),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active']),
  targetWeightKg: z.coerce.number().min(20).max(500).optional(),
  dailyCaloriesKcal: z.coerce.number().min(500, 'Daily calories must be at least 500').max(10000, 'Daily calories must be at most 10000'),
  proteinGDay: z.coerce.number().min(0, 'Protein must be at least 0'),
  carbGDay: z.coerce.number().min(0, 'Carbs must be at least 0'),
  fatGDay: z.coerce.number().min(0, 'Fat must be at least 0'),
});
