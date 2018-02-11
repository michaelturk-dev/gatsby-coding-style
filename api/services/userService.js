const gatewayService = require('./gatewayService')

async function getUserByExternalId(externalId) {
  if (!externalId) {
    throw new Error('externalId is required')
  }
  try {
    const user = await gatewayService({
      serviceName: 'users',
      path: `/users`,
      search: {
        externalIds: [externalId],
        prefill: true,
      },
    })
    const json = await user.json()
    if (!json.error && json.data && json.data.length == 1) {
      return {
        id: json.data[0].id,
        ...json.data[0].attributes,
      }
    } else {
      throw new Error(json.error)
    }
  } catch (err) {
    throw err
  }
}

module.exports = {
  getUserByExternalId,
}
