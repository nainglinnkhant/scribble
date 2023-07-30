import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function RoomLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />

      <div className='h-[calc(100vh-3.8rem)] lg:grid lg:grid-cols-[minmax(0,1fr)_15.5rem]'>
        <main className='h-full'>{children}</main>

        <Sidebar />
      </div>
    </>
  )
}
