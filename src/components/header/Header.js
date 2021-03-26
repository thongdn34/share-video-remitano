import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import './styles.scss'

const Header = (_props) => {
  const history = useHistory();
  const { login, currentUser, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      setError("");

      await login(email, password);
      setLoading(false);
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
          className="email"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="password"
          placeholder="password"
          value={password}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="login-btn" disabled={loading} onClick={() => handleLogin()}>
          Login / Register
        </button>
      </div>
    );
  };

  const renderSigninedComp = () => {
    return (
      <div className="d-flex">
        <p>Welcome {currentUser?.email}</p>
        <button style={{ margin: '0 10px' }} disabled={loading} onClick={() => onClickShare()}>
          Share a movie
        </button>
        <button style={{ margin: '0 10px' }} disabled={loading} onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
    );
  };

  return (
    <div className="header">
      <div className="d-flex justify-content-between align-items-center">
        <Link to="/">
          <img src="./phim1080.png" alt="logo" width="300" />
        </Link>
        {currentUser ? renderSigninedComp() : renderSigninComp()}
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
    </div>
  );
};

export default Header;
