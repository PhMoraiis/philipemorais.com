import dynamic from 'next/dynamic'

const Start = () => {
  return (
    <div></div>
  )
}

export default dynamic(() => Promise.resolve(Start), { ssr: false })