import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import Header from "./Header";

function App() {
  return (
    <Container
      className="d-flex"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100">
        <Router>
          <React.Fragment>
            <AuthProvider>
              <Header />
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </Switch>
            </AuthProvider>
          </React.Fragment>
        </Router>
      </div>
    </Container>
  );
}

export default App;
