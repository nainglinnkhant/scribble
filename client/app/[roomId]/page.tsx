import DrawingCanvas from '@/components/DrawingCanvas'
import DisconnectedDialog from '@/components/DisconnectedDialog'

export default function RoomPage() {
  return (
    <>
      <DisconnectedDialog />

      <DrawingCanvas />
    </>
  )
}
