import React from "react";
import ThemeProvider from "./ThemeProvider";

const AuthProvider = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default AuthProvider;
