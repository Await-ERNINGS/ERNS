import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { gapi } from "gapi-script";
import "./App.css";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";
import { Welcome } from "./Pages/Welcome";

const clientId = "909444633630-70jp9s6hngh7689ti0nmui954qr1tpub.apps.googleusercontent.com";

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const initGoogleClient = async () => {
      await gapi.client.init({
        clientId: clientId,
        scope: "email", // Adjust the scope according to your requirements
      });
    };

    gapi.load("client:auth2", initGoogleClient);
  }, []);

  useEffect(() => {
    const fetchMethod = async () => {
      try {
        const response = await fetch("http://localhost:5000/express_backend");
        console.log(response);
        const data = await response.json();
        setMessage(data.express);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMethod();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </header>
        <div>{/* Add any other components or content here */}</div>
      </div>
    </BrowserRouter>
  );
};

export default App;
