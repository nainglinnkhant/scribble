'use client'

import { useEffect, useRef } from 'react'

import { Button } from '@/components/ui/Button'

export default function SaveButton() {
  const canvasRef = useRef<HTMLCanvasElement>()

  useEffect(() => {
    const canvasElement = document.getElementById('canvas') as HTMLCanvasElement
    canvasRef.current = canvasElement
  }, [])

  const saveCanvas = () => {
    if (!canvasRef.current) return

    const linkEl = document.createElement('a')
    linkEl.download = 'scribble.png'
    linkEl.href = canvasRef.current.toDataURL()
    linkEl.click()
    linkEl.remove()
  }

  return (
    <Button variant='outline' size='sm' onClick={saveCanvas}>
      Save
    </Button>
  )
}
