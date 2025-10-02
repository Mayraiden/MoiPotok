import { z } from 'zod'

export const authSchema = z.object({
	email: z
		.string()
		.min(1, 'Email обязателен')
		.email('Некорректный формат email'),
	password: z
		.string()
		.min(6, 'Пароль должен содержать минимум 6 символов')
		.max(40, 'Пароль слишком длинный'),
})

export const signUpSchema = z
	.object({
		email: z
			.string()
			.min(1, 'Email обязателен')
			.email('Некорректный формат email'),
		password: z
			.string()
			.min(6, 'Пароль должен содержать минимум 6 символов')
			.max(40, 'Пароль слишком длинный'),
		confirmPassword: z.string().min(1, 'Подтверждение пароля обязательно'),
		username: z
			.string()
			.min(2, 'Имя пользователя должно содержать минимум 2 символа')
			.max(20, 'Имя пользователя слишком длинное')
			.regex(
				/^[a-zA-Z0-9_]+$/,
				'Имя пользователя может содержать только буквы, цифры и _'
			),
		fullName: z
			.string()
			.min(2, 'Полное имя должно содержать минимум 2 символа')
			.max(50, 'Полное имя слишком длинное'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	})

export type AuthFormData = z.infer<typeof authSchema>
export type SignUpFormData = z.infer<typeof signUpSchema>
