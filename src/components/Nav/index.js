import React from 'react';
import './nav.css';



function nav(props){
	const children = [props.children]
	return (
		<nav>
			<ul>
				{children && children.map(function(child){
					return(
					child
					)
				})}
				
			</ul>
			<input />
		</nav>
	)
}

export default nav;