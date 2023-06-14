import React from "react";

import "./Login.css";

import { GoogleLogin } from "react-google-login";

const clientId =
  "909444633630-70jp9s6hngh7689ti0nmui954qr1tpub.apps.googleusercontent.com";

export const Login = () => {
  const onSuccess = (res) => {
    console.log("Login Success! Current User: ", res);
  };

  const onFailure = (res) => {
    console.log("Login Failed! res: ", res);
  };

  return (
    <div className="login-page">
      <header className="header">
        <h2>ERN$</h2>
      </header>

      <main className="container">
        <div id="signInButton">
          <p>Saving Today, Smiling Tomorrow!! </p>

          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
        </div>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Copyright</p>

        <div className="names">
          <p>Developed by Ethan, Reid, Nicole, Samira</p>
        </div>
      </footer>
    </div>
  );
};
