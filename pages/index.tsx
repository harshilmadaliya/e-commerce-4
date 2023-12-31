
import Image from 'next/image'
import Cloths from '../public/lucas-hoang-ojZ4wJNUM5w-unsplash.jpg'

export default function Home() {
  return (
    <>
    <span className='absolute m-16 top-1/2 text-2xl sm:top-1/2 sm:right-1/2 md:text-7xl drop-shadow-2xl font-bold [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-slate-950'>Wellcome , guys</span>
    <div className='overflow-hidden h-[100vh] shadow-xl'>
      <Image className='h-full object-cover block object-center w-full opacity-75' src={Cloths} alt='Hii'/>
    </div>
    </>
  )
}
