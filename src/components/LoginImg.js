import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const LoginImg = () => {
  const { isAuthenticated, user } = useAuth0();
  const isUser = isAuthenticated && user;

  if (!isUser) {
    return <>Login</>;
  }
  if (isUser && user.picture) {
    return <img className="login-img" src={user.picture} alt={user.name} />;
  }
  if (isUser) {
    return <>Logout</>;
  }
};

export default LoginImg;
