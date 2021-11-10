import React,{useState} from 'react'
import {Modal} from 'react-bootstrap'

import Avatar from './Avatar'
import ViewSubmission from './ViewSubmission'

export default function SubmissionModal({questions,submissions,close}) {
	const [showSubModal,setShowSubModal] = useState(false)
	const [selectedSubmission,setSelectedSubmission] = useState(null)

	function showSub(submissionId){
		setSelectedSubmission(()=>{
			return submissions.find(item=>item._id===submissionId)
		})
		setShowSubModal(true)
	}
	function closeSub(){
		setSelectedSubmission(null)
		setShowSubModal(false)
	}

	return (
		<Modal.Body className="app-modal">
			<div className=" p-3">
				<h2 className="auth-head app-head pb-3">Submissions for this survey</h2>
				<span onClick={close} className="close-icon">
					<i className="fas fa-times"></i>
				</span>
				{submissions?.length===0 ?
					<>
						<h6 className="sec-color-text">{submissions?.length} submissions</h6>
						<div className="empty-applications mt-3">
							<div>
								<span className="empty-icon"><i className="far fa-file-alt"></i></span>
								<p className="sec-color-text">No submissions yet!</p>
							</div>
						</div>
					</>
					:
					<>
						<h6 className="sec-color-text">Total {submissions?.length} submissions</h6>
						<div className="applications mt-3 styled-scrollbar">
						{submissions?.map(item=>(
							<div key={item._id} className="application-card">
								<div className="card-head">
									<Avatar name={item?.respondent?.name} imgSrc={null} />
									<div className="app-info">
										<h6 className="sec-color-text mb-0">{item?.respondent?.name}</h6>
										<small>{item?.respondent?.email?.substring(0,10)}...</small>
									</div>
								</div>
								<div className="card-body p-0">
									<small className="text-grey mb-0">
										{new Date(item?.createdAt)?.toDateString?.()}
									</small>
								</div>
								<button onClick={()=>showSub(item._id)} className="my-2 job-btn">
									view
								</button>
							</div>
						))}
						</div>
					</>
				}
				<Modal show={showSubModal} onHide={closeSub}>
					<ViewSubmission
						questions={questions}
						submission={selectedSubmission}
						close={closeSub}
					/>
				</Modal>
			</div>
		</Modal.Body>
	)
}