import AuthInput from '../../component/authInput/AuthInput';
import siteLogo from '../../assets/logo.svg';
import '../RegistPage/RegistPage.scss';
import { Link } from 'react-router-dom';

const RegistPage = () => {
  return (
    <div className="signupContainer">
      <div>
        <img className="logo" src={siteLogo} alt="logo" />
      </div>
      <h1 className="title">建立你的帳號</h1>
      <div className="inputContainer">
        <AuthInput label="帳號" placeholder="請輸入帳號" value="" />

        <AuthInput label="名稱" placeholder="請輸入使用者名稱" value="" />

        <AuthInput label="Email" placeholder="請輸入Email" value="" />

        <AuthInput
          type="password"
          label="密碼"
          placeholder="請設定密碼"
          value=""
        />

        <AuthInput
          type="password"
          label="密碼確認"
          placeholder="請再次輸入密碼"
          value=""
        />
      </div>
      <button className="btn">註冊</button>
      <div className="switchSec">
        <Link to="/login">
          <span className="cancelSwitch">取消</span>
        </Link>
      </div>
    </div>
  );
};

export default RegistPage;
