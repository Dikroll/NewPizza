import { api } from '@/shared/api/base'

export const authApi = {
	login: (phone, password) => api.post('auth/login/', { phone, password }),

	logout: () => api.post('auth/logout/'),

	register: (
		first_name,
		email,
		password,
		confirm_password,
		phone,
		birthday,
		gender,
		address
	) =>
		api.post('auth/register/', {
			first_name,
			email,
			password,
			confirm_password,
			phone,
			birthday,
			gender,
			address,
		}),

	refreshToken: () => api.post('auth/token/refresh/'),

	getAuthenticatedUser: () => api.get('auth/authenticated/'),

	getProfile: () => api.get('auth/profile/'),

	updateProfile: userData => api.put('auth/profile/', userData),
}
