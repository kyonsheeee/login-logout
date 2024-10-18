import React from "react";
import "./App.css";
import Login from "./Login";

const App: React.FC = () => {
  const handleLogin = (email: string, password: string) => {
    console.log("email: ", email, "password: ", password);
  };

  return (
    <div className="App">
      <Login onSubmit={handleLogin} />
    </div>
  );
};

export default App;
