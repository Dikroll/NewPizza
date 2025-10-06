import favicon from '@/assets/images/favicon.svg'
import { useAuthStore } from '@/features/auth/store'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginForm.css'

const LoginForm = () => {
	const [phone, setPhone] = useState('+7')
	const [password, setPassword] = useState('')
	const { loginUser, error, loading } = useAuthStore()
	const navigate = useNavigate()

	const handleLogin = async () => {
		const result = await loginUser(phone, password)
		if (result.success) navigate('/profile')
	}

	return (
		<div className='login-container'>
			<div className='login-wrapper'>
				<div className='login-image'>
					<img src={favicon} alt='Login Illustration' />
				</div>
				<div className='login-card'>
					<h2>Вход</h2>
					{error && <p className='error-message'>{error}</p>}
					<input
						type='text'
						value={phone}
						onChange={e => {
							const value = e.target.value
							if (value.startsWith('+7') && value.length <= 12) setPhone(value)
						}}
					/>
					<input
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<button onClick={handleLogin} disabled={loading}>
						Войти
					</button>
				</div>
			</div>
		</div>
	)
}

export default LoginForm
