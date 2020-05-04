import React from 'react';
import './event.css';



function event(props){
	
	return (
		<a className="event_page_container" href={props.href}>
			<div className="event_page_image_container">
				<img className="event_page_image" src={props.image[6].url} alt="Cover" />
			</div>
			<h1 className="event_page_title">{props.text}</h1>
			
		</a>
	)
}

export default event;