import React,{useState,useEffect} from 'react'
import {Modal} from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import FullScreenLoader from '../components/FullScreenLoader'

import {useApi} from '../contexts/ApiContext'
import {useLogin} from '../contexts/LoginContext'

const LIMIT = 20

export default function JobsScreen() {
	const {setToast} = useLogin()
	const {getMySurveys} = useApi()
	const [surveys,setSurveys] = useState([])
	const [loading,setLoading] = useState(false)
	const [error,setError] = useState(null)
	const history = useHistory()

	async function fetchMySurveys(){
		try{
			setLoading(true)
			setError(null)
			const res = await getMySurveys()
			console.log(res?.data)
			setSurveys(res?.data?.data) // it contains all surveys corresponding to this corrdinator
		}catch(err){
			setError(err)
			setToast({title:'Error',desc:err?.response?.data?.error ?? err.toString()})
			history.push('/')
		}
		setLoading(false)
	}

	useEffect(()=>{
		fetchMySurveys()
	},[])


	return (
		<>
			{loading &&
				<FullScreenLoader />
			}
			<div className="head head-job"></div>
			<div className="jobs">
				<Navbar />
				<div className="container">
					<div className="text-light mt-2">
						<p style={{fontSize:"12px"}}>
							<span><i className="fas fa-home"></i></span>
							<Link to="/" className="text-light">&nbsp;Home</Link>
						</p>
					</div>
					<h5 className="text-light mt-4 mb-3">
						<strong>Surveys published by you</strong>
					</h5>
					<div className="job-group row styled-scrollbar">
						{surveys?.map(survey=>(
						<div key={survey._id} className="p-3 job-card col col-12 col-sm-6 col-md-4">
							<h6>{survey.title}</h6>
							<div className="info-content">{survey?.description?.substring(0,40)}...</div>
							<div className="job-bottom mt-3">
								<div className="submission">
									<i className="fas fa-poll-h"></i>
									{survey?.submissions?.length} submissions
								</div>
								<Link to={`/view-survey/${survey._id}`} className="job-btn">
									View Survey
								</Link>
							</div>
						</div>	
						))}
					</div>
					{surveys?.length!=0 &&
						<div className="pagination">
							<button className="page-btn" disabled={true}>
								<i className="fas fa-backward"></i>
							</button>
							<span>{1}</span>
							<button className="page-btn" disabled={true}>
								<i className="fas fa-forward"></i>
							</button>
						</div>
					}
					{surveys?.length===0 &&
						<div className="empty-jobs">
							<div>
							    <span className="empty-icon"><i className="far fa-file-alt"></i></span>
							    <p className="sec-color-text">Your published surveys will show here!</p>
							    <Link to="/create-survey" className="auth-btn py-2">Publish a survey</Link>
							</div>
						</div>
					}
				</div>
			</div>
		</>
	)
}