const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('DB connected'))
.catch(err => console.log(err))

// Schema and Model
const accountSchema = new mongoose.Schema({
    accountNumber: { type: String, unique: true },
    password: String,
    balance: { type: Number, default: 0 }
})
const AccountModel = mongoose.model('Account', accountSchema)

// Register a new account
app.post('/api/register', (req, res) => {
    const { accountNumber, password } = req.body
    AccountModel.create({ accountNumber, password })
    .then(() => res.json('Account registered successfully'))
    .catch(err => res.json('Registration failed. Maybe account already exists?'))
})

// Login to an account
app.post('/api/login', (req, res) => {
    const { accountNumber, password } = req.body
    AccountModel.findOne({ accountNumber })
    .then(account => {
        if (!account) return res.json('Account not found')
        if (account.password !== password) return res.json('Incorrect password')
        res.json('Login successful')
    })
    .catch(err => res.json('Login failed'))
})

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
