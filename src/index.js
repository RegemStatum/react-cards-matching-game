import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// autho
import { Auth0Provider } from "@auth0/auth0-react";
// scss
import "./assets/scss/index.scss";

const redirectTo = ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTHO_DOMAIN}
      clientId={process.env.REACT_APP_AUTHO_CLIENT_ID}
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
