import AuthInput from '../../component/authInput/AuthInput';
import siteLogo from '../../assets/logo.svg';
import '../LoginAdmin/LoginAdmin.scss';

const LoginAdmin = () => {
  return (
    <div className="loginAdminContainer">
      <div>
        <img className="logo" src={siteLogo} alt="logo" />
      </div>
      <h1 className="title">後台登入</h1>
      <div className="inputContainer">
        <AuthInput label="帳號" placeholder="請輸入帳號" value="" />

        <AuthInput
          type="password"
          label="密碼"
          placeholder="請輸入密碼"
          value=""
        />
      </div>
      <button className="btn">登入</button>
      <div className="switchSec">
        <span className="adminSwitch">前台登入</span>
      </div>
    </div>
  );
};

export default LoginAdmin;
