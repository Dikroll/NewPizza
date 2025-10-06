import { useState } from 'react'
import { authApi } from './api/auth'

export const useLogin = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const login = async (phone, password) => {
		setLoading(true)
		setError(null)
		try {
			const res = await authApi.login(phone, password)
			setLoading(false)
			return { success: true, data: res.data }
		} catch (err) {
			setLoading(false)
			setError(err.response?.data || err.message)
			return {
				success: false,
				message: err.response?.data?.message || err.message,
			}
		}
	}

	return { login, loading, error }
}

export const useRegister = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const register = async userData => {
		setLoading(true)
		setError(null)
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
			setLoading(false)
			return { success: true, data: res.data }
		} catch (err) {
			setLoading(false)
			setError(err.response?.data || err.message)
			return {
				success: false,
				message: err.response?.data?.message || err.message,
			}
		}
	}

	return { register, loading, error }
}

export const useProfile = () => {
	const [profile, setProfile] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const fetchProfile = async () => {
		setLoading(true)
		try {
			const res = await authApi.getProfile()
			setProfile(res.data)
			setLoading(false)
		} catch (err) {
			setError(err.response?.data || err.message)
			setLoading(false)
		}
	}

	const updateProfile = async userData => {
		setLoading(true)
		try {
			const res = await authApi.updateProfile(userData)
			setProfile(res.data)
			setLoading(false)
			return { success: true, data: res.data }
		} catch (err) {
			setError(err.response?.data || err.message)
			setLoading(false)
			return {
				success: false,
				message: err.response?.data?.message || err.message,
			}
		}
	}

	return { profile, loading, error, fetchProfile, updateProfile }
}
