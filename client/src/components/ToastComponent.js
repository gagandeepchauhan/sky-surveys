import React from 'react'
import {Toast} from 'react-bootstrap'
import {useLogin} from '../contexts/LoginContext'

export default function ToastComponent() {
	const {showToast,setShowToast,toastData} = useLogin()

	if(!showToast) return null

	return (
		<div className="fav-toast">
			<Toast show={showToast} onClose={()=>setShowToast(false)}>
        	  <Toast.Header>
        	    <strong className="me-auto sec-color-text">{toastData?.title}</strong>
        	  </Toast.Header>
        	  <Toast.Body className="sec-color-text">
        	  	{toastData.desc instanceof Array ?
        	  		<>
        	  			{toastData?.desc?.map((err,idx)=>(
        	  				<li key={idx} >
        	  					<small><strong className="sec-color-text">{idx+1}.) </strong></small>
        	  					{Object?.entries(err)?.[0]?.join(' : ')}
        	  				</li>
        	  			))}
        	  		</>
        	  		:
        	  		<>{toastData?.desc}</>
        	  	}
        	  </Toast.Body>
        	</Toast>
		</div>
	)
}