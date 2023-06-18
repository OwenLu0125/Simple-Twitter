import AuthInput from '../../component/authInput/AuthInput';
import siteLogo from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../contexts/AuthContext';
import '../RegistPage/RegistPage.scss';

const RegistPage = () => {
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const navigate = useNavigate();

  const { register, isAuthenticated } = useAuth();

  const handleClick = async () => {
    if (account.length === 0) {
      return;
    }

    if (name.length === 0 || name.length > 50) {
      return;
    }

    if (email.length === 0) {
      return;
    }

    if (password.length === 0) {
      return;
    }

    if (checkPassword.length === 0) {
      return;
    }

    const success = await register({
      name,
      account,
      password,
      checkPassword,
      email,
    });

    if (success) {
      Swal.fire({
        position: 'top',
        title: '註冊成功!',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });

      return;
    }

    Swal.fire({
      position: 'top',
      title: '註冊失敗',
      timer: 1000,
      icon: 'error',
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="signupContainer">
      <div>
        <img className="logo" src={siteLogo} alt="logo" />
      </div>
      <h1 className="title">建立你的帳號</h1>
      <div className="inputContainer">
        <AuthInput
          label="帳號"
          placeholder="請輸入帳號"
          value={account}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
        />

        <AuthInput
          label="名稱"
          placeholder="請輸入使用者名稱"
          value={name}
          onChange={(nameInputValue) => setName(nameInputValue)}
        />

        <AuthInput
          label="Email"
          placeholder="請輸入Email"
          value={email}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
        />

        <AuthInput
          type="password"
          label="密碼"
          placeholder="請設定密碼"
          value={password}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />

        <AuthInput
          type="password"
          label="密碼確認"
          value={checkPassword}
          onChange={(checkedPasswordInputValue) =>
            setCheckPassword(checkedPasswordInputValue)
          }
        />
      </div>
      <button className="btn" onClick={handleClick}>
        註冊
      </button>
      <div className="switchSec">
        <Link to="/login">
          <span className="cancelSwitch">取消</span>
        </Link>
      </div>
    </div>
  );
};

export default RegistPage;
