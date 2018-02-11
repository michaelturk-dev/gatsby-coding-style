const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

const authConfig = {
  domain: process.env.AUTH0_DOMAIN,
  audience: `${process.env.AUTH0_ORIGIN}/api`,
}

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),
  credentialsRequired: false,
  requestProperty: 'auth',
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ['RS256'],
})

module.exports = checkJwt
