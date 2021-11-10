const express   = require('express')
const router    = express.Router()
const { model } = require('mongoose')
const Survey      = model('Survey')
const Submission      = model('Submission')

const authenticate  = require('../middlewares/authenticate')
const coordinator  = require('../middlewares/coordinator')

router.use(authenticate,coordinator)

router.get("/my-surveys", async (req,res)=>{
	try{
		const surveys = await Survey.find({ coordinator: req.user._id },{questions:0})
		return res.status(200).json({
			data: surveys
		})
	}catch(err){
		console.log(err.message)
		return res.status(500).json({
			error: "Something went wrong"
		})
	}
})
router.get("/my-surveys/:surveyId", async (req,res)=>{
	const {surveyId} = req.params
	try{
		const survey = await Survey.findById(surveyId)
		const submissions = await Submission.find({survey:surveyId}).populate('respondent').exec()
		return res.status(200).json({
			data: survey,
			submissions
		})
	}catch(err){
		console.log(err.message)
		return res.status(422).json({
			error: "Invalid surveyId"
		})
	}
})
router.post("/create-survey", async (req,res)=>{
	// req.body = {
	// 	title,description,genders,ageGroup,questions,visibleToAllAgeGroup,closingDate
	// }
	let closingEpoch = new Date(req.body.closingDate).getTime()
    let currentEpoch = new Date().getTime()
    if(currentEpoch>closingEpoch){
        return res.status(422).json({
            error: "Please specify some future date"
        })
    }
	try{
		const survey = await Survey.create({ ...req.body, coordinator: req.user._id })
		return res.status(200).json({
			data: survey
		})
	}catch(err){
		console.log(err.message)
		return res.status(422).json({
			error: "Invalid request data"
		})
	}
})
router.put("/edit-survey/:surveyId", async (req,res)=>{
	const {surveyId} = req.params
	// req.body = {
	// 	title,description,genders,ageGroup,questions,visibleToAllAgeGroup,closingDate
	// }
	let closingEpoch = new Date(req.body.closingDate).getTime()
    let currentEpoch = new Date().getTime()
    if(currentEpoch>closingEpoch){
        return res.status(422).json({
            error: "Please specify some future date"
        })
    }
	try{
		const survey = await Survey.findByIdAndUpdate(surveyId,{ $set:{ ...req.body, coordinator: req.user._id } })
		const surveyData = await Survey.findById(surveyId)
		surveyData.submissions=[]
		await surveyData.save()
		await Submission.deleteMany({survey:surveyId})
		return res.status(200).json({
			data: survey
		})
	}catch(err){
		console.log(err.message)
		return res.status(422).json({
			error: "Invalid request data"
		})
	}
})
router.delete("/delete-survey/:surveyId", async (req,res)=>{
	const {surveyId} = req.params
	try{
		const survey = await Survey.findByIdAndRemove(surveyId)
		await Submission.deleteMany({survey:surveyId})
		return res.status(200).json({
			data:survey
		})
	}catch(err){
		console.log(err.message)
		return res.status(422).json({
			error: "Invalid request data"
		})
	}
})

module.exports = router