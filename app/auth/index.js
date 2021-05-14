const jwtAuthenticator = require('./jwt')
const errorHandler = require('./error-handler')
const authConfig = require('../config').auth
const logger = require('../logger').child({ component: 'auth' })
const setUser = require('./set-user')

if (!authConfig.enabled) {
  logger.warn('Using pass-through authentication handler!')
}

const passThroughAuthHandler = (req, res, next) => {
  setUser(req, { userName: 'test.user@acme.com', id: 'f405d0b1-9577-4f41-b6d6-6e4d88e68db7' })
  next()
}

module.exports = {
  /*
  * requestHandler returns a chain of expressJS middlewares, so order is VERY important
  *  1) extract and validate JWT in request
  */
  requestHandler: (authFunction) => authConfig.enabled
    ? [authFunction || jwtAuthenticator]
    : passThroughAuthHandler,

  /*
  * "Global" error handler for Authentication/Authorization related errors
  */
  errorHandler
}