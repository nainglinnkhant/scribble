'use client'

import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { socket } from '@/lib/socket'
import { joinRoomSchema } from '@/lib/validations/joinRoom'
import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'

type JoinRoomForm = z.infer<typeof joinRoomSchema>

export default function JoinRoomButtoon() {
  const form = useForm<JoinRoomForm>({
    resolver: zodResolver(joinRoomSchema),
    defaultValues: {
      username: '',
      roomId: '',
    },
  })

  function onSubmit({ roomId, username }: JoinRoomForm) {
    socket.emit('join-room', { roomId, username })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='w-full'>
          Join a Room
        </Button>
      </DialogTrigger>

      <DialogContent className='w-[90vw] max-w-[400px]'>
        <DialogHeader className='pb-2'>
          <DialogTitle>Join a room now!</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Username' {...field} />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='roomId'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Room ID' {...field} />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />

            <Button type='submit' className='mt-2'>
              Join
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
