import ThemeMenu from '@/components/ThemeMenu'
import { Button } from '@/components/ui/Button'

export default function Header() {
  return (
    <header className='sticky top-0 z-40 w-full border-b'>
      <div className='container flex items-center justify-between py-3'>
        <h2 className='text-lg font-medium'>Scribble</h2>

        <div className='flex items-center gap-4'>
          <Button size='sm' variant='outline'>
            Save
          </Button>

          <ThemeMenu />
        </div>
      </div>
    </header>
  )
}
