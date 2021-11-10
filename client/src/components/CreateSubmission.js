import React,{useState,useRef} from 'react'
import {Form} from 'react-bootstrap'

import {useApi} from '../contexts/ApiContext'
import {useLogin} from '../contexts/LoginContext'

import Question from './Question'

export default function CreateSubmission({survey}) {
	const [loading,setLoading] = useState(false)
	const {createSubmission} = useApi()
	const {setToast} = useLogin()
	const inputRefs = useRef([])

	async function handleSubmit(e){
		e.preventDefault()
		const answers = survey?.questions?.map((q,idx)=>{
			return {
				category:q?.category,
				answer:inputRefs?.current[idx]?.value
			}
		})
		console.log(answers)
		try{
			setLoading(true)
			const res = await createSubmission(survey._id,{answers})
			setToast({title:'Success',desc:'Survey submitted successfully'})
			window.location.href = "/surveys"
		}catch(err){
			setToast({title:'Error',desc:err?.response?.data?.error ?? err.toString()})
			console.log(err?.response?.data?.error)
		}
		setLoading(false)
	}

	return (
		<div>
			<h6 className="mt-3 auth-head">create submission</h6>
			<Form onSubmit={handleSubmit}>
				{survey?.questions?.map((item,idx)=>(
					<div key={idx} className="questions-group">
						<div className="question-answer">
							<Question
								data={item}
								index={idx}
								action="view"
							/>
							<Form.Control 
								type="text"
								placeholder={item?.category==='FILLUP' ? 'Enter your answer' : 'Specify a, b, c or d'}
								required
								className="mt-1"
								ref={(el)=>(inputRefs.current[idx] = el)}
							/>
						</div>
					</div>
				))}
				<div align="center">
					{loading ?
						<div className="mt-3 spinner-grow prime-color-text" role="status">
						  <span className="sr-only"></span>
						</div>
						:
						<button className="auth-btn mt-3" type="submit">Submit</button>
					}
				</div>
			</Form>
		</div>
	)
}