import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { DrawOptions } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function draw({
  ctx,
  currentPoint,
  prevPoint,
  strokeColor,
  strokeWidth,
  dashGap,
}: DrawOptions) {
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
}

export function drawWithDataURL(
  dataURL: string,
  ctx: CanvasRenderingContext2D,
  canvasElement: HTMLCanvasElement
) {
  const img = new Image()
  img.src = dataURL
  img.onload = () => {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    ctx.drawImage(img, 0, 0)
  }
}

export function isMacOS() {
  if (typeof navigator === 'undefined') return false
  return navigator.userAgent?.includes('Mac')
}
