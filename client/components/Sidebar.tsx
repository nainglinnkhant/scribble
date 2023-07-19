import ColorPicker from '@/components/ColorPicker'
import StrokeWidthSlider from '@/components/StrokeWidthSlider'
import DashGapSlider from '@/components/DashGapSlider'
import MemberList from '@/components/MemberList'
import LeaveButton from '@/components/LeaveButton'

export default function Sidebar() {
  return (
    <aside className='hidden border-l px-6 py-8 lg:block'>
      <div className='relative flex h-full w-[12.5rem] flex-col gap-6'>
        <ColorPicker />

        <StrokeWidthSlider />

        <DashGapSlider />

        <MemberList />

        <LeaveButton />
      </div>
    </aside>
  )
}
