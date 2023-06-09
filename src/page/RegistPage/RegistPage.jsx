import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AuthInput from "../../component/authInput/AuthInput";
import siteLogo from "../../assets/logo.svg";
import Swal from "sweetalert2";
import "../RegistPage/RegistPage.scss";

const RegistPage = () => {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { register, isAuthenticated } = useAuth();

  const handleClick = async () => {
    setErrors({});

    const newErrors = {};

    if (!account.length) {
      newErrors.account = "請輸入帳號";
    } else if (account.length < 6) {
      newErrors.account = "帳號長度需至少為6個字符";
    } else if (!/^[a-zA-Z0-9]+$/.test(account)) {
      newErrors.account = "帳號只能包含字母和數字";
    }

    if (!name.length) {
      newErrors.name = "請輸入名稱";
    } else if (name.length > 50) {
      newErrors.name = "名字不可超過50個字";
    } else if (!/^[a-zA-Z0-9\s]+$/.test(name)) {
      newErrors.name = "名稱只能包含字母、數字和空格";
    }

    if (!email.length) {
      newErrors.email = "請輸入Email";
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      newErrors.email = "請輸入有效的Email地址";
    }

    if (!password.length) {
      newErrors.password = "請輸入密碼";
    } else if (password.length < 8) {
      newErrors.password = "密碼長度需至少為8個字符";
    } else if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/.test(password)) {
      newErrors.password = "密碼需包含字母、數字和特殊字符";
    }

    if (!checkPassword.length) {
      newErrors.checkPassword = "請再次輸入密碼";
    } else if (checkPassword !== password) {
      newErrors.checkPassword = "密碼不一致";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const success = await register({
        name,
        account,
        password,
        checkPassword,
        email,
      });

      if (success) {
        Swal.fire({
          position: "top",
          title: "註冊成功!",
          timer: 1000,
          icon: "success",
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("[Registration]:", error);
      if (error === "Account already registered!") {
        setErrors({ account: "此帳號已註冊" });
      }
      if (error === "Name too long") {
        setErrors({ name: "名字不可超過50個字" });
      }
      if (error === "Email already exists!") {
        setErrors({ email: "此email已註冊" });
      }
      if (error === "Password do not match") {
        setErrors({ checkPassword: "密碼不一致" });
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="signUpContainer">
      <div>
        <img className="logo" src={siteLogo} alt="logo" />
      </div>
      <h1 className="title">建立你的帳號</h1>
      <div className="inputContainer">
        <AuthInput
          label="帳號"
          placeholder="請輸入帳號"
          name="account"
          value={account}
          error={errors.account}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
        />
        {errors.account && <p className="error">{errors.account}</p>}

        <AuthInput
          label="名稱"
          placeholder="請輸入使用者名稱"
          name="name"
          value={name}
          error={errors.name}
          onChange={(nameInputValue) => setName(nameInputValue)}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <AuthInput
          label="Email"
          placeholder="請輸入Email"
          name="email"
          value={email}
          error={errors.email}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <AuthInput
          type="password"
          label="密碼"
          placeholder="請設定密碼"
          name="password"
          value={password}
          error={errors.password}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <AuthInput
          type="password"
          label="密碼確認"
          placeholder="請再次輸入密碼"
          name="checkPassword"
          value={checkPassword}
          error={errors.checkPassword}
          onChange={(checkPasswordInputValue) =>
            setCheckPassword(checkPasswordInputValue)
          }
        />
        {errors.checkPassword && (
          <p className="error">{errors.checkPassword}</p>
        )}
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
