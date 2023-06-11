import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./page/MainPage/MainPage";
import UserSelf from "./page/userSelfPage/UserSelf";
import LoginPage from "./page/LoginPage";
import RegistPage from "./page/RegistPage";
import LoginAdmin from "./page/LoginAdmin";
import "./base.scss";
import "./reset.scss";

/* import {LoginPage, MainPage, RegistPage} from './page' */
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/user/self" element={<UserSelf />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegistPage />} />
        </Routes>
        {/* 
        <AuthProvider>
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="RegistPage" element={<RegistPage />} />
          </Routes>
        </AuthProvider>*/}
      </div>
    </Router>
  );
}

export default App;
