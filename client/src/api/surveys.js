import axios from 'axios'

const baseURL = process.env.NODE_ENV==="development" ?
				"http://localhost:3001" :
				"https://sky-surveys.herokuapp.com"

export default axios.create({
	baseURL,//"https://jobs-api.squareboat.info/api/v1",
	headers:{
		'Content-Type': 'application/json'
	}
})