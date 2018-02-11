const router = require('express').Router()
const gatewayService = require('./services/gatewayService')

router.get('/:schoolId/:tradeId/:phase', async (req, res) => {
  const {
    schoolId,
    tradeId,
    phase,
  } = req.params
  const boardRequest = await gatewayService({
    serviceName: 'recruit',
    path: `v1/boards/${schoolId}/${tradeId}/${phase}`,
  })
  const board = await boardRequest.json()
  console.log(board)
  res.json(board)
})

router.post('/:schoolId/:trade/:phase/:listId/:recruitId', async (req, res) => {
  const {
    schoolId,
    trade,
    phase,
    listId,
    recruitId,
  } = req.params

  const {
    toList,
    toPhase,
  } = req.body

  try {
    await gatewayService({
      serviceName: 'recruit',
      path: `v1/boards/${schoolId}/${trade}/${phase}/${listId}/${recruitId}`,
      body: JSON.stringify({ toList, toPhase }),
      method: 'POST',
    })
    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ error: e })
  }
})

module.exports = router
