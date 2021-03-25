import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const Header = (_props) => {
  const history = useHistory();
  const { login, currentUser, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setError("");
      setLoading(true);

      await login(email, password);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
    } catch (error) {
      console.log("error", error);
      setError(error.message);
    }
  };

  const onClickShare = () => {
    history.push("/share");
  };

  const renderSigninComp = () => {
    return (
      <div>
        <input
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button disabled={loading} onClick={() => handleLogin()}>
          Login / Register
        </button>
      </div>
    );
  };

  const renderSigninedComp = () => {
    return (
      <div>
        <p>Welcome {currentUser?.email}</p>
        <button disabled={loading} onClick={() => onClickShare()}>
          Share a movie
        </button>
        <button disabled={loading} onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Funny Movies</h1>
        {currentUser ? renderSigninedComp() : renderSigninComp()}
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
    </div>
  );
};

export default Header;
