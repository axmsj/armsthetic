const express = require('express')
const app = express()
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')

app.use(express.json())
app.use('/api/users', usersRouter)

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Armsthetic API is running',
  })
})

app.use(middleware.errorHandler)

module.exports = app
