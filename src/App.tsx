import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./components/AuthContext";
import Login from "./components/Login";
import Top from "./pages/Top";
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
  const handleLogin = (email: string) => {
    console.log("email: ", email);
  };

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login onSubmit={handleLogin} />} />
            <Route path="/" element={<PrivateRoute component={Top} />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
