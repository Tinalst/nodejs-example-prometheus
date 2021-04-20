const http = require('http')
const url = require('url');
const client = require('prom-client')

const register = new client.Registry()

register.setDefaultLabels({
  app: 'example-nodejs-app'
})

client.collectDefaultMetrics({ register })

// const httpRequestDurationMicroseconds = new client.Histogram({
//   name: 'http_request_duration_seconds',
//   help: 'Duration of HTTP requests in seconds',
//   labelNames: ['method', 'route', 'code'],
//   buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] // 0.1 to 10 seconds
// })
//
// register.registerMetric(httpRequestDurationMicroseconds)

const gauge = new client.Gauge({ name: 'my_balance', help: 'qqq' });

let demoBalance = 1.1;
setInterval(() => {
  let randValue = Math.random() * 10;
  if (demoBalance%2 === 0){
    randValue = -randValue
  }
  demoBalance += randValue
  console.log(`${new Date().toLocaleDateString()} ---------->  ${demoBalance}`);
  gauge.set(demoBalance);
}, 3000)

register.registerMetric(gauge)

// const createOrderHandler = async (req, res) => {
//   // return an error 1% of the time
//   if ((Math.floor(Math.random() * 100)) === 0) {
//     throw new Error('Internal Error')
//   }
//
//   // delay for 3-6 seconds
//   const delaySeconds = Math.floor(Math.random() * (6 - 3)) + 3
//   await new Promise(res => setTimeout(res, delaySeconds * 1000))
//
//   res.end('Order created successfully');
// }

const server = http.createServer(async (req, res) => {
  // const end = httpRequestDurationMicroseconds.startTimer();
  const route = url.parse(req.url).pathname;

  try {
      if (route === '/metrics') {
        res.setHeader('Content-Type', register.contentType)

        console.log(`${new Date().toLocaleDateString()} ---------->  来了~~~`);
        res.end(register.metrics())
      }

      // if (route === '/order') {
      //   await createOrderHandler(req, res)
      // }

  } catch (error) {
    res.writeHead(500).end()
  }

  if (!res.finished) {
    res.writeHead(404).end() // Default 404 handler
  }

  // end({ route, code: res.statusCode, method: req.method })
})

server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080, metrics are exposed on http://localhost:8080/metrics')
})
