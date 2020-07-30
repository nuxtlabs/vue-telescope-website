exports.handler = async function (event, _context) {
  const password = event.queryStringParameters.password

  if (password !== 'ilovevue') {
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Wrong password',
      })
    }
  }
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'Welcome to VueTelemetry',
    })
  }
}
