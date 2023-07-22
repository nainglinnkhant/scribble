import type { User } from '@/types'

let users: User[] = []

const getUser = (userId: string) => users.find(user => user.id === userId)

const getRoomMembers = (roomId: string) =>
  users
    .filter(user => user.roomId === roomId)
    .map(({ id, username }) => ({ id, username }))

const addUser = (user: User) => users.push(user)

const removeUser = (userId: string) => {
  users = users.filter(user => user.id !== userId)
}

export { getUser, getRoomMembers, addUser, removeUser }
