import { Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const Socials = () => {

  return (
    <footer className='flex items-end justify-center mt-6'>
      <div className='flex items-center justify-center gap-12'>
        
      </div>
    </footer>
  )
}

export default dynamic(() => Promise.resolve(Socials), { ssr: false })