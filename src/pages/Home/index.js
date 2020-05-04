import React from "react";
import Event from "../../components/Event";
import "./home.css";

function Home(props) {
  const events = props.events;

  return (
    <div className="event_gallery">
      {events &&
        events.map(function (event, i) {
          return (
            <Event
              key={i}
              href={`/event/${event.id}`}
              text={event.name}
              image={event.images}
            />
          );
        })}
    </div>
  );
}

export default Home;
