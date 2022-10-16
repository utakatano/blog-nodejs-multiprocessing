const os = require('os')
const http = require('http')
const cluster = require('cluster')

const port = 3000

function init() {
  if (cluster.isMaster) {
    const numCPUs = os.cpus().length
    for (let idx = 0; idx < numCPUs; idx++) {
      const worker = cluster.fork()
      worker.on('message', (msg) => {
        console.log(`Worker ${msg.worker} served a ${msg.cmd}`)
        worker.send('Good work!')
      })
    }
  } else {
    startHttpServer()
  }
}

function startHttpServer() {
  process.on('message', (msg) => {
    console.log(msg)
  })

  const httpServer = http.createServer((_req, res) => {
    res.writeHead(200)
    res.end('Hello world!')
    process.send({ worker: cluster.worker.id, cmd: 'request' })
  })
  httpServer.listen(port)
}

init()