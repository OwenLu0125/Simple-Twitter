import UserSettingInput from "./userSettingInput/UserSettingInput";
import { useState } from "react";

// label="帳號" placeholder="請輸入帳號" value=""
/*
邏輯：
1. 點擊後先對資料進行驗證，確認是否符合格式
2. 把資料排列成符合要求的格式
3. 用try catch 的方式送出請求
*/

const UserInputCollection = () => {
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  return (
    <div>
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
    </div>
  );
};

export default UserInputCollection;
