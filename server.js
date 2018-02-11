const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const helmet = require('helmet')
const next = require('next')
const bodyParser = require('body-parser')
const basePath = process.env.BASE_PATH || ''
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

// custom middleware
const checkJwt = require('./api/middleware/checkJwt')
const setUserFromToken = require('./api/middleware/setUserFromToken')
const requireAuth = require('./api/middleware/requireAuth')

// API handlers
const boards = require('./api/boards')
const trades = require('./api/trades')
const phases = require('./api/phases')
const recruits = require('./api/recruits')
const users = require('./api/users')

// next.js configuration
const isDev = process.env.NODE_ENV !== 'production'
console.log(`Starting Next app in ${process.env.NODE_ENV} mode`)
const nextApp = next({ dev: isDev })
const handle = nextApp.getRequestHandler()

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

nextApp.prepare().then(() => {
  const app = express()
  app.use(helmet())
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use(checkJwt, setUserFromToken)

  // API endpoints
  app.use(`${basePath}/api/boards`, requireAuth, boards)
  app.use(`${basePath}/api/trades`, requireAuth, trades)
  app.use(`${basePath}/api/phases`, requireAuth, phases)
  app.use(`${basePath}/api/recruits`, requireAuth, recruits)
  app.use(`${basePath}/api/users`, requireAuth, users)

  const health = require('@cloudnative/health-connect')
  let healthcheck = new health.HealthChecker()
  app.use(`${basePath}/api/live`, health.LivenessEndpoint(healthcheck))
  app.use(`${basePath}/api/ready`, health.ReadinessEndpoint(healthcheck))
  app.use(`${basePath}/api/health`, health.HealthEndpoint(healthcheck))

  // catch-all for nextJS /pages
  app.get('*', (req, res) => handle(req, res))

  app.listen(process.env.PORT, err => {
    if (err) throw err
    console.log('listening on port ' + process.env.PORT)
  })
})
