import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  return (
    <>
      <Header />

      <div className='h-[calc(100vh-3.8rem)] md:grid md:grid-cols-[minmax(0,1fr)_15.5rem]'>
        <main className='h-full'></main>

        <Sidebar />
      </div>
    </>
  )
}
