const os = require('os')
const http = require('http')
const cluster = require('cluster')

const port = 3000

function init() {
  if (cluster.isMaster) {
    const numCPUs = os.cpus().length
    for (let idx = 0; idx < numCPUs; idx++) {
      cluster.fork()
    }
  } else {
    startHttpServer()
  }
}

function startHttpServer() {
  const httpServer = http.createServer((_req, res) => {
    res.writeHead(200)
    res.end('Hello world!')
  })
  httpServer.listen(port)
}

init()