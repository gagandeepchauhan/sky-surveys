import React,{useState} from 'react'

import Question from './Question'
import Visibility from './Visibility'

export default function QuestionAnswers({questions,submission}) {
	const [show,setShow] = useState(false)
	return (
		<>
			<h6 className="auth-head">
				Submission
				<Visibility show={show} setShow={setShow} />
			</h6>
			<small className="text-grey">{new Date(submission?.createdAt)?.toDateString()}</small>
			{show &&
				<>
					{questions?.map((item,idx)=>(
						<div key={idx} className="questions-group">
							<div className="question-answer">
								<Question
									data={item}
									index={idx}
									action="view"
								/>
								<div className="answer">
									<strong className="sec-color-text">Ans. </strong>
									{submission?.answers[idx]?.answer}
								</div>
							</div>
						</div>
					))}
				</>
			}
			
		</>
	)
}