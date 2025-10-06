import { IInput } from '@shared/ui/IInput'
import { IButton } from '@shared/ui/IButton'
import { useAuth } from '../model/useAuth'
import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authSchema } from '@shared/schemas/auth.schema'
import type { AuthFormData } from '@shared/schemas/auth.schema'
import { Loader } from '@shared/ui/Loader'

type IAuthFormType = {
	mode?: 'login' | 'register'
}

export const AuthForm = ({ mode: initialMode = 'login' }: IAuthFormType) => {
	const [mode, setMode] = useState<'login' | 'register'>(initialMode)
	const { loginMutation, registerMutation } = useAuth()

	const isLoading = loginMutation.isPending || registerMutation.isPending

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AuthFormData>({
		resolver: zodResolver(authSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = (data: AuthFormData) => {
		if (mode === 'login') {
			loginMutation.mutate(data)
		} else {
			registerMutation.mutate(data)
		}
	}

	return (
		<div className="w-full h-full relative p-10 flex gap-4 flex-col justify-center items-center rounded-2xl backdrop-blur-2xl">
			{/* Переключатель режимов */}
			<div className="flex gap-2 mb-4">
				<button
					type="button"
					onClick={() => setMode('login')}
					className={`px-4 py-2 rounded-lg transition-colors ${
						mode === 'login'
							? 'bg-indigo-600 text-white'
							: 'bg-white/10 text-white/70 hover:bg-white/20'
					}`}
				>
					Вход
				</button>
				<button
					type="button"
					onClick={() => setMode('register')}
					className={`px-4 py-2 rounded-lg transition-colors ${
						mode === 'register'
							? 'bg-indigo-600 text-white'
							: 'bg-white/10 text-white/70 hover:bg-white/20'
					}`}
				>
					Регистрация
				</button>
			</div>

			<form
				className="w-full flex gap-4 flex-col justify-center items-center text-white"
				onSubmit={handleSubmit(onSubmit)}
			>
				<IInput
					{...register('email')}
					className="w-1/4 h-10 px-1 py-4 outline-0 active invalid:text-pink-600"
					type="email"
					placeholder="введите email"
				/>
				{errors.email && (
					<span className="text-pink-600 text-sm">{errors.email.message}</span>
				)}

				<IInput
					{...register('password')}
					className="w-1/4 h-10 px-1 py-4 outline-0 invalid:text-pink-600"
					type="password"
					placeholder="введите пароль"
					autoComplete="new-password"
				/>
				{errors.password && (
					<span className="text-pink-600 text-sm">
						{errors.password.message}
					</span>
				)}

				<IButton
					className="w-50 h-10 p-2 bg-indigo-600 rounded-2xl cursor-pointer hover:bg-indigo-700 transition-colors"
					type="submit"
					text={mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
					disabled={loginMutation.isPending || registerMutation.isPending}
				/>
			</form>
			<Loader isVisible={isLoading} />
		</div>
	)
}
