import type { User } from '@/stores/userStore'

export interface RoomJoinedData {
  user: User
  roomId: string
}
