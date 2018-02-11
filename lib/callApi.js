import getConfig from 'next/config'

const callApi = async ({ body, apiPath, method = 'GET', token, headers = {} }) => {
  const { publicRuntimeConfig } = getConfig()
  const apiHost = `${publicRuntimeConfig.hostUrl}/api`

  const requestHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...headers,
  }

  const fetchOptions = {
    method,
    headers: requestHeaders,
    ...(!!body && { body: JSON.stringify(body) }),
  }
  return await fetch(`${apiHost}${apiPath}`, fetchOptions)
}

export default callApi
