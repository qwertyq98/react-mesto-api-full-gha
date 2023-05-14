import React from 'react';
import { useForm } from '../hooks/useForm.js';

const Login = ({ onSubmit }) => {
  const {formValue, handleChange} = useForm({
    password: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValue);
  }

  return (
    <div className="login">
      <div className='auth'>
        <h2 className="auth__title">Вход</h2>
        <form onSubmit={handleSubmit} className="auth__form">
          <input required id="email" name="email" type="email" value={formValue.email} placeholder='Email'
          className = "auth__input" onChange={handleChange} />
          <input required id="password" name="password" type="password" value={formValue.password} placeholder='Пароль' 
          className = "auth__input" onChange={handleChange} />
          <button type="submit" className="auth__button">Войти</button>
        </form>
      </div>
    </div>
  )
}

export default Login;