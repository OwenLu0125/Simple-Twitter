import { login, register, adminLogin, checkPermission } from "../api/auth";
import { createContext, useState, useEffect, useContext } from "react";
import { decodeToken } from "react-jwt";
import { useLocation } from "react-router-dom";

const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  adminLogin: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  const { pathname } = useLocation();

  //IMPORTANT 之後還要跟後端確認是否有做/test-token api, 然後再作修改
  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        setIsAuthenticated(true);
        const tempPayload = decodeToken(authToken);
        setPayload(tempPayload);
      } else {
        setIsAuthenticated(false);
        setPayload(null);
      }
    };

    checkTokenIsValid();
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          id: payload.id,
          name: payload.name,
          account: payload.account,
          email: payload.email,
          avatar: payload.avatar,
          introduction: payload.introduction,
          role: payload.role,
          banner: payload.banner,
          createdAt: payload.createdAt,
          updateAT: payload.updateAT,
        },

        register: async (data) => {
          const { success } = await register({
            name: data.name,
            email: data.email,
            account: data.account,
            password: data.password,
            checkPassword: data.checkPassword,
          });

          if (success) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
          return success;
        },
        login: async (data) => {
          const { success, token } = await login({
            account: data.account,
            password: data.password,
          });
          const tempPayload = decodeToken(token);

          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem("authToken", token);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        adminLogin: async (data) => {
          const { success, token, error } = await adminLogin({
            account: data.account,
            password: data.password,
          });
          const tempPayload = decodeToken(token);
          console.log(token);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem("authToken", token);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return { success, error };
        },
        logout: () => {
          localStorage.removeItem("authToken");
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
