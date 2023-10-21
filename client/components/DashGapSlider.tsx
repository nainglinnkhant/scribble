'use client'

import { useCanvasStore } from '@/stores/canvasStore'
import { Slider } from '@/components/ui/Slider'
import { Label } from '@/components/ui/Label'

export default function DashGapSlider() {
  const [dashGap, setDashGap] = useCanvasStore(state => [state.dashGap, state.setDashGap])

  return (
    <div>
      <div className='mb-4 flex select-none items-center justify-between'>
        <Label>Dash Gap</Label>

        <span className='px-2 py-0.5 text-sm text-muted-foreground'>{dashGap[0]}</span>
      </div>

      <Slider
        min={0}
        max={50}
        step={1}
        value={dashGap}
        onValueChange={setDashGap}
        className='[&_[role=slider]]:h-4 [&_[role=slider]]:w-4'
        aria-label='Dash gap'
      />
    </div>
  )
}
