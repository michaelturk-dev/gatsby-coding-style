const qs = require('qs')
const gatewayUrl = process.env.GATEWAY_URL
const gatewayKey = process.env.GATEWAY_KEY

module.exports = async ({ serviceName, path, method = 'GET', headers, body, search }) => {
  let url = new URL(`${gatewayUrl}/${serviceName}/${path}`)
  let params = {
    api_key: gatewayKey,
    ...search,
  }
  url.search = qs.stringify(params, { encodeValuesOnly: true })
  return fetch(url, {
    method,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body,
  })
}
