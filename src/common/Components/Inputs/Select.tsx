import React, { useEffect, useRef, useState } from 'react'
import Loader from '../Loader/Loader';
import type { Option, SelectProps } from './interfaces/SelectInterface';
import { Icons } from '../../Constants/Icons';

const Select: React.FC<SelectProps> = ({ id, label, formik, options, loading, ...props }) => {

   const inputRef = useRef<HTMLInputElement>(null);

   const [search, setSearch] = useState('')
   const [showOptions, setShowOptions] = useState(false)

   const { values, setFieldValue, errors, touched, handleBlur } = formik

   useEffect(() => {
      if (!showOptions) setSearch('')
   }, [showOptions])

   const handleInputChange = (value: String) => {
      setSearch(value.toString())
      if (!showOptions) setShowOptions(true)
   }

   const handleOptionSelect = (value: String) => {
      setFieldValue(id, value)
      setShowOptions(false)
   }

   const handleClear = () => {
      setFieldValue(id, '')
      inputRef.current?.focus()
   }

   const Option: React.FC<Option> = ({ value, label, component }) => {
      return (
         <button
            key={value}
            type='button'
            className='w-full px-3 py-2 text-left hover:bg-gray-100'
            onMouseDown={() => handleOptionSelect(value)}
         >
            {label && label}
            {component && component}
         </button>
      )
   }

   const error = (touched[id] && errors[id]) ? errors[id] : null
   const value = options.find(opt => opt.value === values[id])

   const filteredOptions = options?.filter(option => {
      return option?.label?.toLowerCase().includes(search.toLowerCase())
   })

   return (
      <div className='relative flex flex-col w-56'>
         <label id={`label_${id}`} htmlFor={id} className='text-sm pb-0.5 text-gray-800'>{label}</label>
         <div className='relative flex items-center w-full justify-center'>
            <input
               id={id}
               name={id}
               readOnly={value ? true : false}
               ref={inputRef}
               value={search || value?.label || ''}
               onChange={(e) => handleInputChange(e.target.value)}
               onFocus={() => setShowOptions(true)}
               onBlur={(e) => {
                  handleBlur(e)
                  setTimeout(() => setShowOptions(false), 100)
               }}
               type="text"
               className={`base-input ${error ? 'input-invalid' : 'input-valid'}`}
               autoComplete='off'
               {...props}
            />
            <div className='absolute flex gap-1 right-2'>
               {value ? (
                  <button
                     type='button'
                     onClick={handleClear}
                     className='btn-primary size-8 total-center'
                  >
                     <Icons.Close size="23px" />
                  </button>
               ) : (
                  <button
                     type='button'
                     onClick={() => inputRef.current?.focus()}
                     className='btn-primary size-8 total-center'
                  >
                     {showOptions ? <Icons.Up /> : <Icons.Down />}
                  </button>
               )
               }
            </div>
            {loading && <Loader className='absolute' />}
         </div>
         {
            showOptions && <div className="options-scroll fancy-scroll">
               <div className='flex flex-col w-full h-full'>
                  {
                     filteredOptions.map((option, i) => (
                        <Option
                           key={i}
                           value={option.value}
                           label={option.label}
                           component={option.component}
                        // last={i === options.length} ESTE NO SE USABA POR ESO LO QUITE
                        />
                     ))
                  }
                  {filteredOptions.length === 0 && (
                     <div className='px-3 py-2 text-gray-500'>No options found</div>
                  )}
               </div>
            </div>
         }
         {error && <p className='text-xs font-medium text-red-500'>{error.toString()}</p>}
      </div >
   )
}

export default Select