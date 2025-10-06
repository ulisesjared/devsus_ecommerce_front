import React, { useState } from 'react'
import './styles/inputsStyles.css'
import type { InputProps } from './interfaces/InputInterface'
import { getIn } from 'formik'
import { onlyAllowDecimals } from '../../Constants/handlers'

const PriceInput: React.FC<InputProps> = ({ id, label, formik, placeholder, ...props }) => {

    const { values, handleChange, errors, touched, handleBlur } = formik
    const value = getIn(values, id)
    const error = getIn(touched, id) && getIn(errors, id)

    const [isFocused, setIsFocused] = useState(false)

    const valueOrFocused = value || isFocused

    return (
        <div className='flex flex-col max-w-60'>
            {label && <label htmlFor={id} className={`text-sm pb-0.5 text-gray-800`}>
                {label}
            </label>}
            <div className='flex flex-row items-center w-full gap-2 relative'>
                <input
                    className={`price-input w-full ${error ? 'input-invalid' : 'input-valid'}`}
                    id={id}
                    name={id}
                    type={props.type || 'text'}
                    onFocus={(e) => {
                        if (props.type === 'date') {
                            (e.target as HTMLInputElement).showPicker?.(); // Opens the calendar if supported
                        }
                        setIsFocused(true)
                    }}
                    onChange={handleChange}
                    onBlur={(e) => {
                        handleBlur(e)
                        setIsFocused(false)
                    }}
                    value={value ?? ""}
                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                    onKeyDown={onlyAllowDecimals}
                    maxLength={9}
                    {...props}
                />
                <span className={`absolute pointer-events-none left-2.5 top-1/2 transform -translate-y-1/2 duration-100
                    ${valueOrFocused ? 'scale-[0.8] origin-left line-through -translate-y-[22px]' : ''}`}
                >
                    {placeholder}
                </span>
                {valueOrFocused && <span className='absolute left-2 bottom-1 pointer-events-none'>
                    $
                </span>}
            </div>
            {error && (
                <p className='text-xs font-medium text-red-500 '>
                    {error.toString()}
                </p>
            )}
        </div>
    )
}

export default PriceInput