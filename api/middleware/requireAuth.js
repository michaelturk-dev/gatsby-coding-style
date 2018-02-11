async function requireAuth(req, res, next) {
  const { auth } = req
  if (!auth) {
    res.status(401)
    res.json({ error: 'Request unauthorized. Please log in.' })
    throw new Error('Request unauthorized. Please log in.')
  }
  next()
}
module.exports = requireAuth
