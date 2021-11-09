import React,{useState} from 'react'
import {Modal} from 'react-bootstrap'

import AddQuestionModal from './AddQuestionModal'

export default function Question({data,index,editQuestion,deleteQuestion,action}) {
	const [showModal,setShowModal] = useState(false)
	return (
		<div className="question">
			<span><strong>{index+1}.</strong> {data?.question}?</span>
			{action!=="view" &&
			<>
			<span 
				onClick={()=>setShowModal(true)} 
				className="text-dark pointer-icon"
			>
				<i className="fa fa-edit"></i>
			</span>
			<span 
				onClick={()=>deleteQuestion(index)} 
				className="text-danger pointer-icon" 
			>
				<i className="fa fa-trash"></i>
			</span>
			</>
			}
			{data?.category==='MCQ' &&
				<div className="options">
					<span><strong><small>A.</small> </strong>{data?.options.a}</span><br/>
					<span><strong><small>B.</small> </strong>{data?.options.b}</span><br/>
					<span><strong><small>C.</small> </strong>{data?.options.c}</span><br/>
					<span><strong><small>D.</small> </strong>{data?.options.d}</span>
				</div>
			}
			
			<Modal show={showModal} onHide={()=>setShowModal(false)}>
				<AddQuestionModal 
					editQuestion={editQuestion} 
					data={data} index={index} 
					close={()=>setShowModal(false)} 
				/>
			</Modal>
		</div>
	)
}