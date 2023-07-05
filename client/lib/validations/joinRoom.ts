import * as z from 'zod'

export const joinRoomSchema = z.object({
  username: z
    .string()
    .min(2, 'Username must contain at least 2 characters')
    .max(50, 'Username must not contain more than 50 characters'),
  roomId: z.string().trim().length(21, 'Room ID must contain exactly 21 characters'),
})
