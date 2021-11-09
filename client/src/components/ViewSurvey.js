import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'

import Questions from './Questions'
import FullScreenLoader from './FullScreenLoader'

import {useApi} from '../contexts/ApiContext'
import {useLogin} from '../contexts/LoginContext'

export default function ViewSurvey({survey,submissions,setEdit}) {
	const {deleteSurvey} = useApi()
	const {setToast} = useLogin()
	const [loading,setLoading] = useState(false)
	const history = useHistory()

	async function handleDelete(){
		const sure = window.confirm("Are you sure you want to delete this survey permanently??")
		console.log(sure)
		if(sure){
			try{
				setLoading(true)
				const res = await deleteSurvey(survey?._id)
				setToast({title:'Success',desc:"Survey deleted successfully"})
				console.log(res?.data)
				history.push("/surveys")
			}catch(err){
				setToast({title:'Error',desc:err?.response?.data?.error ?? err.toString()})
			}
			setLoading(false)
		}
	}

	return (
		<>
		{loading &&
			<FullScreenLoader />
		}
		<div className="fav-modal p-4 bg-light">
			<h2 className="auth-head">{survey?.title}
				<button onClick={()=>setEdit(true)} className="auth-round-btn">
					<i className="fa fa-edit"></i>
				</button>
				<button onClick={handleDelete} className="auth-round-btn delete-btn">
					<i className="fa fa-trash"></i>
				</button>
			</h2>
			<p className="sec-color-text">
				{survey?.description}
			</p>
			<div className="submission mb-5">
				<i className="fas fa-poll-h"></i>
				{survey?.submissions?.length} submissions
			</div>
			<Questions questions={survey?.questions} action="view"/>
		</div>
		</>
	)
}