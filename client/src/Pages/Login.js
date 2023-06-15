import React, { useState } from "react";
import "./Login.css";
import { GoogleLogin } from "react-google-login";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Logout } from "./Logout";

const clientId =
  "909444633630-70jp9s6hngh7689ti0nmui954qr1tpub.apps.googleusercontent.com";

export const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [firstname, setFirstname] = useState("");

  const onSuccess = (res) => {
    setLoggedIn(true);
    setFirstname(res.profileObj.name);
    console.log("Login Success! Current User:", res.profileObj.name);
  };

  const onFailure = (res) => {
    setLoggedIn(false);
    console.log("Login Failed! res:", res);
  };

  // Render different content based on login state
  if (loggedIn) {
    return (
      <div className="login-page">
        <Header loggedIn={loggedIn} firstname={firstname} />
        <main className="container">
          <div id="loggedInContent">
            <h3>Don't save what is left after spending; spend what is left after saving!</h3>
           
          </div>
        </main>
        <Logout />
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="login-page">
        <Header loggedIn={loggedIn} firstname={firstname} />
        <main className="container">
          <div id="signInButton">
            <p>Saving Today, Smiling Tomorrow!!</p>
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
        <Footer />
      </div>
    );
  }
};
