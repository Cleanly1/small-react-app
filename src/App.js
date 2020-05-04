import React from 'react';
import { Router, Link } from "@reach/router";
import Home from "./pages/Home";
import SingleEvent from "./pages/SingleEvent";
import Nav from "./components/Nav";
import './App.css';

function App() {
  

  return (
    <div>
      <Nav>
        <Link to="/">Home</Link>
      </Nav>
      <div className="wrapper">
        <Router>
          <Home path="/" />
          <SingleEvent path="/event/*"/>
        </Router>
      </div>
    </div>
  );
}

export default App;
