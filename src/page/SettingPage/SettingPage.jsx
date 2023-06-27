import Navbar from "../../component/navbar/Navbar";
import AuthInput from "../../component/authInput/AuthInput";
import PageTag from "../../component/pageTag/PageTag";
import UserInputCollection from "../../component/userSetting/UserInputCollection";
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
        <form className="inputContainer">
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
          <UserInputCollection />
          <button className="btn">儲存</button>
        </form>
      </div>
    </div>
  );
};

export default SettingPage;
