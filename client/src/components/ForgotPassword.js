import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'
import {Form} from 'react-bootstrap'

import {useLogin} from '../contexts/LoginContext'

import ResetPassword from './ResetPassword'

export default function ForgotPassword() {
	const {getPasswordResetToken,setToast} = useLogin()
	const [token,setToken] = useState(null)
	const [email,setEmail] = useState('')
	const [loading,setLoading] = useState(false)
	const [error,setError] = useState(null)
	const history = useHistory()

	async function handleSubmit(e){
		e.preventDefault()
		try{
			setLoading(true)
			setError(null)
			const res = await getPasswordResetToken(email)
			let token = res?.data?.token
			setToken(token)
			console.log(res)
		}catch(err){
			setError(err)
			setToast({title:'Error',desc:err?.response?.data?.error ?? err.toString()})
			console.log(err?.response?.data?.error)
		}
		setLoading(false)
	}

	if(token) 
		return <ResetPassword token={token} />;
	return (
		<div className="fav-modal p-4 bg-light">
			<h2 className="auth-head">Forgot Your Password?</h2>
			<p className="sec-color-text">
				Enter the email associated with your account and we'll send you instructions to reset your password.
			</p>
			<Form onSubmit={handleSubmit} className="my-4">
				<Form.Group className="mb-3">
					<Form.Label className="sec-color-text">Email address</Form.Label>
					<Form.Control 
						placeholder="Enter your email" 
						required value={email} 
						type="email"
						onChange={({target})=>setEmail(target.value)} 
					/>
				</Form.Group>
				<div align="center">
					{loading ?
						<div className="mt-3 spinner-grow prime-color-text" role="status">
						  <span className="sr-only"></span>
						</div>
						:
						<button type="submit" className='mt-3 auth-btn'>Submit</button>
					}
				</div>
			</Form>
		</div>
	)
}