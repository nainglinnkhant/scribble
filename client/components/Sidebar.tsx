import ColorPicker from './ColorPicker'
import StrokeWidthSlider from './StrokeWidthSlider'
import DashGapSlider from './DashGapSlider'

export default function Sidebar() {
  return (
    <aside className='border-l px-6 py-8'>
      <div className='flex w-[12.5rem] flex-col gap-8'>
        <ColorPicker />

        <StrokeWidthSlider />

        <DashGapSlider />
      </div>
    </aside>
  )
}
