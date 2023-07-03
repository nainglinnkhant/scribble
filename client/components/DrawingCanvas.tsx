'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { useCanvasStore } from '@/stores/canvasStore'
import useDraw, { type DrawProps } from '@/hooks/useDraw'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/skeleton'

export default function DrawingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false)

  const { strokeColor, strokeWidth, dashGap } = useCanvasStore()

  const draw = useCallback(
    ({ ctx, currentPoint, prevPoint }: DrawProps) => {
      const startPoint = prevPoint ?? currentPoint

      ctx.strokeStyle = strokeColor
      ctx.lineWidth = strokeWidth[0]
      ctx.setLineDash(dashGap)
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'

      // Start a new path
      ctx.beginPath()
      // Place the cursor from the point the line should be started
      ctx.moveTo(startPoint.x, startPoint.y)
      // Draw a line from current cursor position to the provided x,y coordinate
      ctx.lineTo(currentPoint.x, currentPoint.y)
      // Add stroke to the given path (render the line)
      ctx.stroke()
    },
    [strokeColor, strokeWidth, dashGap]
  )

  const { canvasRef, onInteractStart, clear } = useDraw(draw)

  useEffect(() => {
    const setCanvasDimensions = () => {
      if (!containerRef.current || !canvasRef.current) return

      const { width, height } = containerRef.current?.getBoundingClientRect()

      canvasRef.current.width = width - 50
      canvasRef.current.height = height - 50
    }

    setCanvasDimensions()
    setIsCanvasLoaded(true)
  }, [])

  return (
    <div
      ref={containerRef}
      className='relative flex h-full w-full items-center justify-center'
    >
      <Button
        variant='outline'
        onClick={clear}
        className='absolute right-[25px] top-[25px] select-none rounded-none rounded-bl rounded-tr-[2.5px] border-0 border-b border-l'
      >
        Clear
      </Button>

      {!isCanvasLoaded && (
        <Skeleton className='absolute h-[calc(100%-50px)] w-[calc(100%-50px)]' />
      )}

      <canvas
        id='canvas'
        ref={canvasRef}
        onMouseDown={onInteractStart}
        onTouchStart={onInteractStart}
        width={0}
        height={0}
        className='rounded border bg-white'
      />
    </div>
  )
}
