import React from 'react';
import './button.css';



function event(props){
	
	return (
		<a className="button" href={props.href}>
			{props.children}
		</a>
	)
}

export default event;