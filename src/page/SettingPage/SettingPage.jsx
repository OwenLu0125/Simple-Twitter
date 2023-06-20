import Navbar from "../../component/navbar/Navbar";
import AuthInput from "../../component/authInput/AuthInput";
import PageTag from "../../component/pageTag/PageTag";
import "../SettingPage/SettingPage.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

const SettingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  return (
    <div className="settingMainContainer">
      <div className="navContainer">
        <Navbar />
      </div>
      <div className="settingContainer">
        <PageTag title="帳戶設定" />
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
