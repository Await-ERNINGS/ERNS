import React, { useEffect, useState } from "react";
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
    <div className="App">
      <header className="App-header">
        <h1>Header</h1>
      </header>
      <div>
        <Welcome />
      </div>
      <h1>Footer</h1>
      <p className="App-intro">message: {message}</p>
    </div>
  );
};

export default App;
