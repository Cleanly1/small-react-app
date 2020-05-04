import React from 'react';
import './singleEvent.css';
import Button from '../../components/Button'


function SingleEvent(props){
	const [event, setEvent] = React.useState(null);
	let image;

	React.useEffect(function(){
		const eventId = window.location.pathname.split('/')[2];
    	fetch(`${process.env.REACT_APP_DISCOVERY_URL}events/${eventId}.json?apikey=${process.env.REACT_APP_API_KEY}`)
    		.then(function(data){
      			return data.json()
    		}).then(function(result){
				console.log(result);
				
      			setEvent([result]);
    		})
	  }, [])

	  event && fetch(`${process.env.REACT_APP_DISCOVERY_URL}attractions/${event[0]._embedded.attractions[0].id}.json?size=10&countryCode=se&apikey=${process.env.REACT_APP_API_KEY}`)
    		.then(function(data){
      			return data.json()
    		}).then(function(result){
      			console.log(result);
				  
    		})
	  
	  
	return (
	<div className="App">
		{event && event.map(function(event, i){
			
			const date = event.dates.start.localDate;
			if(window.innerWidth > 425){
				image = event.images[2].url
			}else {
				image = event.images[1].url
			}

			return (
				<div className="event_page" key={i}>
					<h1 className="event_title">{event.name}</h1>
					<div className="event_image_container">
						<img className="event_image" src={image} alt="Cover"/>
					</div>
					<div className="event_info">
						<p>{date}</p>
						<p className="event_desc">{event.description !== undefined ? event.description : 'No event description'}</p>
						<Button href={event.url} > Buy Ticket Here</Button>
					</div>
				</div>
			)
		})}
	</div>
	);

	
}

export default SingleEvent;