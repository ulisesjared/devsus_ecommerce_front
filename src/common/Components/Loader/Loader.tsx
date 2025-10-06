import React from 'react'
import './Loader.css'
import type { LoaderProps } from './LoaderInterface'

const Loader: React.FC<LoaderProps> = ({ message = "", className = '' }) => {
   return (
      <div className={`flex flex-col gap-2 items-center justify-center flex-1 ${className}`}>
         <div className='loader'></div>
         {message && <p className='text-sm italic text-gray-700'>{message}</p>}
      </div>
   )
}

export default Loader