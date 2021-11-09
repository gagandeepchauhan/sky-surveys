import React,{useState,useEffect} from 'react'
import { useHistory, Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import FullScreenLoader from '../components/FullScreenLoader'
import ViewSurvey from '../components/ViewSurvey'
import CreateSurvey from '../components/CreateSurvey'

import {useApi} from '../contexts/ApiContext'
import {useLogin} from '../contexts/LoginContext'

export default function ViewSurveyScreen(props) {
	const surveyId = props.computedMatch.params?.surveyId
	const {setToast} = useLogin()
	const {getSurvey} = useApi()
	const [survey,setSurvey] = useState(null)
	const [submissions,setSubmissions] = useState([])
	const [loading,setLoading] = useState(false)
	const [error,setError] = useState(null)
	const [edit,setEdit] = useState(false) // false means under view , true means under editing
	const history = useHistory()

	async function fetchSurvey(){
		try{
			setLoading(true)
			setError(null)
			const res = await getSurvey(surveyId)
			console.log(res?.data)
			setSurvey(res?.data?.data) // it contains the survey data
			setSubmissions(res?.data?.submissions) // it contains the survey submissions, so that we can access the respondents data
		}catch(err){
			setError(err)
			setToast({title:'Error',desc:err?.response?.data?.error ?? err.toString()})
			history.push('/')
		}
		setLoading(false)
	}

	useEffect(()=>{
		fetchSurvey()
	},[])

	return (
		<>
			{loading &&
				<FullScreenLoader />
			}
			<div className="head head-auth"></div>
			<div className="auth">
				<Navbar />
				<div className="container p-3">
					{edit ?
						<CreateSurvey survey={survey} setEdit={setEdit} edit={edit} />
						:
						<ViewSurvey survey={survey} submissions={submissions} setEdit={setEdit} />
					}
				</div>
			</div>
		</>
	)
}