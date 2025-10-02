import { Link } from '@tanstack/react-router'

import { useAuthStore } from '@app/Store/authStore'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authSchema } from '@shared/schemas/auth.schema'
import type { AuthFormData } from '@shared/schemas/auth.schema'

import { IInput } from '@shared/ui/input'
import { IButton } from '@shared/ui/button'

export const AuthForm = () => {
	const { signIn, isLoading } = useAuthStore()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<AuthFormData>({
		resolver: zodResolver(authSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (data: AuthFormData) => {
		try {
			await signIn(data.email, data.password)
		} catch (error) {
			console.log('Ошибка авторизации:', error)
		}
	}

	return (
		<form
			className="w-full h-full p-10 flex gap-4 flex-col justify-center items-center rounded-2xl backdrop-blur-2xl"
			onSubmit={handleSubmit(onSubmit)}
		>
			<h1 className="text-4xl font-bold">С возвращением!</h1>
			<div>
				<span className="text-white/70">Первый раз здесь?</span>{' '}
				<Link to="/signUp" className="font-medium text-white/90">
					зарегестрироваться
				</Link>
			</div>
			<IInput
				{...register('email')}
				className="w-1/4 h-10 px-1 py-4 outline-0 border-b-1 border-white/70 active invalid:text-pink-600"
				type="email"
				placeholder="введите email"
				onChange={() => {}}
			/>
			{errors.email && (
				<span className="text-red-500 text-base">{errors.email.message}</span>
			)}
			<IInput
				{...register('password')}
				className="w-1/4 h-10 px-1 py-4 outline-0 border-b-1 border-white/70 invalid:text-pink-600"
				type="password"
				placeholder="введите пароль"
				onChange={() => {}}
			/>
			<IButton
				className="w-50 h-10 p-2 bg-indigo-600 rounded-2xl cursor-pointer hover:bg-indigo-700 transition-colors"
				text={isLoading ? 'Входим..' : 'Войти'}
				type="submit"
				disabled={isLoading}
			/>
		</form>
	)
}
