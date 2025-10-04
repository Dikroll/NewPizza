import { useState } from 'react';
import { useAuth } from '@/context/UseAuth';
import { useNavigate } from 'react-router-dom';
import favicon from '@/assets/images/favicon.svg'; 
import {validatePhone} from '@/utils/validateData'
import './LoginForm.css';


const LoginForm = () => {
  const [phone, setPhone] = useState('+7');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const Login = async () => {
    if (!validatePhone(phone)) {
      setError('Phone number must start with +7 and contain 10 digits.');
      return;
    }
    const result = await loginUser(phone, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  const Navigate = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-image">
          <img src={favicon} alt="Login Illustration" />
        </div>
        <div className="login-card">
          <h2 className="login-title">Вход</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            
            <input
              type="text"
              placeholder="Номер телефона"
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
          <button className="login-button" onClick={Login}>
            Войти
          </button>
          <p className="forgot-password">Забыли пароль?</p>
          <p className="register-text" onClick={Navigate}>
            Создать аккаунт →
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
