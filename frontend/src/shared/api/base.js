import { config } from '@/shared/lib/constants/config'
import axios from 'axios'

axios.defaults.withCredentials = true

const BASE_URL = config.apiUrl.endsWith('/')
	? config.apiUrl
	: `${config.apiUrl}/`

export const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
})

api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			try {
				await axios.post(
					`${BASE_URL}auth/token/refresh/`,
					{},
					{
						withCredentials: true,
					}
				)
				return api(originalRequest)
			} catch (refreshError) {
				window.location.href = '/login'
				return Promise.reject(refreshError)
			}
		}

		return Promise.reject(error)
	}
)

export { BASE_URL }
