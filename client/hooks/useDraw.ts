import { useCallback, useEffect, useRef, useState } from 'react'

import { drawWithDataURL } from '@/lib/utils'

type AppTouchEvent = TouchEvent

interface Point {
  x: number
  y: number
}

export interface DrawProps {
  ctx: CanvasRenderingContext2D
  currentPoint: Point
  prevPoint: Point | undefined
}

export default function useDraw(onDraw: (draw: DrawProps) => void) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prevPointRef = useRef<Point>()

  const [mouseDown, setMouseDown] = useState(false)

  const onInteractStart = useCallback(() => {
    setMouseDown(true)
  }, [])

  const undo = useCallback((undoPoint: string) => {
    const canvasElement = canvasRef.current
    if (!canvasElement) return

    const ctx = canvasElement.getContext('2d')
    if (!ctx) return

    drawWithDataURL(undoPoint, ctx, canvasElement)
  }, [])

  const clear = useCallback(() => {
    const canvasElement = canvasRef.current
    if (!canvasElement) return

    const ctx = canvasElement.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
  }, [])

  useEffect(() => {
    const computePointInCanvas = (clientX: number, clientY: number) => {
      const canvasElement = canvasRef.current
      if (!canvasElement) return

      const rect = canvasElement.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top

      return { x, y }
    }

    const handleMove = (e: MouseEvent | AppTouchEvent) => {
      if (!mouseDown) return

      const canvasElement = canvasRef.current

      const ctx = canvasElement?.getContext('2d')
      let currentPoint

      if (e instanceof MouseEvent) {
        currentPoint = computePointInCanvas(e.clientX, e.clientY)
      } else {
        const { clientX, clientY } = e.touches[0]
        currentPoint = computePointInCanvas(clientX, clientY)
      }

      if (!ctx || !currentPoint) return

      onDraw({ ctx, currentPoint, prevPoint: prevPointRef.current })
      prevPointRef.current = currentPoint
    }

    const handleInteractEnd = () => {
      setMouseDown(false)
      prevPointRef.current = undefined
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleInteractEnd)
    window.addEventListener('touchmove', handleMove)
    window.addEventListener('touchend', handleInteractEnd)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleInteractEnd)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('touchend', handleInteractEnd)
    }
  }, [mouseDown, onDraw])

  return {
    canvasRef,
    onInteractStart,
    clear,
    undo,
  }
}
