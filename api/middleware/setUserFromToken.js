const userService = require('../services/userService')
const User = require('../../models/User')

async function getCurrentUser(req, res, next) {
  if (!req.auth) {
    next()
    return
  }
  const {
    auth: { sub: externalId },
  } = req
  const serviceUser = await userService.getUserByExternalId(externalId)
  const q = await User.findOne({
    externalIds: {
      $elemMatch: {
        externalId,
      },
    },
  })
  const user = {
    school: q.school,
    ...serviceUser,
  }
  console.log(user)
  if (user) {
    req.user = user
  }

  next()
}
module.exports = getCurrentUser
