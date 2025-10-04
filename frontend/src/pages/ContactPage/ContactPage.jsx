import React from 'react';
import Map from '@/components/Contacts/Map/Map'; 
import Contacts from '@/components/Contacts/ContactsDetails/ContactsDetails'; 
import "./ContactPage.css"
const ContactPage = () => {
    return (
        <div className="contact-page">
            <div className="contact-content">
                <Contacts />
            </div>
            <div className="contact-map">
                <Map />
            </div>
        </div>
    );
};

export default ContactPage;
