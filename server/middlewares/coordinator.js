const { model } = require('mongoose')
const Survey    = model('Survey')

module.exports = async (req,res,next)=>{
    if(req.user.userRole!==0){
    	return res.status(403).json({
            error: "Unauthorized action"
        })
    }
    const {surveyId} = req.params
    if(surveyId){
    	const surveyData = await Survey.findOne({_id:surveyId,coordinator:req.user._id})
    	if(!surveyData){
    		return res.status(404).json({
           		error: "SurveyId not found"
        	})
    	}
    }
    next()
}