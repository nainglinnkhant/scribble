import ColorPicker from '@/components/ColorPicker'
import StrokeWidthSlider from '@/components/StrokeWidthSlider'
import DashGapSlider from '@/components/DashGapSlider'

export default function Sidebar() {
  return (
    <aside className='hidden border-l px-6 py-8 md:block'>
      <div className='flex w-[12.5rem] flex-col gap-8'>
        <ColorPicker />

        <StrokeWidthSlider />

        <DashGapSlider />
      </div>
    </aside>
  )
}
