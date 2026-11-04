const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
  const { username, email, password, role } = req.body

  if (
    typeof password !== 'string' ||
    [...password].length < 8 ||
    Buffer.byteLength(password, 'utf8') > 72
  ) {
    return res.status(400).json({
      error:
        'Password must be at least 8 characters long, avoid long passwords',
    })
  }

  if (
    typeof username !== 'string' ||
    username.trim().length < 3 ||
    username.length > 30
  ) {
    return res.status(400).json({
      error: 'Username must be between 3 and 30 characters long',
    })
  }

  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      error: 'Please enter a valid email address',
    })
  }

  if (!['trainer', 'client'].includes(role)) {
    return res.status(400).json({
      error: 'Role must be either trainer or client',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    email,
    passwordHash,
    role,
  })

  const savedUser = await user.save()
  res.status(201).json({
    id: savedUser._id,
    username: savedUser.username,
    email: savedUser.email,
    role: savedUser.role,
  })
})

module.exports = usersRouter
