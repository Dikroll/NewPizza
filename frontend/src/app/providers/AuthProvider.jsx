import {
	authenticated_user,
	login,
	logout,
	refresh_token,
	register,
} from '@/shared/api'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	const get_authenticated_user = async () => {
		try {
			const user = await authenticated_user()
			setUser(user)
		} catch (error) {
			setUser(null)
		} finally {
			setLoading(false)
		}
	}

	const loginUser = async (phone, password) => {
		try {
			const user = await login(phone, password)
			if (user) {
				setUser(user)
				navigate('/')
				return { success: true }
			} else {
				return {
					success: false,
					message: 'Неверный номер телефона или пароль.',
				}
			}
		} catch (error) {
			return {
				success: false,
				message: error.response?.data?.detail || 'Неизвестная ошибка',
			}
		}
	}

	const logoutUser = async () => {
		await logout()
		setUser(null)
		navigate('/')
	}

	const registerUser = async (
		first_name,
		email,
		password,
		confirm_password,
		phone,
		birthday,
		gender,
		address
	) => {
		try {
			if (password !== confirm_password) {
				return { success: false, message: 'Пароли не совпадают!' }
			}
			await register(
				first_name,
				email,
				password,
				confirm_password,
				phone,
				birthday,
				gender,
				address
			)
			navigate('/login')
			return { success: true }
		} catch (error) {
			return {
				success: false,
				message: error.response?.data?.detail || 'Неизвестная ошибка.',
			}
		}
	}

	const refreshToken = async () => {
		try {
			await refresh_token()
		} catch (error) {
			console.error('Token refresh failed:', error)
		}
	}

	useEffect(() => {
		get_authenticated_user()
	}, [])

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				loginUser,
				logoutUser,
				registerUser,
				refreshToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
