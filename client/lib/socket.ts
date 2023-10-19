import { io } from 'socket.io-client'

const SERVER =
  process.env.NODE_ENV === 'production'
    ? 'https://scribble-production-d6c0.up.railway.app'
    : 'https://cautious-fortnight-74v4445j9vgcx5x5-3001.app.github.dev/'

export const socket = io(SERVER, { transports: ['websocket'] })
