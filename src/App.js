import React from "react";
import { Router, Link } from "@reach/router";
import Home from "./pages/Home";
import SingleEvent from "./pages/SingleEvent";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  const [events, setEvents] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [userMessage, setUserMessage] = React.useState(null);

  const changeFunc = function (event) {
    if (event.key === "Enter") {
      setSearchQuery(event.target.value);
    }
  };

  React.useEffect(
    function () {
      if (searchQuery === "") {
        fetch(
          `${process.env.REACT_APP_DISCOVERY_URL}events.json?countryCode=se&apikey=${process.env.REACT_APP_API_KEY}`
        )
          .then(function (data) {
            return data.json();
          })
          .then(function (result) {
            setEvents(result._embedded.events);
            if (userMessage !== null) {
              setUserMessage(null);
            }
          });
      } else {
        fetch(
          `${process.env.REACT_APP_DISCOVERY_URL}events.json?classificationName=${searchQuery}&countryCode=se&apikey=${process.env.REACT_APP_API_KEY}`
        )
          .then(function (data) {
            return data.json();
          })
          .then(function (result) {
            if (result._embedded !== undefined) {
              setEvents(result._embedded.events);
              setUserMessage(null);
            } else {
              setEvents([]);
              setUserMessage([
                `Couldn´t find any events for the genre: ${searchQuery}`,
                `Maybe try musical?`,
              ]);
            }
          });
      }
    },
    [searchQuery, userMessage]
  );

  return (
    <div>
      <Nav>
        <div className="site_name">SES</div>
        <Link
          to="/"
          onClick={function () {
            setSearchQuery("");
          }}
        >
          Home
        </Link>
        <div className="search_container">
          Genre search:
          <input className="search_bar" onKeyUp={changeFunc} type="text" />
        </div>
      </Nav>

      <div className="wrapper">
        {userMessage &&
          userMessage.map(function (message, i) {
            return (
              <div className="user_messages" key={i}>
                <h1>{message}</h1>
              </div>
            );
          })}

        <Router>
          <Home path="/" events={events} />
          <SingleEvent path="/event/:id" re={userMessage} />
        </Router>
      </div>
    </div>
  );
}

export default App;
