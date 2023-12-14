import Image from 'next/image'
import Link from 'next/link'

const WorkCards = () => {
  return (
    <Link href={'/'} className='flex flex-col bg-light-100 w-[15vw] h-[40vh] gap-x-6 shadow-md cards'>
      <div>
        <Image src={''} alt='' width={1} height={1} />
      </div>
      <div>
        <Image src={''} alt='' width={1} height={1} />
      </div>
    </Link>
  )
}

export default WorkCards