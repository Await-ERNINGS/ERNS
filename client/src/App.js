import React, { useEffect, useState } from "react";

import "./App.css";
import { Login } from "./Pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./Pages/Signup";

import { Welcome } from "./Pages/Welcome";

const App = () => {
  const [message, setMessage] = useState("");

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
    <>
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </header>
        <div>
          <Welcome />
        </div>
      </div>
    </>
  );
};

export default App;
