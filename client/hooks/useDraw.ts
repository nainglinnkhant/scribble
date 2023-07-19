import { useCallback, useEffect, useRef, useState } from 'react'

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

  const [undoPoints, setUndoPoints] = useState<string[]>([])

  const [mouseDown, setMouseDown] = useState(false)

  const onInteractStart = () => {
    const canvasElement = canvasRef.current
    if (!canvasElement) return

    setUndoPoints(prevState => [...prevState, canvasElement.toDataURL()])

    setMouseDown(true)
  }

  const undo = () => {
    const canvasElement = canvasRef.current
    if (!canvasElement) return

    const ctx = canvasElement.getContext('2d')
    if (!ctx) return

    const lastUndoPoint = undoPoints[undoPoints.length - 1]

    const img = new Image()
    img.src = lastUndoPoint
    img.onload = () => {
      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
      ctx.drawImage(img, 0, 0)
    }

    setUndoPoints(prevState => {
      const newState = [...prevState]
      newState.pop()
      return newState
    })
  }

  const clear = useCallback(() => {
    const canvasElement = canvasRef.current
    if (!canvasElement) return

    const ctx = canvasElement.getContext('2d')
    if (!ctx) return

    setUndoPoints(prevState => [...prevState, canvasElement.toDataURL()])

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
