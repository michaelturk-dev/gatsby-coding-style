module.exports = {
  basePath: '/recruiter',
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    hostUrl: process.env.HOST_URL,
    auth0Origin: process.env.AUTH0_ORIGIN,
    auth0ClientId: process.env.AUTH0_CLIENTID,
    auth0Domain: process.env.AUTH0_DOMAIN,
  },
}
