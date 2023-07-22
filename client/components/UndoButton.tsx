import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

import { socket } from '@/lib/socket'
import { Button } from '@/components/ui/Button'

interface UndoButtonProps {
  undo: (lastUndoPoint: string) => void
}

export default function UndoButton({ undo }: UndoButtonProps) {
  const { roomId } = useParams()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // This socket does undo function
    socket.on('last-undo-point-from-server', (lastUndoPoint: string) => {
      undo(lastUndoPoint)
      socket.emit('undo', {
        canvasState: lastUndoPoint,
        roomId,
      })

      socket.emit('delete-last-undo-point', roomId)
      setIsLoading(false)

      return () => {
        socket.off('last-undo-point-from-server')
      }
    })
  }, [roomId, undo])

  return (
    <Button
      variant='outline'
      className='w-16 rounded-none rounded-bl-md border-0 border-b border-l p-0'
      onClick={async () => {
        setIsLoading(true)
        socket.emit('get-last-undo-point', roomId)
      }}
    >
      {isLoading ? <Loader2 className='h-4 w-4 animate-spin' /> : 'Undo'}
    </Button>
  )
}
