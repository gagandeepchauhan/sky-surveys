import React,{useState} from 'react'
import {Form} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import {useApi} from '../contexts/ApiContext'
import {useLogin} from '../contexts/LoginContext'

import Questions from './Questions'

export default function CreateSurvey({survey,setEdit,edit}) {
	const {setToast} = useLogin()
	const {createSurvey,editSurvey} = useApi()
	const [title,setTitle] = useState(survey?.title ?? '')
	const [description,setDescription] = useState(survey?.description ?? '')
	const [lb,setLb] = useState(survey?.ageGroup?.lb ?? '')
	const [ub,setUb] = useState(survey?.ageGroup?.ub ?? '')
	const [genders,setGenders] = useState(survey?.genders ?? [])
	const [questions,setQuestions] = useState(survey?.questions ?? [])
	const [visibleToAllAgeGroup,setVisibleToAllAgeGroup] = useState(survey?.visibleToAllAgeGroup ?? false)
	const [closingDate,setClosingDate] = useState(survey?.closingDate ?? '')
	const [loading,setLoading] = useState(false)
	const [dateError,setDateError] = useState(null)
	const [genderError,setGenderError] = useState(null)
	const history = useHistory()

	function handleGenderSelection(gen){
		if(genders.includes(gen)){
			setGenders((prev)=>{
				return prev.filter(item=>item!==gen)
			})
		}else{
			setGenders(prev=>[...prev,gen])
		}
	}

	async function handleSubmit(e){
		e.preventDefault()
		if(genders.length===0){
			setGenderError('Please check atleast one gender')
			return
		}
		let closingEpoch = new Date(closingDate).getTime()
    	let currentEpoch = new Date().getTime()
    	if(currentEpoch>closingEpoch){
    		setDateError("Please select some future date")
    	    return 
    	}
		try{
			setGenderError(null)
			setLoading(true)
			setDateError(null)
			// console.log(JSON.stringify({title,description,ageGroup:{lb,ub},genders,questions,visibleToAllAgeGroup,closingDate},null,4))
			if(edit){
				let sure = true
				if(survey?.submissions?.length!==0){
					sure = window.confirm("Saving the changes would delete all submissions on this survey till now??")
					console.log(sure)
				}
				if(sure){
					const res = await editSurvey(survey._id,{title,description,ageGroup:{lb,ub},genders,questions,visibleToAllAgeGroup,closingDate})
					setToast({title:'Success',desc:'Survey edited successfully'})
					window.location.href = `/view-survey/${survey._id}`
				}
				// setEdit(false)
			}else{
				const res = await createSurvey({title,description,ageGroup:{lb,ub},genders,questions,visibleToAllAgeGroup,closingDate})
				setToast({title:'Success',desc:'Survey published successfully'})
				history.push('/my-surveys')
			}
		}catch(err){
			setToast({title:'Error',desc:err?.response?.data?.error ?? err.toString()})
			console.log(err?.response?.data?.error)
		}
		setLoading(false)
	}

	return (
		<>
		<div className="fav-modal p-4 bg-light">
			<h2 className="auth-head">{edit ? 'Update' : 'Publish'} Survey
				{edit && <button onClick={()=>setEdit(false)} className="auth-round-btn cancel-btn">
					<i className="fa fa-times"></i>
				</button>}
			</h2>
			<Form onSubmit={handleSubmit} className="my-4">
				<Form.Group className="mb-3">
					<Form.Label className="sec-color-text">Survey title*</Form.Label>
					<Form.Control 
						placeholder="Enter survey title" 
						required value={title} 
						type="text"
						onChange={({target})=>setTitle(target.value)} 
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label className="sec-color-text">Description*</Form.Label>
					<Form.Control 
						placeholder="Enter survey description" 
						required value={description}
						as="textarea" rows={5} 
						type="text"
						onChange={({target})=>setDescription(target.value)} 
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label className="sec-color-text">Age group*</Form.Label>
					<div className="row">
						<div className="col col-6">
							<Form.Control 
								disabled={visibleToAllAgeGroup}
								placeholder="Age lower bound"
								required value={lb} 
								min={7}
								max={120}
								type="number"
								onChange={({target})=>setLb(target.value)} 
							/>
						</div>
						<div className="col col-6">
							<Form.Control 
								disabled={visibleToAllAgeGroup}
								placeholder="Age upper bound"
								required value={ub} 
								min={lb}
								max={120}
								type="number"
								onChange={({target})=>setUb(target.value)} 
							/>
						</div>
					</div>
					<input
						type="checkbox"
						id="visibility"
						checked={visibleToAllAgeGroup}
						onChange={()=>setVisibleToAllAgeGroup(prev=>!prev)} 
					/>
					<Form.Label 
						for="visibility" 
						className="sec-color-text"
						style={{marginLeft:"5px",fontSize:"12px"}}
					>
						Visible to all age groups
					</Form.Label>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label className="sec-color-text">Closing Date*</Form.Label>
					<input
						placeholder="choose closing date" 
						required value={closingDate}
						className="form-control"
						type="date"
						onChange={({target})=>setClosingDate(target.value)} 
					/>
					{dateError && 
						<small className="text-danger">{dateError}</small>
					}
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label className="sec-color-text">Gender*</Form.Label>
					<Form.Group>
						<input
							type="checkbox"
							id="gender-male"
							checked={genders?.includes('M')}
							onChange={()=>handleGenderSelection('M')} 
						/>
						<Form.Label 
							for="gender-male" 
							className="sec-color-text ml-2"
							style={{marginLeft:"5px",marginRight:"8px"}}
						>
							Male
						</Form.Label>
						<input
							type="checkbox"
							id="gender-female"
							checked={genders?.includes('F')}
							onChange={()=>handleGenderSelection('F')} 
						/>
						<Form.Label 
							for="gender-female" 
							className="sec-color-text"
							style={{marginLeft:"5px"}}
						>
							Female
						</Form.Label>
					</Form.Group>
					{genderError && 
						<small className="text-danger">{genderError}</small>
					}
				</Form.Group>
				<Questions questions={questions} setQuestions={setQuestions} />
				{questions.length!==0 &&
					<div align="center">
						{loading ?
							<div className="mt-3 spinner-grow prime-color-text" role="status">
							  <span className="sr-only"></span>
							</div>
							:
							<button type="submit" className='mt-3 auth-btn'>{edit ? 'Save' : 'Publish'}</button>
						}
					</div>
				}
			</Form>
		</div>
		</>
	)
}