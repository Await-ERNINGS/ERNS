import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">message: {message}</p>
    </div>
  );
};

export default App;
