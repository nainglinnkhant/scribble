'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

import type { DrawOptions } from '@/types'
import { addUndoPoint, deleteLastUndoPoint, getLastUndoPoint } from '@/api'
import { useCanvasStore } from '@/stores/canvasStore'
import { useUserStore } from '@/stores/userStore'
import { socket } from '@/lib/socket'
import { draw, drawWithDataURL } from '@/lib/utils'
import useDraw, { type DrawProps } from '@/hooks/useDraw'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'

export default function DrawingCanvas() {
  const router = useRouter()
  const params = useParams()

  const containerRef = useRef<HTMLDivElement>(null)

  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false)

  const strokeColor = useCanvasStore(state => state.strokeColor)
  const strokeWidth = useCanvasStore(state => state.strokeWidth)
  const dashGap = useCanvasStore(state => state.dashGap)
  const user = useUserStore(state => state.user)

  useEffect(() => {
    if (!user) {
      router.replace('/')
    }
  }, [router, user])

  const onDraw = useCallback(
    ({ ctx, currentPoint, prevPoint }: DrawProps) => {
      const drawOptions = {
        ctx,
        currentPoint,
        prevPoint,
        strokeColor,
        strokeWidth,
        dashGap,
      }
      draw(drawOptions)
      socket.emit('draw', { drawOptions, roomId: params.roomId })
    },
    [strokeColor, strokeWidth, dashGap, params.roomId]
  )

  const { canvasRef, onInteractStart, clear, undo } = useDraw(onDraw)

  useEffect(() => {
    const canvasElement = canvasRef.current
    const ctx = canvasElement?.getContext('2d')

    socket.emit('client-ready', params.roomId)

    socket.on('get-canvas-state', () => {
      const canvasState = canvasRef.current?.toDataURL()
      if (!canvasState) return

      socket.emit('receive-canvas-state', { canvasState, roomId: params.roomId })
    })

    socket.on('send-canvas-state', (canvasState: string) => {
      if (!ctx || !canvasElement) return

      drawWithDataURL(canvasState, ctx, canvasElement)
    })

    socket.on('update-canvas-state', (drawOptions: DrawOptions) => {
      if (!ctx) return
      draw({ ...drawOptions, ctx })
    })

    socket.on('undo-room-canvas', canvasState => {
      if (!ctx || !canvasElement) return

      drawWithDataURL(canvasState, ctx, canvasElement)
    })

    return () => {
      socket.off('get-canvas-state')
      socket.off('send-canvas-state')
      socket.off('update-canvas-state')
      socket.off('undo-room-canvas')
    }
  }, [canvasRef, params.roomId])

  useEffect(() => {
    const setCanvasDimensions = () => {
      if (!containerRef.current || !canvasRef.current) return

      const { width, height } = containerRef.current?.getBoundingClientRect()

      canvasRef.current.width = width - 50
      canvasRef.current.height = height - 50
    }

    setCanvasDimensions()
    setIsCanvasLoaded(true)
  }, [canvasRef])

  useEffect(() => {
    socket.on('clear-room-canvas', clear)

    return () => {
      socket.off('clear-room-canvas')
    }
  }, [clear])

  const handleInteractStart = async () => {
    const canvasElement = canvasRef.current
    if (!canvasElement) return

    await addUndoPoint(params.roomId as string, canvasElement.toDataURL())
    onInteractStart()
  }

  return (
    <div
      ref={containerRef}
      className='relative flex h-full w-full items-center justify-center'
    >
      <div className='absolute right-[25px] top-[25px] select-none rounded-none rounded-bl rounded-tr-[2.5px]'>
        <Button
          variant='outline'
          className='rounded-none rounded-bl-md border-0 border-b border-l'
          onClick={async () => {
            const res = await getLastUndoPoint(params.roomId as string)
            undo(res.lastUndoPoint)
            socket.emit('undo', {
              canvasState: res.lastUndoPoint,
              roomId: params.roomId,
            })

            deleteLastUndoPoint(params.roomId as string)
          }}
        >
          Undo
        </Button>

        <Button
          variant='outline'
          className='rounded-none rounded-tr-md border-0 border-b border-l'
          onClick={async () => {
            const canvasElement = canvasRef.current
            if (!canvasElement) return

            await addUndoPoint(params.roomId as string, canvasElement.toDataURL())
            clear()
            socket.emit('clear-canvas', params.roomId)
          }}
        >
          Clear
        </Button>
      </div>

      {!isCanvasLoaded && (
        <Skeleton className='absolute h-[calc(100%-50px)] w-[calc(100%-50px)]' />
      )}

      <canvas
        id='canvas'
        ref={canvasRef}
        onMouseDown={handleInteractStart}
        onTouchStart={handleInteractStart}
        width={0}
        height={0}
        className='touch-none rounded border bg-white'
      />
    </div>
  )
}
