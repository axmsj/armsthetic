require('dotenv').config()
const app = require('./app')
const mongoose = require('mongoose')

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas')
  })
  .catch((err) => {
    console.log('MongoDB Connection Failed:', err.message)
  })

const PORT = process.env.PORT || 3001

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Armsthetic API is running',
  })
})

app.listen(PORT, () => {
  console.log(`Armsthetic backend running on port ${PORT}`)
})
