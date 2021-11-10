import React from 'react'

export default function Visibility({show,setShow}) {
	return (
		<>
			<button onClick={(e)=>{e.preventDefault();setShow(prev=>!prev)}} className="auth-round-btn cancel-btn">
				{show ?
					<i className="fas fa-eye"></i>
					:
					<i className="fas fa-eye-slash"></i>
				}
			</button>
		</>
	)
}