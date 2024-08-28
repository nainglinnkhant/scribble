'use client'

import { HexAlphaColorPicker } from 'react-colorful'

import { useCanvasStore } from '@/stores/canvasStore'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover'
import { Label } from '@/components/ui/Label'
import { Button } from '@/components/ui/Button'

export default function ColorPicker() {
  const [strokeColor, setStrokeColor] = useCanvasStore(state => [
    state.strokeColor,
    state.setStrokeColor,
  ])

  return (
    <div>
      <Label className='select-none'>Stroke Color</Label>

      <Popover>
        <PopoverTrigger asChild className='mt-2 w-full'>
          <Button className='h-8 w-full rounded-md p-0 ring-2 ring-border ring-offset-2 dark:focus-visible:ring-slate-700'>
            <div
              className='h-full w-full rounded-[5px]'
              style={{ background: strokeColor }}
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-fit'>
          <HexAlphaColorPicker color={strokeColor} onChange={setStrokeColor} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
