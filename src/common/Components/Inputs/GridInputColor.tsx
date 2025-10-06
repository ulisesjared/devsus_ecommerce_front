import React from 'react'
import './styles/inputsStyles.css'
import  { SketchPicker, type ColorResult} from 'react-color'


const GridInputColor: React.FC<{
    id: string
    label: string
    //handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    //handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    value: string | undefined,
    error: string | false | undefined,
    type?: string
    className?: string,
    disabled?: boolean,
    autoComplete?: string,
    onChangeComplete?:(color:ColorResult) => void

}> = ({
    id,
    label,
    //handleChange,
    //handleBlur,
    value,
    error,
    disabled,
    onChangeComplete,
    ...props
}) => {

        return (
            <>
                <label htmlFor={id} className={`text-sm text-gray-800 text-end`}>
                    {label}
                </label>
                <div className='w-full flex items-center gap-2'>
                    <div className='flex flex-row'>
                        <SketchPicker
                            //className={`base-input max-w-64 ${error ? 'input-invalid' : 'input-valid'}`}
                            onChangeComplete={onChangeComplete}
                            color={value}
                            disableAlpha={true}
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

export default GridInputColor