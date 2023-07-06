import { Server, type Socket } from 'socket.io'
import { nanoid } from 'nanoid'

import type { JoinRoomData } from './types'

const express = require('express')
const http = require('http')
const cors = require('cors')

const app = express()

app.use(cors())

const server = http.createServer(app)

const io = new Server(server)

function joinRoom(socket: Socket, roomId: string, username: string) {
  socket.join(roomId)
  const user = {
    id: nanoid(),
    username,
  }
  socket.emit('room-joined', { user, roomId })
}

io.on('connection', socket => {
  socket.on('create-room', ({ roomId, username }: JoinRoomData) => {
    joinRoom(socket, roomId, username)
  })

  socket.on('join-room', ({ roomId, username }: JoinRoomData) => {
    joinRoom(socket, roomId, username)
  })
})

const PORT = process.env.PORT || 3001

server.listen(PORT, () => console.log(`Server is running on port ${PORT} now!`))
