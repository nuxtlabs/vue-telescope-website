const analyze = require('vue-telemetry-analyzer')

exports.handler = async function (event, context) {
  const url = event.queryStringParameters.url
  try {
    console.log(`Analyze ${url}...`)
    const infos = await analyze(url)

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(infos)
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: err.message })
    }
  }
}
