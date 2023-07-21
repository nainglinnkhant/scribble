import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'scribble-production-d6c0.up.railway.app'
    : 'http://localhost:3001'

const api = axios.create({
  baseURL,
})

interface Response<T> {
  data: T
}

export async function addUndoPoint(roomId: string, undoPoint: string) {
  const res = await api.post<Response<{ roomId: string; undoPoint: string }>>(
    `/undo-points`,
    {
      roomId,
      undoPoint,
    }
  )
  return res.data.data
}

export async function getLastUndoPoint(roomId: string) {
  const res = await api.get<Response<{ lastUndoPoint: string }>>(
    `/last-undo-point/${roomId}`
  )
  return res.data.data
}

export async function deleteLastUndoPoint(roomId: string) {
  const res = await api.delete<Response<null>>(`/last-undo-point/${roomId}`)
  return res.data.data
}
