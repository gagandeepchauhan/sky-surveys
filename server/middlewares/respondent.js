const { model } = require('mongoose')
const Survey    = model('Survey')
const Submission    = model('Submission')

module.exports = async (req,res,next)=>{
    if(req.user.userRole!==1){
    	return res.status(403).json({
            error: "Unauthorized action"
        })
    }
    const {surveyId} = req.params
    if(surveyId){
    	const surveyData = await Survey.findById(surveyId)
    	if(!surveyData){
    		return res.status(404).json({
            	error: "SurveyId not found"
        	})
    	} 
    	if(surveyData.genders.includes(req.user.gender) && (surveyData.visibleToAllAgeGroup || inAgeGroup(req.user.age,surveyData.ageGroup))){
    		const submissionData = await Submission.findOne({respondent:req.user._id,survey:surveyId})  
    		if(submissionData){
    			return res.status(400).json({
            		error: "You can fill a survey only once"
        		})
    		}
    	}
    }
    next()
}

function inAgeGroup(age,{lb,ub}){
	return age>=lb && age<=ub
}