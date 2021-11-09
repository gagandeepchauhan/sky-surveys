import React from 'react'

export default function Avatar({name,imgSrc}) {
	return (
		<div className="avatar nav-item">
			{imgSrc ?
				<img src={imgSrc} alt='avatar' /> 
				:
				<span>{name?.[0]}</span>
			}
		</div>
	)
}