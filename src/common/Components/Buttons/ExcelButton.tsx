import React, { useEffect, useRef, useState } from 'react'
import type { ExcelButtonProps } from './Interfaces/ExcelButtonInterface'
import { Icons } from '../../Constants/Icons'

const ExcelButton: React.FC<ExcelButtonProps> = ({ className, onClick, tooltip = "Export to Excel", ...props }) => {

   const buttonRef = useRef<HTMLButtonElement>(null)
   const [showTooltip, setShowTooltip] = useState(false)

   const handleMouseEnter = () => {
      tooltip && setShowTooltip(true)
   }

   const handleMouseLeave = () => {
      setShowTooltip(false)
   }

   useEffect(() => {
      if (showTooltip) {
         const { x, y, width } = buttonRef?.current?.getBoundingClientRect() as DOMRect || {}
         const tooltip = document.createElement('div')
         tooltip.className = 'absolute z-50 px-2 py-1 text-xs font-semibold text-white bg-black rounded-md pointer-events-none'
         tooltip.style.top = `${y}px`
         tooltip.style.left = `${x + width}px`
         tooltip.innerHTML = "Export to Excel"
         document.body.appendChild(tooltip)
         return () => {document.body.removeChild(tooltip)}
      }
   }, [showTooltip])

   return (
      <button
         ref={buttonRef}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
         onClick={onClick}
         // tool-tip={tooltip}
         className={`${className} bg-white rounded-md flex items-center justify-center shadow-sm`}
         {...props}>
         <Icons.Excel size="20px" />
      </button>
   )
}

export default ExcelButton