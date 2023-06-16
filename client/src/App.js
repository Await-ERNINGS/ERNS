import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { gapi } from "gapi-script";
import "./App.css";
import { Login } from "./Pages/Login";
import { Welcome } from "./Pages/Welcome";
import { Dashboard } from "./Pages/Dashboard";
import { Logout } from "./Pages/Logout";
import { Expense } from "./Pages/Expense"

import { Income } from "./Pages/Income";

import { About } from "./About";


const clientId =
  "909444633630-70jp9s6hngh7689ti0nmui954qr1tpub.apps.googleusercontent.com";

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
            <Route path="/welcome" element={<Welcome/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Logout />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/expense" element={<Expense/>}/>
            <Route path="/income" element={<Income/>}/>

            <Route path="/about" element={<About/>}/>

          </Routes>
        </header>
        <div>{/* Add any other components or content here */}</div>
      </div>
    </BrowserRouter>
  );
};

export default App;
