import React,{useState,useEffect} from 'react'
import {Form} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import {useLogin} from '../contexts/LoginContext'

export default function ResetPassword({token}) {
	const {verifyPasswordResetToken,changePassword,setToast} = useLogin()
	const [password,setPassword] = useState('')
	const [confirmPassword,setConfirmPassword] = useState('')
	const [loading,setLoading] = useState(false)
	const [error,setError] = useState(null)
	const history = useHistory()

	async function handleSubmit(e){
		e.preventDefault()
		try{
			setLoading(true)
			setError(null)
			const res = await changePassword({password,confirmPassword,token})
			setToast({title:'Success',desc:'Password reset successful!'})
			history.push('/')
			console.log(res)
		}catch(err){
			setError(err)
			setToast({title:'Error',desc:err?.response?.data?.error ?? err.toString()})
			console.log(err?.response?.data?.error)
		}
		setLoading(false)
	}
	async function verifyToken(){
		try{
			const res = await verifyPasswordResetToken(token)
		}catch(err){
			setToast({title:'Error',desc:'Invalid token'})
			history.push('/auth/forgot')
		}
	}
	useEffect(() => {
		verifyToken()
	}, [])

	return (
		<div className="fav-modal p-4 bg-light">
				<>
					<h2 className="auth-head">Reset Your Password</h2>
					<p className="sec-color-text">
						Enter the password below.
					</p>
					<Form onSubmit={handleSubmit} className="my-4">
						<Form.Group className="mb-3">
							<Form.Label className="sec-color-text">New password</Form.Label>
							<Form.Control 
								placeholder="Enter your password" 
								required value={password} 
								type="password"
								onChange={({target})=>setPassword(target.value)} 
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label className="sec-color-text">Confirm new password</Form.Label>
							<Form.Control 
								placeholder="Enter your password" 
								required value={confirmPassword} 
								type="password"
								onChange={({target})=>setConfirmPassword(target.value)} 
							/>
						</Form.Group>
						<div align="center">
							{loading ?
								<div className="mt-3 spinner-grow prime-color-text" role="status">
								  <span className="sr-only"></span>
								</div>
								:
								<button type="submit" className='mt-3 auth-btn'>Reset</button>
							}
						</div>
					</Form>
				</>
		</div>
	)
}