import React from "react";
import {
  LoginContainer,
  LoginInput,
  LoginTitle,
} from "../components/LoginStyles";
import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const Navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login/",
        formData
      );
      if (response.status === 200) {
        const { access_token } = response.data;
        login(access_token);
        Navigate("/");
      } else {
        console.log("Login failed");
        setLoginStatus(true);
      }
    } catch (error) {
      console.error(error);
      setLoginStatus(true);
    }
  };
  return (
    <LoginContainer>
      <LoginTitle>Login</LoginTitle>
      <form onSubmit={handleSubmit}>
        <LoginInput
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <LoginInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {loginStatus && <p>Login failed</p>}
      <a href="/signup">Don't have an account? Signup</a>
    </LoginContainer>
  );
};

export default Login;
