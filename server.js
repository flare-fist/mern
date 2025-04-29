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
    accountNumber: String,
    balance: Number
})
const AccountModel = mongoose.model('Account', accountSchema)

// Create new account
app.post('/api/accounts', (req, res) => {
  AccountModel.create(req.body)
      .then(() => res.json('Account created'))
      .catch(err => res.json('Failed to create account'))
})

// Get balance by account number
app.get('/api/balance/:accountNumber', (req, res) => {
    AccountModel.findOne({ accountNumber: req.params.accountNumber })
        .then(account => {
            if (!account) return res.json('Account cannot be found.')
            res.json(account.balance)
        })
        .catch(err => res.json('Server error'))
})

// Update account balance
app.put('/api/accounts/:accountNumber', (req, res) => {
    AccountModel.findOneAndUpdate(
        { accountNumber: req.params.accountNumber },
        req.body,
        { new: true }
    )
    .then(updated => {
        if (!updated) return res.json('Account not found')
        res.json('Account updated')
    })
    .catch(err => res.json(err))
})

// Delete account
app.delete('/api/accounts/:accountNumber', (req, res) => {
    AccountModel.findOneAndDelete({ accountNumber: req.params.accountNumber })
        .then(deleted => {
            if (!deleted) return res.json('Account not found')
            res.json('Account deleted')
        })
        .catch(err => res.json(err))
})

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
