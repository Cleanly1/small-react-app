import React from 'react';
import './nav.css';



function nav(props){
	const children = [props.children]
	return (
		<nav>
			<ul>
				{children && children.map(function(child, i){
					return(
					child
					)
				})}
			</ul>
		</nav>
	)
}

export default nav;