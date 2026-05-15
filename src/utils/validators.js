import { z } from 'zod';

export const createLoginSchema = (t) => z.object({
  username: z.string().min(4, t('validation.usernameMin')),
  password: z.string().min(6, t('validation.passwordMin')),
});

export const createRegisterSchema = (t) => z
  .object({
    username: z.string().min(4, t('validation.usernameMin')),
    email: z.string().email(t('validation.invalidEmail')),
    password: z.string().min(6, t('validation.passwordMin')),
    passwordConfirm: z.string().min(6, t('validation.confirmPasswordMin')),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: t('validation.passwordsMismatch'),
    path: ['passwordConfirm'],
  });

export const createForgotPasswordSchema = (t) => z.object({
  email: z.string().email(t('validation.invalidEmail')),
});

export const createResetPasswordSchema = (t) => z.object({
  token: z.string().min(6, t('validation.otpMin')),
  newPassword: z.string().min(6, t('validation.passwordMin')),
});

export const createChangePasswordSchema = (t) => z
  .object({
    oldPassword: z.string().min(6, t('validation.oldPasswordMin')),
    newPassword: z.string().min(6, t('validation.newPasswordMin')),
    confirmNewPassword: z.string().min(6, t('validation.confirmNewPasswordMin')),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: t('validation.passwordsMismatch'),
    path: ['confirmNewPassword'],
  });

export const createHealthProfileSchema = (t) => z.object({
  fullName: z.string().min(1, t('validation.fullNameRequired')),
  age: z.coerce.number().int().min(1, t('validation.ageMin')).max(120, t('validation.ageMax')),
  gender: z.enum(['male', 'female', 'other']),
  heightCm: z.coerce.number().min(50, t('validation.heightMin')).max(300, t('validation.heightMax')),
  weightKg: z.coerce.number().min(20, t('validation.weightMin')).max(500, t('validation.weightMax')),
  avatarUrl: z.string().url(t('validation.invalidUrl')).optional().or(z.literal('')),
});

export const createHealthGoalSchema = (t) => z.object({
  goalType: z.enum(['weight_loss', 'muscle_gain', 'maintenance', 'endurance']),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active']),
  targetWeightKg: z.coerce.number().min(20).max(500).optional(),
  dailyCaloriesKcal: z.coerce.number().min(500, t('validation.dailyCaloriesMin')).max(10000, t('validation.dailyCaloriesMax')),
  proteinGDay: z.coerce.number().min(0, t('validation.proteinMin')),
  carbGDay: z.coerce.number().min(0, t('validation.carbsMin')),
  fatGDay: z.coerce.number().min(0, t('validation.fatMin')),
});
