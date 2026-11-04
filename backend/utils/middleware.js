const errorHandler = (err, req, res, next) => {
  console.error(err)

  if (err.code === 11000) {
    return res.status(409).json({
      error: 'Registration could not be completed with the current information',
    })
  }

  return res.status(500).json({
    error: 'An unexpected server error occurred',
  })
}

module.exports = { errorHandler }
