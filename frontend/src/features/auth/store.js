import create from 'zustand'
import { authApi } from './api/auth'

export const useAuthStore = create(set => ({
	user: null,
	loading: false,
	error: null,

	// Логин
	loginUser: async (phone, password) => {
		set({ loading: true, error: null })
		try {
			const res = await authApi.login(phone, password)
			set({ user: res.data, loading: false })
			return { success: true }
		} catch (err) {
			const message = err.response?.data?.message || err.message
			set({ error: message, loading: false })
			return { success: false, message }
		}
	},

	// Регистрация
	registerUser: async userData => {
		set({ loading: true, error: null })
		try {
			const res = await authApi.register(
				userData.first_name,
				userData.email,
				userData.password,
				userData.confirm_password,
				userData.phone,
				userData.birthday,
				userData.gender,
				userData.address
			)
			set({ user: res.data, loading: false })
			return { success: true }
		} catch (err) {
			const message = err.response?.data?.message || err.message
			set({ error: message, loading: false })
			return { success: false, message }
		}
	},

	// Получение профиля
	fetchProfile: async () => {
		set({ loading: true })
		try {
			const res = await authApi.getProfile()
			set({ user: res.data, loading: false })
		} catch (err) {
			const message = err.response?.data?.message || err.message
			set({ error: message, loading: false })
		}
	},

	// Обновление профиля
	updateProfile: async data => {
		set({ loading: true })
		try {
			const res = await authApi.updateProfile(data)
			set({ user: res.data, loading: false })
			return { success: true }
		} catch (err) {
			const message = err.response?.data?.message || err.message
			set({ error: message, loading: false })
			return { success: false, message }
		}
	},

	// Выход
	logoutUser: () => set({ user: null }),
}))
