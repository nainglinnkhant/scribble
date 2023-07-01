import { useEffect, useRef, useState } from 'react'

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

  const onMouseDown = () => {
    setMouseDown(true)
  }

  const clear = () => {
    const canvasElement = canvasRef.current
    if (!canvasElement) return

    const ctx = canvasElement.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
  }

  useEffect(() => {
    const computePointInCanvas = (e: MouseEvent) => {
      const canvasElement = canvasRef.current
      if (!canvasElement) return

      const rect = canvasElement.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      return { x, y }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseDown) return

      const canvasElement = canvasRef.current

      const ctx = canvasElement?.getContext('2d')
      const currentPoint = computePointInCanvas(e)

      if (!ctx || !currentPoint) return

      onDraw({ ctx, currentPoint, prevPoint: prevPointRef.current })
      prevPointRef.current = currentPoint
    }

    const handleMouseUp = () => {
      setMouseDown(false)
      prevPointRef.current = undefined
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [mouseDown, onDraw])

  return {
    canvasRef,
    onMouseDown,
    clear,
  }
}
