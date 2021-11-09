import React from 'react'
import { Redirect } from 'react-router-dom'
import {useLogin} from '../contexts/LoginContext'

import Navbar from '../components/Navbar'

// auth components
import Login from '../components/Login'
import Signup from '../components/Signup'
import ForgotPassword from '../components/ForgotPassword'
import ResetPassword from '../components/ResetPassword'

const flows = ['login','signup','forgot']

export default function AuthScreen(props) {
	const {isLoggedIn} = useLogin()
	const type = props.match.params.type

	let Flow = null

	switch(type){
		case 'login': Flow=Login; break
		case 'signup': Flow=Signup; break
		case 'forgot': Flow=ForgotPassword; break
		default: ;
	}

	if(!flows.includes(type) || isLoggedIn()) return <Redirect to='/' />;

	return (
		<>
			<div className="head head-auth"></div>
			<div className="auth">
				<Navbar />
				<div className="container p-3">
					<Flow />
				</div>
			</div>
		</>
	)
}