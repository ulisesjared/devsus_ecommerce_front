import React from 'react'
import './styles/inputsStyles.css'
import type { InputProps } from './interfaces/InputInterface'
import { getIn } from 'formik'

const Input: React.FC<InputProps> = ({ id, label, formik, ...props }) => {

   const { values, handleChange, errors, touched, handleBlur } = formik
   const value = getIn(values, id)
   const error = getIn(touched, id) && getIn(errors, id)

   return (
      <div className='flex flex-col max-w-60'>
         {label && <label htmlFor={id} className={`text-sm pb-0.5 text-gray-800`}>
            {label}
         </label>}
         <div className='flex flex-row items-center w-full gap-2'>
            <input
               className={`base-input w-full ${error ? 'input-invalid' : 'input-valid'}`}
               id={id}
               name={id}
               type={props.type || 'text'}
               onFocus={(e) => {
                  if (props.type === 'date') {
                     (e.target as HTMLInputElement).showPicker?.(); // Opens the calendar if supported
                  }
               }}
               onChange={handleChange}
               onBlur={handleBlur}
               value={value ?? ""}
               onWheel={(e) => (e.target as HTMLInputElement).blur()}
               {...props}
            />
         </div>
         {error && (
            <p className='text-xs font-medium text-red-500 '>
               {error.toString()}
            </p>
         )}
      </div>
   )
}

export default Input