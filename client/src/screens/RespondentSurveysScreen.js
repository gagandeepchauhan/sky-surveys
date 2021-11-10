import React,{useState,useEffect} from 'react'
import {Modal} from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import FullScreenLoader from '../components/FullScreenLoader'
import SurveyModal from '../components/SurveyModal'

import {useApi} from '../contexts/ApiContext'
import {useLogin} from '../contexts/LoginContext'

const LIMIT = 20

export default function RespondentSurveysScreen() {
	const {setToast} = useLogin()
	const {getSurveys} = useApi()
	const [surveys,setSurveys] = useState([])
	const [submissions,setSubmissions] = useState([])
	const [showModal,setShowModal] = useState(false)
	const [selectedSurvey,setSelectedSurvey] = useState(null)
	const [selectedSurveySubmission,setSelectedSurveySubmission] = useState(null)
	const [haveSubmittedSelectedSurvey,setHaveSubmittedSelectedSurvey] = useState(null)
	const [loading,setLoading] = useState(false)
	const history = useHistory()

	function showSurveyModal(surveyId){
		setSelectedSurvey(()=>{
			return surveys.find(item=>item._id===surveyId)
		})
		setSelectedSurveySubmission(()=>{
			return submissions.find(item=>item.survey===surveyId)
		})
		setHaveSubmittedSelectedSurvey(haveSubmitted(surveyId))
		setShowModal(true)
	}
	function closeSurveyModal(){
		setShowModal(false)
		setSelectedSurvey(null)
		setHaveSubmittedSelectedSurvey(null)
		setSelectedSurveySubmission(null)
	}

	function haveSubmitted(surveyId){ // it check wheather this survey is already filled by this respondent or not
		const submissionData = submissions.find(item=>item.survey===surveyId)
		if(submissionData) return true
		return false
	}

	async function fetchSurveys(){
		try{
			setLoading(true)
			const res = await getSurveys()
			console.log(res?.data)
			setSurveys(res?.data?.surveys) // it contains all surveys concerned with this respondent
			setSubmissions(res?.data?.submissions) // it contains all submissions made by this respondent
		}catch(err){
			setToast({title:'Error',desc:err?.response?.data?.error ?? err.toString()})
			history.push('/')
		}
		setLoading(false)
	}

	useEffect(()=>{
		fetchSurveys()
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
						<strong>Surveys for you</strong>
					</h5>
					<div className="job-group row styled-scrollbar">
						{surveys?.map(survey=>(
						<div key={survey._id} className="p-3 job-card col col-12 col-sm-6 col-md-4">
							<h4>{survey?.coordinator?.company}&nbsp;&nbsp;
								<small>
									{haveSubmitted(survey._id) ?
										<small className="badge rounded-pill bg-success">submitted</small>
										:
										<small className="badge rounded-pill bg-primary">unfilled</small>
									}
								</small>
							</h4>
							<h6>{survey.title}</h6>
							<div className="info-content">{survey?.description?.substring(0,40)}...</div>
							<div className="job-bottom mt-3">
								<div className="submission">
									<i className="fas fa-poll-h"></i>
									{survey?.submissions?.length} submissions
								</div>
								<div onClick={()=>showSurveyModal(survey._id)} className="job-btn">
									view
								</div>
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
							    <p className="sec-color-text">Surveys for you will show here!</p>
							</div>
						</div>
					}
				</div>
				<Modal show={showModal} onHide={closeSurveyModal}>
					<SurveyModal 
						survey={selectedSurvey} 
						submission={selectedSurveySubmission}
						submitted={haveSubmittedSelectedSurvey} 
						close={closeSurveyModal}
					/>
				</Modal>
			</div>
		</>
	)
}