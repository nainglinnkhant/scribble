import type { User } from '@/stores/userStore'
import type { DrawProps } from '@/hooks/useDraw'

export interface RoomJoinedData {
  user: User
  roomId: string
  members: User[]
}

export interface Notification {
  title: string
  message: string
}

export interface DrawOptions extends DrawProps {
  strokeColor: string
  strokeWidth: number[]
  dashGap: number[]
}
