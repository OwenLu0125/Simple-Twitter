import Navbar from '../../component/navbar/Navbar';
import AuthInput from '../../component/authInput/AuthInput';
import PageTag from '../../component/pageTag/PageTag';
import '../SettingPage/SettingPage.scss';

const SettingPage = () => {
  return (
    <div className="settingMainContainer">
      <div className="navContainer">
        <Navbar />
      </div>
      <div className="settingContainer">
        <PageTag />
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

        <button className="btn">儲存</button>
      </div>
    </div>
  );
};

export default SettingPage;
