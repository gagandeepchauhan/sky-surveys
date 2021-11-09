import React from 'react'

import Navbar from '../components/Navbar'
import CreateSurvey from '../components/CreateSurvey'

export default function CreateSurveyScreen() {
	return (
		<>
			<div className="head head-auth"></div>
			<div className="auth">
				<Navbar />
				<div className="container p-3">
					<CreateSurvey />
				</div>
			</div>
		</>
	)
}