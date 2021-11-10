import React,{useState} from 'react'
import {Modal} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

import Questions from './Questions'
import SubmissionModal from './SubmissionModal'
import FullScreenLoader from './FullScreenLoader'

import {useApi} from '../contexts/ApiContext'
import {useLogin} from '../contexts/LoginContext'

export default function ViewSurvey({survey,submissions,setEdit}) {
	const [showSubmissionModal,setShowSubmissionModal] = useState(false)
	const {deleteSurvey} = useApi()
	const {setToast} = useLogin()
	const [loading,setLoading] = useState(false)
	const history = useHistory()

	function notClosed(){
		let closingEpoch = new Date(survey?.closingDate).getTime()
		let currentEpoch = new Date().getTime()
		return currentEpoch<=closingEpoch
	}

	async function handleDelete(){
		const sure = window.confirm("Are you sure you want to delete this survey permanently??")
		console.log(sure)
		if(sure){
			try{
				setLoading(true)
				const res = await deleteSurvey(survey?._id)
				setToast({title:'Success',desc:"Survey deleted successfully"})
				console.log(res?.data)
				history.push("/my-surveys")
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
				&nbsp;&nbsp;
				{!notClosed() &&
					<small className="badge rounded-pill bg-secondary">closed</small>
				}
			</h2>
			<small className="text-grey">Created at - {new Date(survey?.createdAt)?.toDateString?.()}</small>
			<br/><small className="text-grey">Updated at - {new Date(survey?.updatedAt)?.toDateString?.()}</small>
			<br/><small className="text-grey">Closing date - {new Date(survey?.closingDate)?.toDateString?.()}</small>
			<h6 className="mt-3 auth-head">Description</h6>
			<p className="pb-2">{survey?.description}</p>
			<h6 className="mt-3 auth-head">Age group</h6>
			<p className="pb-2"><small className="badge rounded-pill bg-dark">{`${survey?.visibleToAllAgeGroup ? 'visible to all' : `${survey?.ageGroup?.lb} yrs - ${survey?.ageGroup?.ub} yrs`}`}</small></p>
			<h6 className="mt-3 auth-head">Genders</h6>
			<p className="pb-2">
				{survey?.genders?.map((gen,idx)=>(
					<><small key={idx} className={`badge rounded-pill ${gen==='M' ? 'bg-primary' : 'bg-success'}`}>{gen}</small>&nbsp;</>
				))}
			</p>
			<div className="submission mb-1">
				<i className="fas fa-poll-h"></i>
				{survey?.submissions?.length} submissions
			</div>
			<button onClick={()=>setShowSubmissionModal(true)} className="mb-4 job-btn">
				view submissions
			</button>
			<Questions questions={survey?.questions} action="view"/>
		</div>
		<Modal show={showSubmissionModal} onHide={()=>setShowSubmissionModal(false)}>
			<SubmissionModal 
				questions={survey?.questions}
				submissions={submissions}
				close={()=>setShowSubmissionModal(false)}
			/>
		</Modal>
		</>
	)
}