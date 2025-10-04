import { useState } from 'react';
import { useAuth } from '@/context/UseAuth';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css'; 
import favicon from '@/assets/images/favicon.svg'; 
import {validatePhone, validateEmail, validatePassword, validatePasswordStrength} from '@/utils/validateData'

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phone, setPhone] = useState('+7');
  const [error, setError] = useState('');

  const { registerUser } = useAuth();
  const nav = useNavigate();

  const Register = async () => {
    if (!validatePassword(password, passwordConfirm)) {
      setError('Пароли не совпадают!');
      return;
    }

    const passwordStrengthError = validatePasswordStrength(password);
    if (passwordStrengthError) {
      setError(passwordStrengthError);
      return;
    }

    if (!validatePhone(phone)) {
      setError('Номер телефона недоступен');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('email недопустим');
      return;
    }
    const result = await registerUser(firstName, email, password, passwordConfirm, phone);
    if (!result.success) {
      setError(result.message);
    } else {
      setError(''); 
      alert('Пользователь успешно зарегистрирован');
      nav('/login');
    }
  };

  const HaveAcc = () => {
    nav('/login');
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-image">
          <img src={favicon} alt="Login" />
        </div>

        <div className="login-card">
          <h2 className="login-title">Регистрация</h2>
          
          {error && <p className="error-message" style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}

          <div className="input-group">
            <input
              type="text"
              placeholder="Имя"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Телефон"
              value={phone}
              onChange={(e) => {
                const value = e.target.value;
                if (value.startsWith('+7') && value.length <= 12) {
                  setPhone(value);
                }
              }}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Подтверждение пароля"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <button className="login-button" onClick={Register}>
            Зарегистрироваться
          </button>

          <p className="register-login-link" onClick={HaveAcc}>
            Уже есть аккаунт? Войти
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
