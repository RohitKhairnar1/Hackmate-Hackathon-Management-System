const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const User = require('./model/user')
const Registration=require('./model/registration')
const Feedback=require('./model/feedback')
const Comment=require('./model/comment')
const checkPass = require('./utils/pass')
const bcrypt=require('bcryptjs')
const connectDb = require('./config/db');
require('dotenv').config();


connectDb();

const app = express()
let intialPath = path.join(__dirname, "../client");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(intialPath));

app.get('/', (req, res) => {
	res.sendFile(path.join(intialPath, "loginn.html"));
})

app.get('/login', (req, res) => {
	res.sendFile(path.join(intialPath, "loginn.html"));
})

app.get('/register', (req, res) => {
	res.sendFile(path.join(intialPath, "SignUp.html"));
})

app.get('/choose-role', (req, res) => {
	res.sendFile(path.join(intialPath, "ChooseRole.html"));
})

app.post('/register-user', async (req, res) => {
	try {
		console.log("inside register")
		const { name, email, password } = req.body;
		console.log(name, email, password)
		if (!name || !email || !password) {
			res.json('fill all the fields');
		} else {
			try {
				const Hashpassword = await bcrypt.hash(password, 10)
				const response = await User.create({
					name,
					email,
					password:Hashpassword
				})
				console.log('User created successfully: ', response)
			} catch (error) {
				if (error.code === 11000) {
					// duplicate key
					return res.json({ status: 'error', error: 'Username already in use' })
				}
				throw error
			}

			return res.redirect('/choose-role')



		}

	} catch (err) {

	}

})

app.post('/login-user', async (req, res) => {
	console.log("inside login")
	const { email, password } = req.body;
	const user = await User.findOne({ email }).lean()
	console.log(user)
	if (!user) {
		console.log("invalid password or username")
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}
	const isMatch = await checkPass(password, user.password);
	if (!isMatch) {
		console.log("password  not matched")
		return res.json({msg:"passsword does not match"})// Password doesn't match
	}

	return res.redirect('/choose-role')

})

app.post('/registration', async (req, res) => {
	try {
		let {name,email,phone,college,major,year,gender,age,info,teamSize,teamName} = req.body
		const result = await Registration.create({
			name,
			email,
			phone,
			college,
			major,
			year,
			gender,
			age,
			info,
			teamSize,
			teamName
		})
		console.log('Registration successfull: ', result)
        return res.redirect('popup.html')
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	}
})

app.post('/feedback', async (req, res) => {
	try {
		let {name,email,feedback} = req.body
		const result = await Feedback.create({
			name,
			email,
			feedback
		})
		console.log('Registration successfull: ', result)
        return res.redirect('popup.html')
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	}
})
app.post('/comment', async (req, res) => {
	try {
		let {name,email,comment} = req.body
		const result = await Comment.create({
			name,
			email,
			comment
		})
		console.log('Registration successfull: ', result)
        return res.redirect('popup.html')
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	}
})

app.listen(3000, () => {
	console.log('App is listening on PORT 3000')
})
// app.use('/', express.static(path.join(__dirname, 'static')))
// app.use(bodyParser.json())

// app.post('/api/change-password', async (req, res) => {
// 	const { token, newpassword: plainTextPassword } = req.body

// 	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
// 		return res.json({ status: 'error', error: 'Invalid password' })
// 	}

// 	if (plainTextPassword.length < 5) {
// 		return res.json({
// 			status: 'error',
// 			error: 'Password too small. Should be atleast 6 characters'
// 		})
// 	}

// 	try {
// 		const user = jwt.verify(token, JWT_SECRET)

// 		const _id = user.id

// 		const password = await bcrypt.hash(plainTextPassword, 10)

// 		await User.updateOne(
// 			{ _id },
// 			{
// 				$set: { password }
// 			}
// 		)
// 		res.json({ status: 'ok' })
// 	} catch (error) {
// 		console.log(error)
// 		res.json({ status: 'error', error: ';))' })
// 	}
// })

// app.post('/api/login', async (req, res) => {
// 	const { username, password } = req.body
// 	const user = await User.findOne({ username }).lean()

// 	if (!user) {
// 		return res.json({ status: 'error', error: 'Invalid username/password' })
// 	}

// 	if (await bcrypt.compare(password, user.password)) {
// 		// the username, password combination is successful

// 		const token = jwt.sign(
// 			{
// 				id: user._id,
// 				username: user.username
// 			},
// 			JWT_SECRET
// 		)

// 		return res.json({ status: 'ok', data: token })
// 	}

// 	res.json({ status: 'error', error: 'Invalid username/password' })
// })

// app.post('/api/register', async (req, res) => {
// 	const { username, password: plainTextPassword } = req.body
// 	console.log(username);
// 	console.log("inside register")

// 	if (!username || typeof username !== 'string') {
// 		return res.json({ status: 'error', error: 'Invalid username' })
// 	}

// 	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
// 		return res.json({ status: 'error', error: 'Invalid password' })
// 	}

// 	if (plainTextPassword.length < 5) {
// 		return res.json({
// 			status: 'error',
// 			error: 'Password too small. Should be atleast 6 characters'
// 		})
// 	}

// 	const password = await bcrypt.hash(plainTextPassword, 10)

// 	try {
// 		const response = await User.create({
// 			username,
// 			password
// 		})
// 		console.log('User created successfully: ', response)
// 	} catch (error) {
// 		if (error.code === 11000) {
// 			// duplicate key
// 			return res.json({ status: 'error', error: 'Username already in use' })
// 		}
// 		throw error
// 	}

// 	return res.json({  status: 'ok' })
// })

