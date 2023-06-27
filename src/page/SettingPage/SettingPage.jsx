import Navbar from "../../component/navbar/Navbar";
// import AuthInput from "../../component/authInput/AuthInput";
import PageTag from "../../component/pageTag/PageTag";
// import UserInputCollection from "../../component/userSetting/UserInputCollection";
import UserSettingInput from "../../component/userSetting/userSettingInput/UserSettingInput";
import "../SettingPage/SettingPage.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";

const SettingPage = () => {
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userChangeData = {
      name: "user2set",
      account: "user2set",
      email: "user2set@example.com",
      password: "12345678",
      checkPassword: "12345678",
    };
    // console.log(userChangeData);
  };

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
        <form className="inputContainer" onSubmit={handleSubmit}>
          {/* 這裡可能需要把所有輸入值，做成一個新元件，統一做管理 。
          TODO:
              3. 盤點需要的資料
              4. 跟後端確認api的使用方式
              5. 確認input有哪些預設屬性可以使用
          */}
          {/* 目前的架構設計:
            1. 第一次渲染先從apiservice拿到資料
            2.                           
          */}
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
            value={passwordCheck}
            onChange={(passwordCheck) => setPasswordCheck(passwordCheck)}
          />
          <button className="btn">儲存</button>
        </form>
      </div>
    </div>
  );
};

export default SettingPage;
