import React,{useState} from 'react'
import {Modal,Form} from 'react-bootstrap'

export default function AddQuestionModal({addQuestion,editQuestion,index,data,close}) {
	const [question,setQuestion] = useState(data?.question ?? '')
	const [category,setCategory] = useState(data?.category ?? 'FILLUP')
	const [optionA,setOptionA] = useState(data?.options?.a ?? '')
	const [optionB,setOptionB] = useState(data?.options?.b ?? '')
	const [optionC,setOptionC] = useState(data?.options?.c ?? '')
	const [optionD,setOptionD] = useState(data?.options?.d ?? '')
	function handleSubmit(e){
		e.preventDefault()
		e.stopPropagation() // it stops the propagation of this event to outer form
		const data = {
			question,
			category,
			options:{
				a:optionA,b:optionB,c:optionC,d:optionD
			}
		}
		if(editQuestion){
			// console.log('Edit', data)
			editQuestion(index,data)
		}else{
			// console.log('Add', data)
			addQuestion(data)
		}
		close()
	}

	return (
		<>
			<Modal.Header className="auth-head">
				{editQuestion ? 'Edit' : 'Add a'} Question
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3">
						<Form.Label className="sec-color-text">
							Question*
						</Form.Label>
						<Form.Control
							type="text"
							value={question}
							onChange={({target})=>setQuestion(target.value)}
							required
							placeholder="Type your question here"
						/>
						<small className="text-grey">Do not include question mark.</small>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label className="sec-color-text">
							Category*
						</Form.Label>
						<select
							value={category}
							className="form-control"
							onChange={({target})=>setCategory(target.value)}
							required
							placeholder="Select category"
						>
							<option value="FILLUP">FILLUP</option>
							<option value="MCQ">MCQ</option>
						</select>
					</Form.Group>
					{category==='MCQ' &&
						<>
							<Form.Group className="mb-3">
								<Form.Label>Option A* </Form.Label>
								<Form.Control
									type="text"
									placeholder="option A"
									required
									value={optionA}
									onChange={({target})=>setOptionA(target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Option B* </Form.Label>
								<Form.Control
									type="text"
									placeholder="option B"
									required
									value={optionB}
									onChange={({target})=>setOptionB(target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Option C* </Form.Label>
								<Form.Control
									type="text"
									placeholder="option C"
									required
									value={optionC}
									onChange={({target})=>setOptionC(target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Option D* </Form.Label>
								<Form.Control
									type="text"
									placeholder="option D"
									required
									value={optionD}
									onChange={({target})=>setOptionD(target.value)}
								/>
							</Form.Group>
						</>
					}
					<div align="center">
						<button 
							className='mt-3 auth-btn'
							type="submit"
						>
							{editQuestion ? 'Save' : 'Add'}
						</button>
					</div>
				</Form>
			</Modal.Body>
		</>
	)
}