import React,{useState,useContext,useEffect} from 'react'
import {useLocalStorage} from '../hooks/useLocalStorage'
import {useTimeout} from '../hooks/useTimeout'


import api from '../api/surveys'

const LoginContext = React.createContext()

export function useLogin(){
	return useContext(LoginContext)
}

export default function LoginProvider({children}) {
	const [userStatus,setUserStatus] = useLocalStorage('SKY-SURVEYS', null) // userStatus = { token, name, userRole }
	const [showToast,setShowToast] = useState(false)
	const [toastData,setToast] = useState(null)
	const {reset,clear} = useTimeout(()=>setShowToast(false),3000)

	useEffect(() => {
		if(toastData){
			// console.log(toastData)
			setShowToast(true)
			reset()
		}
		return clear
	}, [toastData])

	function isLoggedIn(){
		if(userStatus?.data?.token){
			return true
		}
		return false
	}
	function isCoordinator(){
		if(userStatus?.data?.userRole===0){
			return true
		}
		return false
	}
	function login(data){ // {email,password}
		return api.post('/auth/login',data)
	}
	function signup(data){ // { email,password,confirmPassword,name,skills,userRole }
		return api.post('/auth/register',data)
	}
	function getPasswordResetToken(email){
		return api.get(`/auth/reset-password?email=${email}`)
	}
	function verifyPasswordResetToken(token){
		return api.get(`/auth/reset-password/${token}`)
	}
	function changePassword(data){ // {password,confirmPassword,token}
		return api.post('/auth/reset-password',data)
	}
	function logout(){
		setUserStatus(null)
		setToast({title:'Logged out',desc:'You have successfully logged out!'})
	}

	const data = {
		userStatus,
		setUserStatus,
		isLoggedIn,
		isCoordinator,
		login,
		signup,
		getPasswordResetToken,
		verifyPasswordResetToken,
		changePassword,
		logout,
		showToast,
		setShowToast,
		toastData,
		setToast
	}

	return (
		<LoginContext.Provider value={data} >
			{children}
		</LoginContext.Provider>
	)
}