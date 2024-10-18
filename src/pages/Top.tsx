import React from "react";
import { useAuth } from "../components/AuthContext";

const Top: React.FC = () => {
  const { currentUser, logout } = useAuth();
  if (!currentUser) {
    return <div>You are not logged in.</div>;
  }

  return (
    <div>
      <h1>Top</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Top;
