import React from 'react'
import './styles/inputsStyles.css'

const GridCheck: React.FC<{
    id: string
    label: string
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    value: boolean | undefined,
    error: string | false | undefined,
    type?: string
    className?: string,
    disabled?: boolean,
    autoComplete?: string,

}> = ({
    id,
    label,
    handleChange,
    handleBlur,
    value,
    error,
    disabled,
    ...props
}) => {

        return (
            <>
                <label htmlFor={id} className={`text-sm text-gray-800 text-end`}>
                    {label}
                </label>
                <div className='w-full flex items-center gap-2'>
                    <div className='flex flex-row'>
                        <input
                            className={`size-5 switch`}
                            id={id}
                            name={id}
                            type={'checkbox'}
                            checked={value ?? false}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onWheel={(e) => (e.target as HTMLInputElement).blur()}
                            disabled={disabled}
                            {...props}
                        />
                    </div>
                    {error && (
                        <p className='text-xs font-medium text-red-500 '>
                            {error.toString()}
                        </p>
                    )}
                </div>
            </>
        )
    }

export default GridCheck