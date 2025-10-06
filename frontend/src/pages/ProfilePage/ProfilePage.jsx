import ProfileForm from '@/components/Auth/ProfileForm/ProfileForm'
import { useAuthStore } from '@/features/auth/store'

export const ProfilePage = () => {
	const { user, updateProfile, logoutUser } = useAuthStore()

	if (!user) return null

	const handleSave = async updatedData => {
		await updateProfile(updatedData)
	}

	return (
		<div className='profile-page'>
			<h2>Личные данные</h2>
			<ProfileForm user={user} onSave={handleSave} />
			<button onClick={logoutUser}>Выйти</button>
		</div>
	)
}
