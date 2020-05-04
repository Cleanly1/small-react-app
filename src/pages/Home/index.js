import React from 'react';
import Event from '../../components/Event'
import './home.css'


function Home(){
	const [events, setEvents] = React.useState();

	React.useEffect(function(){
    	fetch(`${process.env.REACT_APP_DISCOVERY_URL}events.json?size=10&countryCode=se&apikey=${process.env.REACT_APP_API_KEY}`)
    		.then(function(data){
      			return data.json()
    		}).then(function(result){
      			setEvents(result._embedded.events);
    		})
	  }, [])
	  
	return (
	<div className="event_gallery">
	{events && events.map(function(event, i){
		return <Event key={i} href={`/event/${event.id}`} text={event.name} image={event.images}></Event>
	})}
	</div>
	);

	
}

export default Home;