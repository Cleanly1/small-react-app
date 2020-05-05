import React from "react";
import "./singleEvent.css";
import { Redirect } from "@reach/router";
import Button from "../../components/Button";

function SingleEvent(props) {
  const [event, setEvent] = React.useState(null);
  const [venues, setVenues] = React.useState(null);
  let image;
  let arena;

  React.useEffect(
    function () {
      const eventId = props.id;
      fetch(
        `${process.env.REACT_APP_DISCOVERY_URL}events/${eventId}.json?apikey=${process.env.REACT_APP_API_KEY}`
      )
        .then(function (data) {
          return data.json();
        })
        .then(function (result) {
          setVenues(result._embedded.venues);
          setEvent([result]);
        });
    },
    [props.id]
  );
  // redirects user if you search
  if (props.re) return <Redirect from="/event/*" to="/" noThrow />;

  return (
    <div className="App">
      {event &&
        event.map(function (event, i) {
          const date = event.dates.start.localDate;
          image = event.images[0].url;

          if (event.seatmap !== undefined) {
            arena = event.seatmap.staticUrl;
          } else {
            arena =
              "https://media.ticketmaster.eu/sweden/e1bafbc9bc206f5a8899a475489ec101.jpg";
          }

          return (
            <div className="event_page" key={i}>
              <h1 className="event_title">{event.name}</h1>
              <div className="event_image_container">
                <img className="event_image" src={image} alt="Cover" />
              </div>
              <div className="event_info">
                <p>Start-Date: {date}</p>
                <p className="event_desc">
                  {event.description !== undefined
                    ? event.description
                    : "No event description"}
                </p>
                {venues &&
                  venues.map(function (venue, i) {
                    return (
                      <div key={i}>
                        <ul className="event_venue">
                          <li>Venue: {venue.name}</li>
                          <li>
                            Address:
                            {venue.address === undefined
                              ? " No address "
                              : ` ${venue.address.line1}`}
                            {venue.address === undefined
                              ? ""
                              : venue.address.line2}
                          </li>
                        </ul>
                      </div>
                    );
                  })}

                <Button href={event.url}> Buy Ticket Here</Button>
                <p className="event_button_text">
                  (You will be taken to ticketmaster.se)
                </p>

                <div className="event_seatmap">
                  <p className="event_seatmap_title">Arena layout:</p>
                  <img
                    className="event_seatmap_image"
                    src={arena}
                    alt="seatmap"
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default SingleEvent;
