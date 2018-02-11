
async function requireAdminUser(req, res, next) {
  const { user } = req
  if (!user || (user && !user.isAdmin)) {
    throw new Error('User is not admin')
  }
  next()
}
module.exports = requireAdminUser
