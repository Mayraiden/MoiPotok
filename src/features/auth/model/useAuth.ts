import { useMutation } from '@tanstack/react-query'
import { signIn, signUp, fetchUser } from '../api/authAPI'
import { useAuthStore } from '@entities/user/store/authStore'

export const useAuth = () => {
	const { setUser, setLoading } = useAuthStore()

	const loginMutation = useMutation({
		mutationFn: async ({
			email,
			password,
		}: {
			email: string
			password: string
		}) => {
			setLoading(true)
			const user = await signIn(email, password)
			if (!user) throw new Error('Пользователь не найден')
			const profile = await fetchUser(user.id)
			return profile
		},
		onSuccess: (profile) => {
			setUser(profile)
			setLoading(false)
		},
		onError: () => setLoading(false),
	})

	const registerMutation = useMutation({
		mutationFn: async ({
			email,
			password,
		}: {
			email: string
			password: string
		}) => {
			setLoading(true)
			const user = await signUp(email, password)
			if (!user) throw new Error('Ошибка регистрации')
			const profile = await fetchUser(user.id)
			return profile
		},
		onSuccess: (profile) => {
			setUser(profile)
			setLoading(false)
		},
		onError: () => setLoading(false),
	})

	return { loginMutation, registerMutation }
}
