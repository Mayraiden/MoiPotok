import { create } from 'zustand'
import { supabase } from '../../shared/api/supabase'

export type IUserType = {
	id: string
	auth_id: string | null
	email: string | null
	username: string | null
	full_name: string | null
	visibility: 'public' | 'friends' | 'private' | null
} | null

export type IAuthStoreType = {
	user: IUserType
	isLoading: boolean
	signIn: (email: string, password: string) => Promise<void>
	signUp: (
		email: string,
		password: string,
		username: string,
		fullName: string
	) => Promise<void>
	signOut: () => Promise<void>
	fetchUser: () => Promise<void>
}

export const useAuthStore = create<IAuthStoreType>((set) => ({
	user: null,
	isLoading: false,

	signIn: async (email, password) => {
		set({ isLoading: true })

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		})

		if (error) {
			console.log('Ошибка регистрации:', error)
			set({ isLoading: false })
			throw error
		}

		if (data.user) {
			const { data: profile, error: profileError } = await supabase
				.from('profiles')
				.select('*')
				.eq('auth_id', data.user.id)
				.single()

			if (profileError) {
				console.log('Ошибка:', profileError.message)
				set({ user: null, isLoading: false })
				return
			}

			set({
				user: {
					id: profile.id,
					auth_id: profile.auth_id,
					email: profile.email,
					username: profile.username,
					full_name: profile.username,
					visibility: profile.visibility,
				},
				isLoading: false,
			})
		} else {
			set({ user: null, isLoading: false })
			throw new Error('Пользователь не найден')
		}
	},

	signUp: async (email, password, username, fullName) => {
		set({ isLoading: true })

		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
			})

			if (error) {
				console.log('Ошибка регистрации:', error)
				set({ isLoading: false })
				throw error
			}

			if (data?.user) {
				// Создаем профиль пользователя
				const { data: profile, error: profileError } = await supabase
					.from('profiles')
					.insert({
						auth_id: data.user.id,
						email: email,
						username: username,
						full_name: fullName,
						visibility: 'public',
					})
					.select()
					.single()

				if (profileError) {
					console.log('Ошибка создания профиля:', profileError.message)
					set({ user: null, isLoading: false })
					throw profileError
				}

				set({
					user: {
						id: profile.id,
						auth_id: profile.auth_id,
						email: profile.email,
						username: profile.username,
						full_name: profile.full_name,
						visibility: profile.visibility,
					},
					isLoading: false,
				})
			} else {
				set({ user: null, isLoading: false })
				throw new Error('Пользователь не создан')
			}
		} catch (error) {
			set({ isLoading: false })
			throw error
		}
	},

	signOut: async () => {
		await supabase.auth.signOut()
		set({ user: null })
	},

	fetchUser: async () => {
		set({ isLoading: true })
		const { data } = await supabase.auth.getUser()

		if (data.user) {
			const { data: profile } = await supabase
				.from('profiles')
				.select('*')
				.eq('auth_id', data.user.id)
				.single()

			set({
				user: profile
					? {
							id: profile.id,
							auth_id: profile.auth_id,
							email: profile.email,
							username: profile.username,
							full_name: profile.full_name,
							visibility: profile.visibility,
						}
					: null,
				isLoading: false,
			})
		} else {
			set({ user: null, isLoading: false })
		}
	},
}))
