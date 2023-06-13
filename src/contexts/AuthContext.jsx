import { login, register, checkPermission } from '../api/auth';
import { createContext, useState, useEffect, useContext } from 'react';
//IMPORTANT 之後再確認是否可用jwt去解析token去撈user資料
//import * as jwt from 'jsonwebtoken';
//IMPORTANT 驗面切換驗證token, 之後要做
//import { useLocation } from 'react-router-dom';

const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  //IMPORTANT 驗面切換驗證token, 之後要做
  // const { pathname } = useLocation();

  // useEffect(() => {

  //   const checkTokenIsValid = async () => {
  //     const authToken = localStorage.getItem('authToken');
  //     if (!authToken) {
  //       setIsAuthenticated(false);
  //       setPayload(null);
  //       return;
  //     }
  //     const result = await checkPermission(authToken);
  //     if (result) {
  //       setIsAuthenticated(true);
  //       const tempPayload = jwt.decode(authToken);
  //       setPayload(tempPayload);
  //     } else {
  //       setIsAuthenticated(false);
  //       setPayload(null);
  //     }
  //   };

  //   checkTokenIsValid();
  // }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          id: payload.id,
          name: payload.name,
        },
        register: async (data) => {
          const { success, token, user } = await register({
            username: data.username,
            email: data.email,
            password: data.password,
          });
          const tempPayload = user;
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', token);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        adminLogin: async (data) => {
          const { success, token } = await adminLogin({
            account: data.account,
            password: data.password,
          });
          const tempPayload = decodeToken(token);
          console.log(token);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', token);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        logout: () => {
          localStorage.removeItem('authToken');
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
