import RegisterForm from '@/features/auth/components/RegisterForm/RegisterForm'
import './RegisterPage.css'

export const RegisterPage = () => {
	return (
		<div className='register-page'>
			<div className='register-content'>
				<RegisterForm />
			</div>
		</div>
	)
}
