const router = require('express').Router()
const gatewayService = require('./services/gatewayService')

router.get('/:schoolId/:trade', async (req, res) => {
  const { schoolId, trade } = req.params
  const phasesRequest = await gatewayService({
    serviceName: 'recruit',
    path: `v1/boards/${schoolId}/${trade}`,
  })
  const phases = await phasesRequest.json()
  res.json(phases)
})

module.exports = router
