'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/Button'

export default function LeaveButton() {
  const router = useRouter()

  return (
    <Button
      variant='destructive'
      className='absolute bottom-0 w-full'
      onClick={() => router.replace('/')}
    >
      Leave Room
    </Button>
  )
}
