import React,{useState} from 'react'
import {Modal} from 'react-bootstrap'

import Questions from './Questions'
import Question from './Question'
import QuestionAnswers from './QuestionAnswers'
import CreateSubmission from './CreateSubmission'

export default function SurveyModal({ survey, submission, submitted, close}) {
	const [submitting,setSubmitting] = useState(false)

	function notClosed(){
		let closingEpoch = new Date(survey?.closingDate).getTime()
		let currentEpoch = new Date().getTime()
		return currentEpoch<=closingEpoch
	}

	return (
		<>
			<Modal.Body className="app-modal">
				<div className=" p-3">
					<h2 className="auth-head app-head pb-3">{survey?.title}&nbsp;&nbsp;
						{submitted &&
							<small className="badge rounded-pill bg-success">submitted</small>
						}
						{!submitted && notClosed() &&
							<>
							{submitting ?
								<button onClick={()=>setSubmitting(false)} className="auth-round-btn cancel-btn">
									<i className="fa fa-times"></i>
								</button>
								:
								<button onClick={()=>setSubmitting(true)} className="auth-round-btn">
									<i className="fa fa-edit"></i>
								</button>
							}
							</>
						}&nbsp;&nbsp;
						{!notClosed() &&
							<small className="badge rounded-pill bg-secondary">closed</small>
						}
						<span onClick={close} className="close-icon">
							<i className="fas fa-times"></i>
						</span>
					</h2>
					<small className="text-grey">Created at - {new Date(survey?.createdAt)?.toDateString?.()}</small>
					<br/><small className="text-grey">Updated at - {new Date(survey?.updatedAt)?.toDateString?.()}</small>
					<br/><small className="text-grey">Closing date - {new Date(survey?.closingDate)?.toDateString?.()}</small>
					<h6 className="mt-3 auth-head">Description</h6>
					<p className="pb-2">{survey?.description}</p>
					{submitting ?
						<CreateSubmission survey={survey} />
						:
						<>
							{submitted ?
								<QuestionAnswers 
									questions={survey?.questions}
									submission={submission}
								/>
								:
								<Questions questions={survey?.questions} action="view"/>
							}
						</>
					}
				</div>
			</Modal.Body>
		</>
	)
}