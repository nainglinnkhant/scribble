const undoPoints: Record<string, string[]> = {}

const addUndoPoint = (roomId: string, undoPoint: string) => {
  const room = undoPoints[roomId]
  if (room) {
    return room.push(undoPoint)
  }
  undoPoints[roomId] = [undoPoint]
}

const getLastUndoPoint = (roomId: string) => {
  const roomUndoPoints = undoPoints[roomId]
  if (!roomUndoPoints) return
  return roomUndoPoints[roomUndoPoints.length - 1]
}

const deleteLastUndoPoint = (roomId: string) => {
  const room = undoPoints[roomId]
  if (!room) return
  undoPoints[roomId].pop()
}

export { addUndoPoint, getLastUndoPoint, deleteLastUndoPoint }
