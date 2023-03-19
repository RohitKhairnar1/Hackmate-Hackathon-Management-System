const mongoose = require('mongoose')

const RegistrationSchema= new mongoose.Schema(
	{
		name: { type: String, required: true},
		email: { type: String, required: true, unique: true },
		phone: { type: String, required: true },
        college: { type: String, required: true },
		major: { type: String, required: true },
		year: { type: String, required: true },
		gender: { type: String, required: true },
		age: { type: String, required: true },
		info: { type: String, required: true },
		teamSize: { type: String, required: true },
		teamName: { type: String, required: true },
	},
	{ collection: 'registration' }
)
const model = mongoose.model('RegistrationSchema', RegistrationSchema)

module.exports = model