import { PanelRightOpen } from 'lucide-react'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet'
import { Button } from '@/components/ui/Button'
import SaveButton from '@/components/SaveButton'
import ThemeMenuButton from '@/components/ThemeMenuButton'
import RightPanel from '@/components/RightPanel'

export default function Header() {
  return (
    <header className='sticky top-0 z-40 w-full select-none border-b bg-background/80 saturate-200 backdrop-blur-sm'>
      <div className='container flex items-center justify-between py-3'>
        <h2 className='text-lg font-medium'>Scribble</h2>

        <div className='flex items-center gap-3 md:gap-4'>
          <SaveButton />

          <ThemeMenuButton />

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='flex h-9 lg:hidden'
                aria-label='Open right panel'
              >
                <PanelRightOpen size={20} />
              </Button>
            </SheetTrigger>

            <SheetContent className='w-[17rem]'>
              <RightPanel />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
