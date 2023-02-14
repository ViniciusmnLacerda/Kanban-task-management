import { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { IoPersonOutline } from 'react-icons/io5';
import Loading from '../components/Loading';
import '../styles/Register.css';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordChek, setShowPasswordCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEmailsEqual, setIsEmailsEqual] = useState(true);
  const [isPasswordsEqual, setIsPasswordsEqual] = useState(true);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: '',
    lastName: '',
    checkEmail: '',
    checkPassword: '',
  });

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const toggleVisibility = (
    e: React.FormEvent<HTMLButtonElement>,
    where: string = '',
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

  // useEffect(() => {
  //   const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  //   const validations = [
  //     userData.name.length > 2,
  //     userData.lastName.length > 2,
  //     userData.password.length > 2,
  //     emailRegex.test(userData.email),
  //     isEmailsEqual,
  //     isPasswordsEqual,
  //   ];
  //   const isDataInvalid = validations.every((boolean) => boolean === true);
  //   console.log(validations);
  //   setIsBtnDisabled(!isDataInvalid);

  //   if (userData.email === userData.checkEmail && userData.email.length > 0) {
  //     setIsEmailValid(emailRegex.test(userData.email));
  //     if (!isEmailValid) setIsBtnDisabled(true);
  //   }
  // }, [userData.email, userData.name, userData.lastName, userData.password]);

  return (
    <div className="register">
      <div className="register-card">
        <div className="logo">
          <IoPersonOutline />
        </div>
        <h1>Register</h1>
        <form>
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
            {!isEmailValid && <p>E-mail are not valid</p>}
          </footer>
        </form>
      </div>
    </div>
  );
}
