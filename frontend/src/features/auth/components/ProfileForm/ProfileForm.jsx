import React, { useState, useEffect } from 'react';
import './ProfileForm.css';

const ProfileForm = ({ user, onSave }) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [bonus, setBonus] = useState(0);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || '');
      setEmail(user.email || '');
      setAddress(user.address || '');
      setBirthday(user.birthday || '');
      setGender(user.gender || '');
      setPhone(user.phone || '');
      setBonus(user.bonus || 0);
    }
  }, [user]);

  const SubmitCheck = (e) => {
    e.preventDefault();
    onSave({ first_name: firstName, email, address, birthday, gender, phone });
  };

  return (
    <form className="profile-form" onSubmit={SubmitCheck}>
      <div className="form-row">
        <div className="form-group">
          <label>Имя</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Телефон</label>
          <input type="text" value={phone} disabled />
        </div>
        <div className="form-group">
          <label>Адрес</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>День рождения</label>
          <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Пол</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Дымкоинов</label>
        <p className="bonus-display">{bonus}</p>
      </div>
      
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default ProfileForm;
