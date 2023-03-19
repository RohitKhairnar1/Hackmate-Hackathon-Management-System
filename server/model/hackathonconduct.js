const mongoose = require('mongoose')

const HackathonSchema= new mongoose.Schema(
	{
		name: { type: String, required: true},
		date: { type: String, required: true },
		venue: { type: String, required: true },
        time: { type: String, required: true },
		projectDescription: { type: String, required: true },
		category: { type: String, required: true },
		criteria: { type: String, required: true },
		teamsize: { type: String, required: true },
        info: { type: String, required: true },
		
	},
	{ collection: 'createhackathon' }
)
const model = mongoose.model('createhackathonSchema', HackathonSchema)

module.exports = model