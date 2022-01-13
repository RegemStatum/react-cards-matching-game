import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../components";

const Login = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading, error } =
    useAuth0();
  const isUser = isAuthenticated && user;

  if (isLoading) {
    return (
      <section className="login-page container section-p page-min-height">
        <h3>Loading...</h3>
      </section>
    );
  }
  if (error) {
    return (
      <section className="login-page container section-p page-min-height">
        <h3>{error.message}</h3>
      </section>
    );
  }

  return (
    <section className="login-page container section-p page-min-height">
      <h2 className="accent-3">Login page</h2>
      {isUser && (
        <div className="user-info">
          <img className="login-img" src={user.picture} alt={user.name} />
          <h4>
            <span className="dark-red-text">Your name: </span>
          </h4>
          <h5>{user.name}</h5>
          <h4>
            <span className="dark-yellow-text">Your nickname: </span>
          </h4>
          <h5>{user.nickname}</h5>
          <h4>
            <span className="dark-green-text">Your email: </span>
          </h4>
          <h5>{user.email}</h5>
        </div>
      )}

      {isUser ? (
        <Button onClick={() => logout({ returnTo: window.location.origin })}>
          Log out
        </Button>
      ) : (
        <Button onClick={() => loginWithRedirect()}>Log in</Button>
      )}
    </section>
  );
};

export default Login;
