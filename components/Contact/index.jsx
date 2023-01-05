import Image from 'next/image';
import Link from 'next/link';

import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { HiOutlineChevronDoubleUp } from 'react-icons/hi';

const Contact = () => {
  return (
    <div id='contact' className="w-full lg:h-screen">
      <div className="max-w-[1240px] m-auto px-2 py-16 w-full">
        <p className="text-xl tracking-widest uppercase text-[#4a9b7f]">
          Contact
        </p>
        <h2 className="py-4">Get in touch</h2>
        <div className="grid lg:grid-cols-5 gap-8">

          <div className="col-span-3 lg:col-span-2 w-full h-full shadow-xl shadow-gray-400 rounded-xl p-4">
            <div className="lg:p-4 h-full">
              <div>
                <Image
                  src={'/images/nextjs.png'}
                  alt='NextJS'
                  width={500}
                  height={500}
                  className='rounded-xl hover:scale-105 ease-in duration-300'
                />
              </div>
              <div>
                <h2 className="py-2">Name here</h2>
                <p>Front end Develope</p>
                <p className="py-4">Lorem ipsum dolor sit amet consectetur ?</p>
              </div>
              <div>
                <p className="uppercase pt-8">Connect </p>
                <div className="flex items-center justify-between py-4">
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                    <FaLinkedinIn />
                  </div>
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                    <FaGithub />
                  </div>
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                    <AiOutlineMail />
                  </div>
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                    <BsFillPersonLinesFill />
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className='col-span-3 w-full h-auto shadow-xl shadow-gray-400 rounded-xl lg:p-4'>
            <div className="p-4">
              <form>
                <div className='grid md:grid-cols-2 gap-4 w-full py-2'>
                  <div className='flex flex-col'>
                    <label className='uppercase text-sm py-2' htmlFor="">Name</label>
                    <input placeholder='Insert your Name' type="text" className='border-2 rounded-lg p-3 flex border-gray-300' />
                  </div>
                  <div className='flex flex-col'>
                    <label className='uppercase text-sm py-2' htmlFor="">Number</label>
                    <input placeholder='Insert your Number' type="text" className='border-2 rounded-lg p-3 flex border-gray-300' />
                  </div>
                </div>
                <div className='flex flex-col py-2'>
                  <label className='uppercase text-sm py-2' htmlFor="">Email</label>
                  <input placeholder='Insert your E-mail' type="email" className='border-2 rounded-lg p-3 flex border-gray-300' />
                </div>
                <div className='flex flex-col py-2'>
                  <label className='uppercase text-sm py-2' htmlFor="">Subject</label>
                  <input placeholder='Insert subject' type="text" className='border-2 rounded-lg p-3 flex border-gray-300' />
                </div>
                <div className='flex flex-col py-2'>
                  <label className='uppercase text-sm py-2' htmlFor="">Message</label>
                  <textarea placeholder='Describe your message' type="text" className='border-2 rounded-lg p-3 border-gray-300' rows={10}></textarea>
                </div>
                <button className='w-full p-4 text-gray-100 mt-4'>Send</button>
              </form>
            </div>
          </div>
        </div>
        <Link href="/">
          <footer className='flex items-center justify-center mb-[-700px]'>
            <Image 
            className='h-30 w-30 rounded-full filter grayscale hover:grayscale-0
            cursor-pointer' 
            src="/images/LogoBall.png" 
            alt=""
            width={300}
            height={0}
            />
          </footer>
      </Link>
      </div>
    </div>
  );
}

export { Contact };