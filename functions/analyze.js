const analyze = require('vue-telemetry-analyzer')

exports.handler = function (event, context, callback) {
    const url = event.queryStringParameters.url
    analyze(url)
        .then(res => {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(res)
            })
        })
        .catch(err => {
            callback(null, {
                statusCode: 500,
                body: JSON.stringify(err)
            })
        })
}