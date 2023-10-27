import React, { createContext, useContext, useReducer } from "react";

const intitalState = { token: null };

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, token: action.token };
    case "LOGOUT":
      return { ...state, token: null };
    default:
      return state;
  }
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, intitalState);

  const login = (token) => {
    dispatch({ type: "LOGIN", token });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ token: state.token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContextExport = () => {
  const contextValue = useContext(AuthContext);
  return contextValue;
};

export default AuthProvider;
