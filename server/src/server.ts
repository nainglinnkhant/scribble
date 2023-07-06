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

function isRoomCreated(roomId: string) {
  const rooms = [...io.sockets.adapter.rooms]
  return rooms?.some(room => room[0] === roomId)
}

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
    if (isRoomCreated(roomId)) {
      return joinRoom(socket, roomId, username)
    }

    socket.emit('room-not-found', {
      message: "Oops! The Room ID you entered doesn't exist or hasn't been created yet.",
    })
  })
})

const PORT = process.env.PORT || 3001

server.listen(PORT, () => console.log(`Server is running on port ${PORT} now!`))
