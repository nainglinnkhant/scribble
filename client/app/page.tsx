import { nanoid } from 'nanoid'

import { Button } from '@/components/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Separator } from '@/components/ui/Separator'
import CopyButton from '@/components/CopyButton'
import JoinRoomButtoon from '@/components/JoinRoomButton'

export default function Home() {
  const roomId = nanoid()

  return (
    <div className='flex h-screen w-full items-start justify-center pt-[15vh]'>
      <Card className='w-[90vw] max-w-[400px]'>
        <CardHeader>
          <CardTitle>Scribble</CardTitle>
          <CardDescription>
            Draw on the same canvas with your friends in real-time.
          </CardDescription>
        </CardHeader>

        <CardContent className='flex flex-col space-y-4'>
          <form className='flex flex-col space-y-4'>
            <Input placeholder='Enter your name' />

            <div className='flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground'>
              <span>{roomId}</span>
              <CopyButton value={roomId} />
            </div>

            <Button className='w-full'>Create a room</Button>
          </form>

          <div className='flex items-center space-x-2 '>
            <Separator />
            <span className='text-xs text-muted-foreground'>OR</span>
            <Separator />
          </div>

          <JoinRoomButtoon />
        </CardContent>
      </Card>
    </div>
  )
}
