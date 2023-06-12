import AuthInput from '../../component/authInput/AuthInput';
import siteLogo from '../../assets/logo.svg';
import '../LoginPage/LoginPage.scss';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const [useremail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  const handleClick = async () => {
    if (useremail.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
    const success = await login({
      useremail,
      password,
    });
    if (success) {
      Swal.fire({
        position: 'top',
        title: 'Login Successfully!',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });

      return;
    }

    Swal.fire({
      position: 'top',
      title: 'Invalid Login',
      timer: 1000,
      icon: 'error',
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/mainpage');
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="loginContainer">
      <div>
        <img className="logo" src={siteLogo} alt="logo" />
      </div>
      <h1 className="title">登入Alphitter</h1>
      <div className="inputContainer">
        <AuthInput
          label="帳號"
          value={useremail}
          placeholder={'請輸入帳號'}
          onChange={(nameInputValue) => setUserEmail(nameInputValue)}
        />

        <AuthInput
          type="password"
          label="密碼"
          value={password}
          placeholder={'請輸入密碼'}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </div>
      <button className="btn" onClick={handleClick}>
        登入
      </button>
      <div className="switchSec">
        <Link to="/signup">
          <span className="signupSwitch">註冊</span>
        </Link>
        <span className="dot"></span>
        <span className="adminSwitch">後台登入</span>
      </div>
    </div>
  );
};

export default LoginPage;
