import React,{useContext} from 'react'

import {useLogin} from './LoginContext'

import api from '../api/surveys'

const ApiContext = React.createContext()

export function useApi(){
	return useContext(ApiContext)
}

export default function ApiProvider({children}) {
	const {userStatus} = useLogin()
	const headConfig={
		headers:{
			Authorization:`Bearer ${userStatus?.data?.token}`
		}
	}

	// coordinator api
	function getMySurveys(){
		return api.get(`/app-survey/my-surveys`,headConfig)
	}
	function getSurvey(surveyId){
		return api.get(`/app-survey/my-surveys/${surveyId}`,headConfig)
	}
	function createSurvey(data){ 
		return api.post(`/app-survey/create-survey`,data,headConfig)
	}
	function editSurvey(surveyId,data){ 
		return api.put(`/app-survey/edit-survey/${surveyId}`,data,headConfig)
	}
	function deleteSurvey(surveyId){ 
		return api.delete(`/app-survey/delete-survey/${surveyId}`,headConfig)
	}
	// respondent api
	

	const data = {
		createSurvey,
		editSurvey,
		getMySurveys,
		getSurvey,
		deleteSurvey
	}

	return (
		<ApiContext.Provider value={data} >
			{children}
		</ApiContext.Provider>
	)
}