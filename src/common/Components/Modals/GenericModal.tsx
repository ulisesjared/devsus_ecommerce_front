import React, { type ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Icons } from '../../Constants/Icons';

type ActionStyle = 'primary' | 'secondary' | 'danger' | 'action';

type Action = {
   label: string
   onClick: () => void | Promise<void>
   style?: ActionStyle,
   disabled?: boolean
}

interface GenericModalProps {
   fullScreen?: boolean,
   title: string,
   visible: boolean
   content: ReactNode
   close: () => void
   actions: Action[]
   showActions?: boolean
}

const GenericModal: React.FC<GenericModalProps> = ({
   fullScreen = false,
   title,
   visible,
   content,
   close,
   actions,
   showActions = true
}) => {

   /**
    * This effect will add a blur effect to the root element
    * when the modal is visible
    */
   useEffect(() => {
      const root = document.getElementById('root')
      visible && root?.classList.add('blur-sm')
      return () => { root?.classList.remove('blur-sm') }
   }, [visible])

   return (<>
      {visible && (
         createPortal(
            <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 total-center'>

               <div className={`flex flex-col bg-white rounded-md shadow-md p-2 ${fullScreen ? 'flex-1 size-full' : ''}`}>

                  <div className='flex h-8 items-center justify-center relative'>
                     <h1 className='font-bold'>{title}</h1>
                     <button className='absolute right-0 btn-primary size-8 total-center' onClick={close}>
                        <Icons.Close size="24px" />
                     </button>
                  </div>

                  {content}
                  {
                     showActions &&
                     <div className='flex justify-end gap-2'>
                        {actions.map((action, index) => (
                           <button
                              key={`${action.label}_${index}`}
                              type='button'
                              onClick={action.onClick}
                              disabled={action.disabled}
                              className={`btn-${action.style ?? 'primary'} h-10 w-full total-center`}
                           >
                              {action.label}
                           </button>
                        ))}
                     </div>
                  }
               </div>
            </div>,
            document.body
         )
      )}
   </>)
}

export default GenericModal