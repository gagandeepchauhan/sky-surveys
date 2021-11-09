import React,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {Form} from 'react-bootstrap'

import {useLogin} from '../contexts/LoginContext'

export default function Login() {
	const {login,setUserStatus,setToast} = useLogin()
	const [email,setEmail] = useState('')
	const [password,setPassword] = useState('')
	const [loading,setLoading] = useState(false)
	const [error,setError] = useState(null)
	const history = useHistory()

	async function handleSubmit(e){
		e.preventDefault()
		try{
			setLoading(true)
			setError(null)
			const res = await login({email,password})
			setUserStatus({data:res.data})
			setToast({title:'Success',desc:'successfully logged in!'})
			history.push('/surveys')
			console.log(res)
		}catch(err){
			setError(err)
			setToast({title:'Error',desc:err?.response?.data?.error ?? err.toString()})
			console.log(err?.response?.data?.error ?? err.toString())
		}
		setLoading(false)
	}

	return (
		<div className="fav-modal p-4 bg-light">
			<h2 className="auth-head">Login</h2>
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
				<Form.Group className="mb-3">
					<Form.Label className="sec-color-text d-flex justify-content-between align-items-center">
						<span>Password</span>
						<Link to="/auth/forgot">
							<small className="prime-color-text">forgot password?</small>
						</Link>
					</Form.Label>
					<Form.Control 
						placeholder="Enter your password" 
						required value={password} 
						type="password"
						onChange={({target})=>setPassword(target.value)} 
					/>

				</Form.Group>
				<div align="center">
					{loading ?
						<div className="mt-3 spinner-grow prime-color-text" role="status">
						  <span className="sr-only"></span>
						</div>
						:
						<button type="submit" className='mt-3 auth-btn'>Login</button>
					}
				</div>
			</Form>
			<div align="center">
				<Link to="/auth/signup">
					<small className="sec-color-text">New to SkySurveys? <span className="prime-color-text">Create new account</span></small>
				</Link>
			</div>
		</div>
	)
}