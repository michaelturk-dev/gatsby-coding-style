const router = require('express').Router()
const gatewayService = require('./services/gatewayService')

router.post('/', async (req, res) => {
  const {
    recruit,
    board,
  } = req.body
  console.log({
    recruit,
  })
  const gatewayRequest = await gatewayService({
    serviceName: 'recruit',
    body: JSON.stringify({
      recruit,
      board,
    }),
    path: `v1/recruits`,
    method: 'POST',
  })
  const newRecruit = await gatewayRequest.json()
  res.json(newRecruit)
})

router.post('/:recruitId', async (req, res) => {
  const { recruitId } = req.params
  const { recruit } = req.body
  console.log(recruitId)
  console.log(recruit)
  // call service
  const gatewayRequest = await gatewayService({
    serviceName: 'recruit',
    body: JSON.stringify(recruit),
    path: `v1/recruits/${recruitId}`,
    method: 'POST',
  })
  const updatedRecruit = await gatewayRequest.json()
  res.json(updatedRecruit)
})

router.get('/:recruitId/logs', async (req, res) => {
  const { recruitId } = req.params

  const logsRequest = await gatewayService({
    serviceName: 'recruit',
    path: `v1/logs`,
    method: 'GET',
    search: {
      recruitId,
      type: 'note',
    },
  })
  const logs = await logsRequest.json()

  const authorIds = [...new Set(logs.data.map(l => l.author))]

  const authorsRequest = await gatewayService({
    serviceName: 'users',
    path: `/users/`,
    method: 'GET',
    search: {
      ids: authorIds,
      prefill: true,
    },
  })

  const authorsData = await authorsRequest.json()
  const authors = authorsData.errors ? [] : authorsData.data.map(u => {
    return {
      _id: u.id,
      ...u.attributes,
    }
  })

  res.json({ logs, authors })
})

router.post('/:recruitId/logs', async (req, res) => {
  const {
    body: {
      schoolId,
      boardId,
      listId,
      log,
    },
    auth: { sub: externalId },
    user,
  } = req

  const { recruitId } = req.params
  const type = 'note'

  // call service
  const logRequest = await gatewayService({
    serviceName: 'recruit',
    body: JSON.stringify({
      recruitId,
      schoolId,
      boardId,
      listId,
      log,
      type,
      author: user.id,
    }),
    path: `v1/logs`,
    method: 'POST',
  })
  const newLog = await logRequest.json()
  res.json(newLog)
})

module.exports = router
