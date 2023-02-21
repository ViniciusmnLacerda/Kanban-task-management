/* eslint-disable no-magic-numbers */
import { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { IoPersonOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router';
import Loading from '../components/Loading';
import StatusCode from '../enums/StatusCode';
import HandleAccount from '../service/HandleAccount';
import '../styles/Register.css';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordChek, setShowPasswordCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEmailsEqual, setIsEmailsEqual] = useState(true);
  const [isPasswordsEqual, setIsPasswordsEqual] = useState(true);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [doHaveProblems, setDoHaveProblems] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: '',
    lastName: '',
    checkEmail: '',
    checkPassword: '',
  });
  const [validations, setValidations] = useState({
    email: true,
    emailCheck: false,
    password: false,
    passwordCheck: false,
    name: false,
    lastName: false,
  });
  const handleAccount = new HandleAccount();

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const toggleVisibility = (
    e: React.FormEvent<HTMLButtonElement>,
    where = '',
  ) => {
    e.preventDefault();
    if (where === 'check') setShowPasswordCheck(!showPasswordChek);
    else setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (userData.password !== userData.checkPassword) setIsPasswordsEqual(false);
    else setIsPasswordsEqual(true);
    if (userData.email !== userData.checkEmail) {
      setIsEmailsEqual(false);
      setIsBtnDisabled(true);
    } else {
      setIsEmailsEqual(true);
      setIsBtnDisabled(false);
    }
  }, [userData.checkEmail, userData.checkPassword]);

  useEffect(() => {
    const isDataInvalid = Object.values(validations).every(Boolean);
    setIsBtnDisabled(!isDataInvalid);
  }, [validations]);

  useEffect(() => {
    setValidations({
      email: userData.email.length > 3,
      emailCheck: userData.checkEmail === userData.email,
      password: userData.password.length > 3,
      passwordCheck: userData.checkPassword === userData.password,
      name: userData.name.length > 2,
      lastName: userData.lastName.length > 2,
    });
  }, [userData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const result = await handleAccount.postRegister({
      name: userData.name,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.checkPassword });
    if (result?.status === StatusCode.CREATED) {
      setLoading(false);
      navigate('/');
    } else {
      setLoading(false);
      setDoHaveProblems(true);
    }
  };

  return (
    <div className="register">
      <div className="register-card">
        <div className="logo">
          <IoPersonOutline />
        </div>
        <h1>Register</h1>
        <form onSubmit={ (e) => handleSubmit(e) }>
          <label className="lbl" htmlFor="name">
            <input
              className="text-box"
              type="text"
              placeholder="Your name"
              autoComplete="off"
              value={ userData.name }
              onChange={ (e) => handleChange(e) }
              id="name"
              name="name"
            />
          </label>
          <label className="lbl" htmlFor="lastName">
            <input
              className="text-box"
              type="text"
              placeholder="Your last name"
              autoComplete="off"
              value={ userData.lastName }
              onChange={ (e) => handleChange(e) }
              id="lastName"
              name="lastName"
            />
          </label>
          <label className="lbl" htmlFor="email">
            <input
              className="text-box"
              type="email"
              placeholder="Your e-mail"
              autoComplete="off"
              value={ userData.email }
              onChange={ (e) => handleChange(e) }
              id="email"
              name="email"
            />
          </label>
          <label className="lbl" htmlFor="checkEmail">
            <input
              className="text-box"
              type="email"
              placeholder="Please type your e-mail again"
              autoComplete="off"
              value={ userData.checkEmail }
              onChange={ (e) => handleChange(e) }
              id="checkEmail"
              name="checkEmail"
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
              placeholder="Your password"
              autoComplete="off"
              value={ userData.password }
              onChange={ (e) => handleChange(e) }
              id="password"
              name="password"
            />
          </label>
          <label className="lbl" htmlFor="checkPassword">
            <button
              type="button"
              onClick={ (e) => toggleVisibility(e, 'check') }
            >
              { showPasswordChek
                ? <AiFillEye fontSize={ 22 } />
                : <AiFillEyeInvisible fontSize={ 22 } /> }
            </button>
            <input
              className="text-box"
              type={ showPasswordChek ? 'text' : 'password' }
              placeholder="Please type your password again"
              autoComplete="off"
              value={ userData.checkPassword }
              onChange={ (e) => handleChange(e) }
              id="checkPassword"
              name="checkPassword"
            />
          </label>
          <button
            disabled={ isBtnDisabled }
            className="login-btn"
          >
            {loading ? <Loading
              color="#fdfefb"
              width="25px"
              height="25px"
            /> : 'Sing Up'}
          </button>
          <footer className="login-footer">
            {!isPasswordsEqual && <p>Passwords are not the same</p>}
            {!isEmailsEqual && <p>E-mails are not the same</p>}
            {doHaveProblems && <p>Somethin is wrong. Try again later</p>}
          </footer>
        </form>
      </div>
    </div>
  );
}
