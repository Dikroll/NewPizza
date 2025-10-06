import Contacts from '@/components/Contacts/ContactsDetails/ContactsDetails'
import Map from '@/components/Contacts/Map/Map'
import './ContactPage.css'
export const ContactPage = () => {
	return (
		<div className='contact-page'>
			<div className='contact-content'>
				<Contacts />
			</div>
			<div className='contact-map'>
				<Map />
			</div>
		</div>
	)
}
