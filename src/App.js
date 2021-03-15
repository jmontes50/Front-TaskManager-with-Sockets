import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { AuthProvider } from "./context/authContext";
import Navigation from "./components/Navigation"
export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Navigation />
        <Switch>
          <Routes />
        </Switch>
      </AuthProvider>
    </Router>
  );
}
