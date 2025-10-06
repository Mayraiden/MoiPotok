import { supabase } from '@shared/api/supabase'

export const signUp = async (email: string, password: string) => {
	const { data, error } = await supabase.auth.signUp({ email, password })

	if (error) throw error
	return data.user
}

export const signIn = async (email: string, password: string) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	if (error) {
		console.error('Sign in error:', error)
		throw error
	}

	console.log('Sign in success, user:', data.user)
	console.log('User ID:', data.user?.id)
	return data.user
}

export const signOut = async () => {
	await supabase.auth.signOut()
}

export const fetchUser = async (authId: string) => {
	console.log('Fetching user with auth_id:', authId)
	console.log('Auth_id length:', authId.length)

	const { data, error } = await supabase
		.from('profiles')
		.select('*')
		.eq('auth_id', authId)
		.single()

	if (error) {
		console.error('Fetch user error:', error)
		throw error
	}

	console.log('Fetched user:', data)
	return data
}
