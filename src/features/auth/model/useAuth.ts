import { useMutation } from '@tanstack/react-query'
import { signIn, signUp, signOut, fetchUser } from '../api/authAPI'
import { useAuthStore } from '@entities/user/store/authStore'
import { useNavigate } from '@tanstack/react-router'

export const useAuth = () => {
	const navigate = useNavigate()
	const { setUser, setLoading, clearUser } = useAuthStore()

	const logOut = async () => {
		setLoading(true)
		try {
			await signOut()
			clearUser()
			navigate({ to: '/auth' })
		} catch (error) {
			console.error('Ошибка выхода:', error)
		} finally {
			setLoading(false)
		}
	}

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
			console.log('Login success:', profile)
			setUser(profile)
			setLoading(false)
			navigate({ to: '/profile' })
		},
		onError: (error) => {
			console.error('Login error:', error)
			setLoading(false)
		},
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
			console.log('User registered:', user)

			await new Promise((resolve) => setTimeout(resolve, 1000))
			const profile = await fetchUser(user.id)
			return profile
		},
		onSuccess: (profile) => {
			console.log('Registration success:', profile)
			setUser(profile)
			setLoading(false)
			navigate({ to: '/profile' })
		},
		onError: (error) => {
			console.error('Registration error:', error)
			setLoading(false)
		},
	})

	return { loginMutation, registerMutation, logOut }
}
