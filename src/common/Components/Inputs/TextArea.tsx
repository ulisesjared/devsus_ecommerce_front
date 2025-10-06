import React from 'react'
import './styles/inputsStyles.css'
import type { TextAreaProps } from './interfaces/TextArea'

const TextArea: React.FC<TextAreaProps> = ({ id, label, formik, rows = 4, ...props }) => {

   const { values, handleChange, errors, touched, handleBlur } = formik

   const error = (touched[id] && errors[id]) ? errors[id] : null

   return (
      <div className='flex flex-col'>
         <label id={`label_${id}`} htmlFor={id} className={`text-sm pb-0.5 text-gray-800`}>
            {label}
         </label>
         <div className='flex flex-row items-center w-full gap-2'>
            <textarea
               className={`fancy-scroll base-textarea ${error ? 'input-invalid' : 'input-valid'}`}
               id={id}
               name={id}
               // type={props.type || 'text'} //TODO: INVESTIGAR SI TYPE ES DE LAS PROPIEDADES DE UN TEXTAREA
               onChange={handleChange}
               onBlur={handleBlur}
               value={values[id]}
               onWheel={(e) => (e.target as HTMLTextAreaElement).blur()}
               rows={rows}
               {...props}
            />
         </div>
         {error && <p className='text-xs font-medium text-red-500 '>{error.toString()}</p>}
      </div>
   )
}

export default TextArea