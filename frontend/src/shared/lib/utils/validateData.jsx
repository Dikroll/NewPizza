
export const validatePhone = (phone) => {
    const cleanedPhone = phone.replace(/[^\d+]/g, '');
    const phoneReg = /^\+7\d{10}$/;
    return phoneReg.test(cleanedPhone);
  };

export const validateEmail = (email) => {
  const validEmailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!email) return false;

  const emailParts = email.split('@');

  if (emailParts.length !== 2) return false;

  const account = emailParts[0];
  const domain = emailParts[1];

  if (account.length > 64) return false;
  else if (domain.length > 255) return false;

  const domainParts = domain.split('.');
  
  if (domainParts.some((part) => part.length > 63)) return false;

  return validEmailRegex.test(email);
};


export const validatePassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const validatePasswordStrength = (password) => {
    if (password.length < 8) {
      
        return 'Пароль должен содержать минимум 8 символов';
    }

    if (!/[A-Z]/.test(password)) {
      
        return 'Пароль должен содержать хотя бы одну букву в верхнем регистре';
    }
    return '';
  };
  