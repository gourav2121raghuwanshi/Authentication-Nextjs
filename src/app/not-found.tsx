import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='w-full h-full pt-10'>
    <div className='flex flex-col justify-center items-center '>

      <h2>404 | Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
    </div>
  )
}