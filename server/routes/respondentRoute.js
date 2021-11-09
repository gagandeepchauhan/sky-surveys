const express   = require('express')
const router    = express.Router()
const { model } = require('mongoose')
const Submission  = model('Submission')
const Survey      = model('Survey')

const authenticate  = require('../middlewares/authenticate')
const respondent  = require('../middlewares/respondent')

router.use(authenticate,respondent)

router.get("/surveys", async (req,res)=>{
	try{
		const surveys = await Survey.find({}).populate('User')
		const data = surveys.filter(item=>{
			return (item.genders.includes(req.user.gender) && (item.visibleToAllAgeGroup || inAgeGroup(req.user.age,item.ageGroup)))
		}) 
		const submissions = await Submission.find({respondent:req.user._id},{_id:1})
		return res.status(200).json({
			surveys:data,
			submissions
		})
	}catch(err){
		console.log(err.message)
		return res.status(500).json({
			error: "Something went wrong"
		})
	}
})	
router.get("/my-submissions", async (req,res)=>{
	try{
		const submissions = await Submission.find({respondent:req.user._id}).populate('Survey').exec()
		return res.status(200).json({
			data: submissions
		})
	}catch(err){
		console.log(err.message)
		return res.status(500).json({
			error: "Something went wrong"
		})
	}
})
router.post("/create-submission/:surveyId", async (req,res)=>{
	// req.body = {
	// 	answers : [
	// 		{
	// 			category,answer
	// 		},
	// 		...
	// 	]
	// }
	const {surveyId} = req.params
	try{
		const submission = await Submission.create({ ...req.body, respondent: req.user._id, survey: surveyId })
		const survey = await Survey.findById(surveyId)
		console.log(survey.submissions)
		survey.submissions.push(submission)
		console.log(survey.submissions)
		await survey.save()
		return res.status(200).json({
			data:submission
		})
	}catch(err){
		console.log(err.message)
		return res.status(422).json({
			error: "Invalid request data"
		})
	}
})


function inAgeGroup(age,{lb,ub}){
	return age>=lb && age<=ub
}

module.exports = router