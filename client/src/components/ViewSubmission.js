import React from 'react'
import {Modal} from 'react-bootstrap'

import QuestionAnswers from './QuestionAnswers'

export default function ViewSubmission({questions,submission,close}) {
	return (
		<>
			<Modal.Body className="app-modal">
				<div className=" p-3">
					<h2 className="auth-head app-head pb-3">
						{submission?.respondent?.name}
					</h2>
					<span onClick={close} className="close-icon">
						<i className="fas fa-times"></i>
					</span>
					<h6 className="mt-3 auth-head"><small>Email</small></h6>
					<div className="pb-2">{submission?.respondent?.email}</div>
					<h6 className="mt-2 auth-head"><small>Age</small></h6>
					<div className="pb-2">{submission?.respondent?.age}</div>
					<h6 className="mt-2 auth-head"><small>Gender</small></h6>
					<div className="pb-2 mb-2">{submission?.respondent?.gender}</div>
					<QuestionAnswers 
						questions={questions}
						submission={submission}
					/>
				</div>
			</Modal.Body>
		</>
	)
}