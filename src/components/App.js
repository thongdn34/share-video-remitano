import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Login from "./Login";
import Header from "./header/Header";
import { VideoProvider } from "../contexts/VideosContext";
import ShareVideo from "./ShareVideo";
import "./styles/App.scss";

function App() {
  return (
    <Container className="d-flex" style={{ minHeight: "100vh" }}>
      <div className="w-100">
        <Router>
          <React.Fragment>
            <AuthProvider>
              <VideoProvider>
                <Header />
                <Switch>
                  <Route exact path="/" component={Dashboard} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  <Route path="/share" component={ShareVideo} />
                </Switch>
              </VideoProvider>
            </AuthProvider>
          </React.Fragment>
        </Router>
      </div>
    </Container>
  );
}

export default App;
