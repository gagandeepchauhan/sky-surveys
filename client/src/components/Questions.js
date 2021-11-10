import React,{useState} from 'react'
import {Modal} from 'react-bootstrap'

import Question from './Question'
import Visibility from './Visibility'
import AddQuestionModal from './AddQuestionModal'

export default function Questions({questions,setQuestions,action}) {
	const [question,setQuestion] = useState(null)
	const [showModal,setShowModal] = useState(false)
	const [show,setShow] = useState(false)

	function addQuestion(data){
		setQuestions(prev=>{
			return [...prev,{...data}]
		})
	}
	function editQuestion(idx,data){
		setQuestions(prev=>{
			return prev.map((item,id)=>{
				if(id===idx){
					return {...data}
				}
				return item
			})
		})
	}
	function deleteQuestion(idx){
		setQuestions(prev=>{
			return prev.filter((item,id)=>{
				return id!==idx
			})
		})
	}


	return (
		<div className="questions-section">
			<h2 className="auth-head">Questions ({questions?.length})
				{action!=="view" && <button 
					className='auth-round-btn'
					onClick={(e)=>{e.preventDefault();setShowModal(true)}}
				>
					<i className="fa fa-plus"></i>
				</button>}
				<Visibility show={show} setShow={setShow} />
			</h2>
			{show &&
				<div className="questions-group">
					{questions?.map((data,idx)=>(
						<Question 
							data={data}
							index={idx} 
							key={idx}
							editQuestion={editQuestion}
							deleteQuestion={deleteQuestion}
							action={action}
					    />
					))}
				</div>
			}
			<Modal show={showModal} onHide={()=>setShowModal(false)}>
				<AddQuestionModal 
					addQuestion={addQuestion} 
					close={()=>setShowModal(false)} 
				/>
			</Modal>
		</div>
	)
}