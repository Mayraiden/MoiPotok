import { create } from 'zustand'

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
	setUser: (user: IUserType) => void
	clearUser: () => void
	setLoading: (v: boolean) => void
}

export const useAuthStore = create<IAuthStoreType>((set) => ({
	user: null,
	isLoading: false,
	setUser: (user) => set({ user }),
	clearUser: () => set({ user: null }),
	setLoading: (v) => set({ isLoading: v }),
}))
