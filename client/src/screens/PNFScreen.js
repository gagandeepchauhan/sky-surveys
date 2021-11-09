import React from 'react'
import {useHistory} from 'react-router-dom'
import PNF from '../svgs/page_not_found.svg'

export default function PageNotFound() {
	const history=useHistory()
	function goBack(){
		history.goBack()
	}
	return (
		<div className="flex-container" align="center">
			<div className="">
			  <img className="pnf-illustration" src={PNF} alt='pnf svg' />
			  <h3 className="mt-2">Page Not Found</h3>
			  <p className="">
			  	<button className="btn btn-sm btn-outline-dark" onClick={goBack}>Back</button>
			  </p>
			</div>
		</div>
	)
}