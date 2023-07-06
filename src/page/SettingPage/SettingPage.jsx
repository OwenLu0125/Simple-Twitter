import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUseSettingInfo, putUseSettingInfo } from "../../api/userSetting";
import Navbar from "../../component/navbar/Navbar";
import PageTag from "../../component/pageTag/PageTag";
import UserSettingInput from "../../component/userSetting/UserSettingInput";
import "../SettingPage/SettingPage.scss";
import MobileMenu from "../../component/mobileMode/mobileMenu/MobileMenu";

const SettingPage = () => {
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userChangeData = {
      name: userName,
      account: account,
      email: email,
      password: password,
      checkPassword: checkPassword,
    };

    const res = await putUseSettingInfo(userChangeData);
    if (res.status === 200) {
      console.log("success");
    }
  };

  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    getUseSettingInfo().then((res) => {
      setAccount(res.data.account);
      setUserName(res.data.name);
      setEmail(res.data.email);
    });
  }, []);

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
        <form className="inputContainer">
          <UserSettingInput
            label="帳號"
            placeholder="請輸入帳號"
            value={account}
            onChange={(accountInputValue) => setAccount(accountInputValue)}
          />
          <UserSettingInput
            label="名稱"
            placeholder="請輸入使用者名稱"
            value={userName}
            onChange={(userNameInputValue) => setUserName(userNameInputValue)}
          />
          <UserSettingInput
            label="Email"
            placeholder="請輸入Email"
            value={email}
            onChange={(emailInputValue) => setEmail(emailInputValue)}
          />
          <UserSettingInput
            type="password"
            label="密碼"
            placeholder="請設定密碼"
            value={password}
            onChange={(passwordInputValue) => setPassword(passwordInputValue)}
          />
          <UserSettingInput
            type="password"
            label="密碼確認"
            placeholder="請再次輸入密碼"
            value={checkPassword}
            onChange={(checkPasswordInputValue) =>
              setCheckPassword(checkPasswordInputValue)
            }
          />
          <button className="btn" onClick={handleSubmit}>
            儲存
          </button>
        </form>
        <div className="logoutBtn">
          <span className="logout" onClick={handleClick}>
            登出
          </span>
        </div>
      </div>
      <MobileMenu />
    </div>
  );
};

export default SettingPage;
