import React,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {Form} from 'react-bootstrap'

import {useLogin} from '../contexts/LoginContext'

export default function Signup() {
	const {signup,setUserStatus,setToast} = useLogin()
	const [email,setEmail] = useState('')
	const [company,setCompany] = useState('')
	const [password,setPassword] = useState('')
	const [confirmPassword,setConfirmPassword] = useState('')
	const [userRole,setUserRole] = useState(0)
	const [name,setName] = useState('')
	const [gender,setGender] = useState('')
	const [age,setAge] = useState('')
	const [loading,setLoading] = useState(false)
	const [error,setError] = useState(null)
	const history = useHistory()

	async function handleSubmit(e){
		e.preventDefault()
		if(password!==confirmPassword){
			setToast({title:'Error',desc:"Passwords should match"})
			return 
		}
		try{
			setLoading(true)
			setError(null)
			// console.log(JSON.stringify({email,password,confirmPassword,userRole,name,age,gender,company},null,4))
			const res = await signup({email,password,confirmPassword,userRole,name,age,gender,company})
			setUserStatus({data:res.data})
			setToast({title:'Success',desc:'successfully signed up!'})
			if(res?.data?.userRole === 0)
				history.push('/my-surveys')
			else
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
			<h2 className="auth-head">Signup</h2>
			<Form onSubmit={handleSubmit} className="my-4">
				<Form.Group className="mb-3">
					<Form.Label className="sec-color-text">I'm a*</Form.Label>
					<div className="d-flex justify-content-start align-items-center">
						<div onClick={()=>setUserRole(0)} className={`user-role ${userRole===0 && 'active'}`}>
							<span><i className="fas fa-user-check"></i></span>
							<span>Coordinator</span>
						</div>
						<div onClick={()=>setUserRole(1)} className={`user-role ${userRole===1 && 'active'}`}>
							<span><i className="fas fa-users"></i></span>
							<span>Respondent</span>
						</div>
					</div>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label className="sec-color-text">Full Name*</Form.Label>
					<Form.Control 
						placeholder="Enter your full name" 
						required value={name} 
						type="text"
						onChange={({target})=>setName(target.value)} 
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label className="sec-color-text">Email address*</Form.Label>
					<Form.Control 
						placeholder="Enter your email" 
						required value={email} 
						type="email"
						onChange={({target})=>setEmail(target.value)} 
					/>
				</Form.Group>
				{userRole===0 &&
					<Form.Group className="mb-3">
						<Form.Label className="sec-color-text">Company name*</Form.Label>
						<Form.Control 
							placeholder="Enter your company name" 
							required value={company} 
							type="text"
							onChange={({target})=>setCompany(target.value)} 
						/>
					</Form.Group>
				}
				<Form.Group className="mb-3 d-flex justify-content-between align-items-center">
					<div className="mr-1">
						<Form.Label className="sec-color-text">Create Password*</Form.Label>
						<Form.Control 
							placeholder="Enter your password" 
							required value={password} 
							type="password"
							onChange={({target})=>setPassword(target.value)} 
						/>
					</div>
					<div>
						<Form.Label className="sec-color-text">Confirm Password*</Form.Label>
						<Form.Control 
							placeholder="Enter your password" 
							required value={confirmPassword} 
							type="password"
							onChange={({target})=>setConfirmPassword(target.value)} 
						/>
					</div>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label className="sec-color-text">Age*</Form.Label>
					<Form.Control 
						placeholder="Enter your age" 
						required
						value={age}
						min={7}
						max={120}
						type="number"
						onChange={({target})=>setAge(target.value)} 
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label className="sec-color-text">Gender*</Form.Label>
					<Form.Group>
						<input
							type="radio"
							id="gender-male"
							required
							value='M'
							name="gender"
							onChange={({target})=>setGender(target.value)} 
						/>
						<Form.Label 
							for="gender-male" 
							className="sec-color-text ml-2"
							style={{marginLeft:"5px",marginRight:"8px"}}
						>
							Male
						</Form.Label>
						<input
							type="radio"
							id="gender-female"
							required
							value='F'
							name="gender"
							onChange={({target})=>setGender(target.value)} 
						/>
						<Form.Label 
							for="gender-female" 
							className="sec-color-text"
							style={{marginLeft:"5px"}}
						>
							Female
						</Form.Label>
					</Form.Group>
				</Form.Group>
				<div align="center">
					{loading ?
						<div className="mt-3 spinner-grow prime-color-text" role="status">
						  <span className="sr-only"></span>
						</div>
						:
						<button type="submit" className='mt-3 auth-btn'>Signup</button>
					}
				</div>
			</Form>
			<div align="center">
				<Link to="/auth/login">
					<small className="sec-color-text">Have an account? <span className="prime-color-text">Login</span></small>
				</Link>
			</div>
		</div>
	)
}