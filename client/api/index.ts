import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://scribble-production-d6c0.up.railway.app'
    : 'http://localhost:3001'

const api = axios.create({
  baseURL,
})

interface Response<T> {
  data: T
}

export async function getLastUndoPoint(roomId: string) {
  const res = await api.get<Response<{ lastUndoPoint: string }>>(
    `/last-undo-point/${roomId}`
  )
  return res.data.data
}
