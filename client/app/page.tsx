import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  return (
    <>
      <Header />

      <div className='flex h-[calc(100vh-3.8rem)]'>
        <main className='w-[calc(100vw-15.5rem)]'></main>

        <Sidebar />
      </div>
    </>
  )
}
