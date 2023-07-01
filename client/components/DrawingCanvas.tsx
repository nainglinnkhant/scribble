'use client'

import { useCallback, useEffect, useRef } from 'react'

import useDraw, { type DrawProps } from '@/hooks/useDraw'
import { Button } from '@/components/ui/Button'

export default function DrawingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  const draw = useCallback(({ ctx, currentPoint, prevPoint }: DrawProps) => {
    const startPoint = prevPoint ?? currentPoint
    const { x: currX, y: currY } = currentPoint
    const lineColor = '#000'
    const lineWidth = 3

    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'

    // Start a new path
    ctx.beginPath()
    // Place the cursor from the point the line should be started
    ctx.moveTo(startPoint.x, startPoint.y)
    // Draw a line from current cursor position to the provided x,y coordinate
    ctx.lineTo(currX, currY)
    // Add stroke to the given path (render the line)
    ctx.stroke()
  }, [])

  const { canvasRef, onMouseDown, clear } = useDraw(draw)

  useEffect(() => {
    const setCanvasDimensions = () => {
      if (!containerRef.current || !canvasRef.current) return

      const { width, height } = containerRef.current?.getBoundingClientRect()

      canvasRef.current.width = width - 50
      canvasRef.current.height = height - 50
    }

    setCanvasDimensions()

    window.addEventListener('resize', setCanvasDimensions)

    return () => window.removeEventListener('resize', setCanvasDimensions)
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

      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={0}
        height={0}
        className='rounded border bg-white'
      />
    </div>
  )
}
