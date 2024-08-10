import {
  CreateUserContainer,
  CreateUserInput,
  CreateUserTitle,
  CreateUserButton,
  CreateUserForm,
  CreateUserError,
} from "../components/CreateUserStyles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const CreateUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrorStatus, setPasswordErrorStatus] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      setPasswordErrorStatus(true);
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/users/", {
        email,
        password,
      });
      if (response.status === 201) {
        console.log("User created successfully");
        navigate("/login");
      } else {
        console.error("Failed to create user");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <CreateUserContainer>
      <CreateUserTitle>Create User</CreateUserTitle>
      <CreateUserForm onSubmit={handleSubmit}>
        <CreateUserInput
          type="email"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <CreateUserInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <CreateUserInput
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <CreateUserButton type="submit">Create</CreateUserButton>
      </CreateUserForm>
      {passwordErrorStatus && (
        <CreateUserError>Passwords do not match</CreateUserError>
      )}
    </CreateUserContainer>
  );
};

export default CreateUser;
