import LoginForm from '@/features/auth/components/LoginForm/LoginForm'
import './LoginPage.css'

export const LoginPage = () => {
	return (
		<div className='login-page'>
			<div className='login-content'>
				<LoginForm />
			</div>
		</div>
	)
}
