import { Server } from 'socket.io'

const express = require('express')
const http = require('http')
const cors = require('cors')

const app = express()

app.use(cors())

const server = http.createServer(app)

const io = new Server(server)

io.on('connection', socket => {
  console.log(socket.id)
})

const PORT = process.env.PORT || 3001

server.listen(PORT, () => console.log(`Server is running on port ${PORT} now!`))
