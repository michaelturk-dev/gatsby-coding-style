const router = require('express').Router()
const gatewayService = require('./services/gatewayService')

router.get('/:schoolId', async (req, res) => {
  const { schoolId } = req.params
  const tradesRequest = await gatewayService({
    serviceName: 'recruit',
    path: `v1/boards/${schoolId}`,
  })
  const trades = await tradesRequest.json()
  res.json(trades)
})

module.exports = router
