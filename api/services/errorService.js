/**
 *
 * @param {} e The error
 * @param {} res An express response object
 *
 * Will try to determine the error source and create error object according to JSON API spec https://jsonapi.org/format/#error-objects
 * Sends response with the error object and 500 status code
 *
 */
const genericError = (e, res) => {
  // For JS errors
  if (e instanceof Error) {
    res.statusCode = 500
    res.json({
      errors: [
        {
          title: e.__proto__.name,
          detail: e.message,
          status: '500',
        },
      ],
    })
    res.end()
    return
  }

  // Catch all
  res.statusCode = 500
  res.json({
    errors: [
      {
        title: 'UNKNOWN_ERROR',
        detail: 'An error has occured. Check logs for more info',
        status: '500',
      },
    ],
  })
  res.end()
  return
}

/**
 *
 * @param {} e The error
 * @param {} res An express response object
 *
 * Will try to determine the error source and create error object according to JSON API spec https://jsonapi.org/format/#error-objects
 * Sends response with the error object and 404 status code
 *
 */
const notFound = res => {
  res.statusCode = 404
  res.json({
    errors: [
      {
        title: 'NOT_FOUND',
        detail: 'No regions found',
        status: '404',
      },
    ],
  })
  res.end()
}

module.exports = {
  genericError,
  notFound,
}
