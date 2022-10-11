const http = require('http')

const port = 3000

function init() {
  startHttpServer()
}

function startHttpServer() {
  const httpServer = http.createServer((_req, res) => {
    res.writeHead(200)
    res.end('Hello world!')
  })
  httpServer.listen(port)
}

init()