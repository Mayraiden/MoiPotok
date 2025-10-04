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

	if (error) throw error
	return data.user
}

export const fetchUser = async (authId: string) => {
	const { data, error } = await supabase
		.from('profiles')
		.select('*')
		.eq('auth_id', authId)
		.single()

	if (error) throw error
	return data
}
