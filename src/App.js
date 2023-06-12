import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './page/MainPage/MainPage';
import UserSelf from './page/userSelfPage/UserSelf';
import LoginPage from './page/LoginPage/LoginPage';
import RegistPage from './page/RegistPage/RegistPage';
import LoginAdmin from './page/LoginAdmin/LoginAdmin';
import SettingPage from './page/SettingPage/SettingPage';
import UsersDashboard from './page/UsersDashboard/UsersDashboard';
import './base.scss';
import './reset.scss';
import { AuthProvider } from './contexts/AuthContext';


/* import {LoginPage, MainPage, RegistPage} from './page' */
function App() {
  return (
    <Router>
      <div className="app">
        <AuthProvider>
          <Routes>
            <Route path="/mainPage" element={<MainPage />} />
            <Route path="/user/self" element={<UserSelf />} />
            <Route path="/login_admin" element={<LoginAdmin />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegistPage />} />
            <Route path="/settings" element={<SettingPage />} />
            <Route path="/admin_users" element={<UsersDashboard />} />
          </Routes>
        </AuthProvider>
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
