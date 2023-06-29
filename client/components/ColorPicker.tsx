'use client'

import { useState } from 'react'
import { HexAlphaColorPicker } from 'react-colorful'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover'
import { Label } from '@/components/ui/Label'
import { Button } from '@/components/ui/Button'

export default function ColorPicker() {
  const [color, setColor] = useState('#000')

  return (
    <div>
      <Label htmlFor='strokeColor'>Stroke Color</Label>

      <Popover>
        <PopoverTrigger asChild className='mt-2 w-full'>
          <Button className='h-8 w-full rounded-md p-0 ring-2 ring-border ring-offset-2'>
            <div className='h-full w-full rounded-md' style={{ background: color }} />
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-fit'>
          <HexAlphaColorPicker id='strokeColor' color={color} onChange={setColor} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
