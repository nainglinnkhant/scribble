import * as z from 'zod'

export const joinRoomSchema = z.object({
  roomId: z.string().trim().length(21, 'Room ID must contain exactly 21 characters'),
})
