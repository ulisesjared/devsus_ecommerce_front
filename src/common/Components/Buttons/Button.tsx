import React, { useEffect, useRef, useState } from 'react'
import GenericModal from '../Modals/GenericModal'
import type { ButtonProps } from './Interfaces/ButtonInterface'

const Button: React.FC<ButtonProps> = ({
   children,
   className,
   tooltip = '',
   needsConfirmation = false,
   confirmationTitle = '¿Deseas descartar la información?',
   confirmationMessage = 'Se perderá el contenido de forma permanente',
   confirmationContent = null,
   confirmationButtonLabel = 'Descartar',
   confirmationButtonStyle = 'danger',
   cancelButtonLabel = 'Cancelar',
   onClick,
   ...props

}) => {

   const buttonRef = useRef<HTMLButtonElement>(null)
   const [showTooltip, setShowTooltip] = useState(false)

   const [showConfirmation, setShowConfirmation] = useState(false)

   const handleMouseEnter = () => tooltip && setShowTooltip(true)
   const handleMouseLeave = () => setShowTooltip(false)

   useEffect(() => {
      if (showTooltip) {
         const { x, y, width } = buttonRef?.current?.getBoundingClientRect() as DOMRect || {}
         const tool_tip_div = document.createElement('div')
         tool_tip_div.className = 'absolute z-50 px-2 py-1 text-xs font-semibold text-white bg-black rounded-md pointer-events-none'
         tool_tip_div.style.top = `${y}px`
         tool_tip_div.style.left = `${x + width}px`
         tool_tip_div.innerHTML = tooltip
         document.body.appendChild(tool_tip_div)
         return () => { document.body.removeChild(tool_tip_div) }
      }
   }, [showTooltip])

   return (<>
      <GenericModal
         visible={showConfirmation}
         title={confirmationTitle}
         content={<div className="gap-2 total-center flex flex-col">
            <p className='p-2'>
               {confirmationMessage}
            </p>
            {confirmationContent}
         </div>}
         close={() => setShowConfirmation(false)}
         actions={[
            { label: cancelButtonLabel, onClick: () => setShowConfirmation(false) },
            { label: confirmationButtonLabel, onClick: () => { setShowConfirmation(false); onClick && onClick() }, style: confirmationButtonStyle }
         ]}
      />
      <button
         ref={buttonRef}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
         type="button"
         onClick={() => needsConfirmation ? setShowConfirmation(true) : onClick && onClick()}
         className={`flex items-center justify-center ${className}`}
         {...props}
      >
         {children}
      </button>
   </>
   )
}

export default Button