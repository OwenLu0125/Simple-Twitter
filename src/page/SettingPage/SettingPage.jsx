// 元件
import Navbar from "../../component/navbar/Navbar";
import PageTag from "../../component/pageTag/PageTag";
import UserSettingInput from "../../component/userSetting/userSettingInput/UserSettingInput";
import "../SettingPage/SettingPage.scss";
import { useAuth } from "../../contexts/AuthContext";
// Hook
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// api
import { getUseSettingInfo, putUseSettingInfo } from "../../api/userSetting";

const SettingPage = () => {
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userChangeData = {
      name: userName,
      account: account,
      email: email,
      password: password,
      checkPassword: passwordCheck,
    };
    try {
      const res = await putUseSettingInfo(userChangeData);
      // console.log(res.data);
      if (res.status === 200) {
        console.log("success");
      }
    } catch (error) {
    }
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
        <form className="inputContainer" >
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
          <button className="btn" onClick={handleSubmit}>
            儲存
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingPage;
