import React from 'react'
import { Icons } from '../../Constants/Icons'
import type { ButtonProps } from './Interfaces/ButtonInterface'

const BackButton: React.FC<ButtonProps> = ({ className, ...props }) => {
   return (
      <button className={`flex items-center justify-center rounded-full size-8 ${className}`}
         {...props}
      >
         <Icons.Left size="24px" />
      </button>
   )
}

export default BackButton