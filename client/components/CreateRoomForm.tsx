'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'

import type { RoomJoinedData } from '@/types'
import { useUserStore } from '@/stores/userStore'
import { useMembersStore } from '@/stores/membersStore'
import { socket } from '@/lib/socket'
import { createRoomSchema } from '@/lib/validations/createRoom'
import { useToast } from '@/components/ui/useToast'
import { Button } from '@/components/ui/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import CopyButton from '@/components/CopyButton'

interface CreateRoomFormProps {
  roomId: string
}

type CreatRoomForm = z.infer<typeof createRoomSchema>

export default function CreateRoomForm({ roomId }: CreateRoomFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  const setUser = useUserStore(state => state.setUser)
  const setMembers = useMembersStore(state => state.setMembers)

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<CreatRoomForm>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      username: '',
    },
  })

  function onSubmit({ username }: CreatRoomForm) {
    setIsLoading(true)
    socket.emit('create-room', { roomId, username })
  }

  useEffect(() => {
    socket.on('room-joined', ({ user, roomId, members }: RoomJoinedData) => {
      setUser(user)
      setMembers(members)
      router.replace(`/${roomId}`)
    })

    function handleErrorMessage({ message }: { message: string }) {
      toast({
        title: 'Failed to join room!',
        description: message,
      })
    }

    socket.on('room-not-found', handleErrorMessage)

    socket.on('invalid-data', handleErrorMessage)

    return () => {
      socket.off('room-joined')
      socket.off('room-not-found')
      socket.off('invalid-data', handleErrorMessage)
    }
  }, [router, toast, setUser, setMembers])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-foreground'>Username</FormLabel>
              <FormControl>
                <Input placeholder='johndoe' {...field} />
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />

        <div>
          <p className='mb-2 text-sm font-medium'>Room ID</p>

          <div className='flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground'>
            <span>{roomId}</span>
            <CopyButton value={roomId} />
          </div>
        </div>

        <Button type='submit' className='mt-2 w-full'>
          {isLoading ? <Loader2 className='h-4 w-4 animate-spin' /> : 'Create a Room'}
        </Button>
      </form>
    </Form>
  )
}
