import { PanelRightOpen } from 'lucide-react'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet'
import { Button } from '@/components/ui/Button'
import ThemeMenu from '@/components/ThemeMenu'
import RightPanel from '@/components/RightPanel'

export default function Header() {
  return (
    <header className='sticky top-0 z-40 w-full border-b'>
      <div className='container flex items-center justify-between py-3'>
        <h2 className='text-lg font-medium'>Scribble</h2>

        <div className='flex items-center gap-4'>
          <Button variant='outline' size='sm'>
            Save
          </Button>

          <ThemeMenu />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline' size='icon' className='flex h-9 md:hidden'>
                <PanelRightOpen size={20} />
              </Button>
            </SheetTrigger>

            <SheetContent className='w-72'>
              <RightPanel />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
