import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { IoPersonOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import '../styles/Login.css';

export default function Login() {
  const [creadentials, setCretendials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setCretendials({
      ...creadentials,
      [name]: value,
    });
  };

  const toggleVisibility = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
  };

  return (
    <div
      className="login"
    >
      <div className="login-card">
        <div className="logo">
          <IoPersonOutline />
        </div>
        <h1>Kanban</h1>
        <form onSubmit={ (e) => handleSubmit(e) }>
          <label className="lbl" htmlFor="email">
            <input
              className="text-box"
              type="email"
              placeholder="E-mail"
              autoComplete="off"
              value={ creadentials.email }
              onChange={ (e) => handleChange(e) }
              id="email"
              name="email"
            />
          </label>
          <label className="lbl" htmlFor="password">
            <button
              type="button"
              onClick={ (e) => toggleVisibility(e) }
            >
              { showPassword
                ? <AiFillEye fontSize={ 22 } />
                : <AiFillEyeInvisible fontSize={ 22 } /> }
            </button>
            <input
              className="text-box"
              type={ showPassword ? 'text' : 'password' }
              placeholder="Password"
              autoComplete="off"
              value={ creadentials.password }
              onChange={ (e) => handleChange(e) }
              id="password"
              name="password"
            />
          </label>
          <button className="login-btn">
            {loading ? <Loading
              color="#fdfefb"
              width="25px"
              height="25px"
            /> : 'Login'}
          </button>
          <footer className="login-footer">
            <Link to="/register">Don&apos;t have an account?</Link>
          </footer>
        </form>
      </div>
    </div>
  );
}
