import AuthInput from "../../component/authInput/AuthInput";
import siteLogo from "../../assets/logo.svg";
import "../LoginAdmin/LoginAdmin.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext";

const LoginAdmin = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [accountError, setAccountError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const { adminLogin, isAuthenticated, currentMember } = useAuth();

  const handleClick = async () => {
    if (account.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
    const { success, error } = await adminLogin({
      account,
      password,
    });

    console.log(error);

    if (success) {
      Swal.fire({
        position: "top",
        title: "登入成功!",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
    } else {
      setAccountError("帳號或密碼不存在");
      setPasswordError("帳號或密碼不存在");
    }
  };

  useEffect(() => {
    if (isAuthenticated && currentMember.role === "admin") {
      navigate("/admin_main");
    }
  }, [navigate, isAuthenticated, currentMember]);

  return (
    <div className="loginAdminContainer">
      <div>
        <img className="logo" src={siteLogo} alt="logo" />
      </div>
      <h1 className="title">後台登入</h1>
      <div className="inputContainer">
        <AuthInput
          label="帳號"
          placeholder="請輸入帳號"
          accountError={accountError}
          value={account}
          onChange={(nameInputValue) => setAccount(nameInputValue)}
        />
        {accountError && <p className="error">{accountError}</p>}

        <AuthInput
          type="password"
          label="密碼"
          placeholder="請輸入密碼"
          passwordError={passwordError}
          value={password}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
        {passwordError && <p className="error">{passwordError}</p>}
      </div>
      <button className="btn" onClick={handleClick}>
        登入
      </button>
      <div className="switchSec">
        <Link to="/login">
          <span className="adminSwitch">前台登入</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginAdmin;
