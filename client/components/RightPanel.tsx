import ColorPicker from '@/components/ColorPicker'
import StrokeWidthSlider from '@/components/StrokeWidthSlider'
import DashGapSlider from '@/components/DashGapSlider'

export default function RightPanel() {
  return (
    <div className='flex justify-center py-8'>
      <div className='flex w-[12.5rem] flex-col gap-8'>
        <ColorPicker />

        <StrokeWidthSlider />

        <DashGapSlider />
      </div>
    </div>
  )
}
