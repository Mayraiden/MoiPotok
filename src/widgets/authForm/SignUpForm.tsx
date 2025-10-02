import { Link } from '@tanstack/react-router'
import { useState } from 'react'

import { useAuthStore } from '@app/Store/authStore'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema } from '@shared/schemas/auth.schema'
import type { SignUpFormData } from '@shared/schemas/auth.schema'

import { IInput } from '@shared/ui/input'
import { IButton } from '@shared/ui/button'

export const SignUpForm = () => {
	const { signUp, isLoading } = useAuthStore()
	const [authError, setAuthError] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
			username: '',
			fullName: '',
		},
	})

	const onSubmit = async (data: SignUpFormData) => {
		setAuthError(null)
		try {
			await signUp(data.email, data.password, data.username, data.fullName)
		} catch (error: any) {
			console.log('Ошибка регистрации:', error)

			if (error.message?.includes('User already registered')) {
				setAuthError('Пользователь с таким email уже существует')
			} else if (error.message?.includes('Invalid email')) {
				setAuthError('Некорректный email')
			} else if (error.message?.includes('Password should be at least')) {
				setAuthError('Пароль должен содержать минимум 6 символов')
			} else {
				setAuthError('Произошла ошибка при регистрации')
			}
		}
	}

	return (
		<form
			className="w-full h-full p-10 flex gap-4 flex-col justify-center items-center rounded-2xl backdrop-blur-2xl"
			onSubmit={handleSubmit(onSubmit)}
		>
			<h1 className="text-4xl font-bold">Добро пожаловать!</h1>
			<div>
				<span className="text-white/70">Уже есть аккаунт?</span>{' '}
				<Link to="/auth" className="font-medium text-white/90">
					войти
				</Link>
			</div>

			{/* Показываем ошибку регистрации */}
			{authError && (
				<div className="text-red-500 text-sm bg-red-500/10 px-4 py-2 rounded-lg">
					{authError}
				</div>
			)}

			{/* Email */}
			<IInput
				{...register('email')}
				className="w-1/4 h-10 px-1 py-4 outline-0 border-b-1 border-white/70 active invalid:text-pink-600"
				type="email"
				placeholder="введите email"
			/>
			{errors.email && (
				<span className="text-red-500 text-sm">{errors.email.message}</span>
			)}

			{/* Username */}
			<IInput
				{...register('username')}
				className="w-1/4 h-10 px-1 py-4 outline-0 border-b-1 border-white/70 active invalid:text-pink-600"
				type="text"
				placeholder="имя пользователя"
			/>
			{errors.username && (
				<span className="text-red-500 text-sm">{errors.username.message}</span>
			)}

			{/* Full Name */}
			<IInput
				{...register('fullName')}
				className="w-1/4 h-10 px-1 py-4 outline-0 border-b-1 border-white/70 active invalid:text-pink-600"
				type="text"
				placeholder="полное имя"
			/>
			{errors.fullName && (
				<span className="text-red-500 text-sm">{errors.fullName.message}</span>
			)}

			{/* Password */}
			<IInput
				{...register('password')}
				className="w-1/4 h-10 px-1 py-4 outline-0 border-b-1 border-white/70 invalid:text-pink-600"
				type="password"
				placeholder="введите пароль"
			/>
			{errors.password && (
				<span className="text-red-500 text-sm">{errors.password.message}</span>
			)}

			{/* Confirm Password */}
			<IInput
				{...register('confirmPassword')}
				className="w-1/4 h-10 px-1 py-4 outline-0 border-b-1 border-white/70 invalid:text-pink-600"
				type="password"
				placeholder="подтвердите пароль"
			/>
			{errors.confirmPassword && (
				<span className="text-red-500 text-sm">
					{errors.confirmPassword.message}
				</span>
			)}

			<IButton
				className="w-50 h-10 p-2 bg-indigo-600 rounded-2xl cursor-pointer hover:bg-indigo-700 transition-colors"
				text={isLoading ? 'Регистрируем..' : 'Зарегистрироваться'}
				type="submit"
				disabled={isLoading}
			/>
		</form>
	)
}


