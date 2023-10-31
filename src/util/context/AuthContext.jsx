import React, { createContext, useContext, useReducer } from "react";

const intitalState = { token: null, role: null };

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, token: action.token, role: action.role };
    case "LOGOUT":
      return { ...state, token: null };
    default:
      return state;
  }
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, intitalState);

  const login = (token,role) => {
    console.log(role)
    dispatch({ type: "LOGIN", token, role });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ token: state.token, role: state.role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContextExport = () => {
  const contextValue = useContext(AuthContext);
  return contextValue;
};

export default AuthProvider;
