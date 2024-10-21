import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useAuth } from "./AuthContext";

interface LoginProps {
  onSubmit: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      onSubmit(email, password);
      navigate("/");
    } else {
      setError("メールアドレスまたはパスワードが間違っています。");
    }
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <h2>ログイン</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <label>
          メールアドレス
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          パスワード
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default Login;
