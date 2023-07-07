'use client'

import { useParams, useRouter } from 'next/navigation'

import { socket } from '@/lib/socket'
import { Button } from '@/components/ui/Button'

export default function LeaveButton() {
  const router = useRouter()
  const params = useParams()

  return (
    <Button
      variant='destructive'
      className='absolute bottom-0 w-full'
      onClick={() => {
        socket.emit('leave-room')
        router.replace('/')
      }}
    >
      Leave Room
    </Button>
  )
}
