const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/externalid', async (req, res) => {
  const { user } = req
  try {
    if (user) {
      const {
        givenName,
        familyName,
        email,
        emailVerified,
        image,
        phone,
        textOptOut,
        bio,
        createdAt,
        updatedAt,
        isAdmin,
        school,
        externalIds,
      } = user
      res.json({
        givenName,
        familyName,
        email,
        emailVerified,
        image,
        phone,
        textOptOut,
        bio,
        isAdmin,
        school,
        createdAt,
        updatedAt,
        externalIds,
      })
    } else {
      res.sendStatus('404')
    }
  } catch (e) {
    console.log(e)
    res.json({ err: e })
  }
})

router.post('/', async (req, res) => {
  try {
    const {
      auth: { sub: externalId },
    } = req
    let u = new User({
      externalIds: [
        {
          externalId,
        },
      ],
    })
    u.save((err, newUser) => {
      if (!err) {
        res.json(newUser)
      } else {
        res.status(500).json({ err })
      }
    })
  } catch (e) {
    res.statusCode = 500
    if (e instanceof Error) {
      res.json({
        errors: [
          {
            title: e.__proto__.name,
            detail: e.message,
            status: '500',
          },
        ],
      })
      res.end()
      return
    }
    json.res({ e })
    res.end()
    return
  }
})

module.exports = router
